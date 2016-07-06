(ns lt.plugins.live-doc
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor.pool :as pool])
  (:require-macros [lt.macros :refer [defui behavior]]))

(comment way to go
  OK - get the editor
  OK - get the current position, transform it into an index and decrease it
  OK - if the token at that position is an open brace "(", stop
  OK - otherwise decrease its index and repeat previous step

  OK - once you found it, put its position on a stack and search for its closing brace

  OK - get the string between the start and end token
  OK - get the form after the "(" but before the first space
  OK - if it is a vector, list, set or hash-map ignore it
  OK - otherwise ask the nREPL for its meta info

  OK - check the position at which you are
  TODO - if you are at the first symbol, display its namespaced name with all the arities
  OK - otherwise display the name and proper arity with the args names with the
       current element highlited

  OK - to properly find out the argument at which the cursor is pointing
       create a length function which given a string a its EDN representation
       returns the source-code-string-length of it
  TODO - once you know all arguments' length, check the cursor position and
  calculate which of the arguments is being point at)

(def open-braces #{"(" "{" "["})
(def opposites {")" "(", "}" "{", "]" "["})

(defn- index->pos [ed idx] (.posFromIndex (editor/->cm-ed ed) idx))
(defn- last-index
  [ed]
  (let [last-line-no (editor/line-count ed)]
    (editor/pos->index ed {:line last-line-no
                           :ch (editor/line-length ed last-line-no)})))

(defn- left-bracket
  [ed bracket idx]
  (let [pos (index->pos ed idx)]
    (cond
      (and (= (editor/->token-type ed pos) "bracket")
           (= (:string (editor/->token ed pos)) bracket)) (index->pos ed (dec idx))
      (zero? idx) nil
      :else (recur ed bracket (dec idx)))))

(defn- right-bracket
  [ed last-idx stack idx]
  (let [pos (index->pos ed idx)]
    (cond
      (empty? stack) (index->pos ed (dec idx))
      (>= idx last-idx) nil ;; no closing brace found
      (not= (editor/->token-type ed pos) "bracket") (recur ed last-idx stack (inc idx))
      :brace
      (let [token (:string (editor/->token ed pos))]
        (cond
          (contains? open-braces token) (recur ed last-idx (conj stack token) (inc idx))
          (= (peek stack) (get opposites token)) (recur ed last-idx (pop stack) (inc idx))
          :error nil))))) ;;  because it is a closing brace without a matching opening one

(defn- ignore-expr? [expr] (not (symbol? (first expr))))
(defn- ignore-token? [ttype] (or (= ttype "string") (= ttype "comment") (nil? ttype)))
(defn- valid-range? [ed start pos stop] (< (editor/pos->index ed start)
                                           (editor/pos->index ed pos)
                                           (editor/pos->index ed stop)))

(defn- cursor-form
  [ed cpos bpos]
  (let [start (left-bracket ed "(" (editor/pos->index ed bpos))
        close (when-not (nil? start)
                (right-bracket ed (last-index ed) ["("] (+ 2 (editor/pos->index ed start))))]
    (cond
      (or (nil? start) (nil? close)) nil
      (not (valid-range? ed start cpos close)) (recur ed cpos (index->pos ed (editor/pos->index ed start)))
      :success {:from start :to close :range (editor/range ed start close)})))

#_(let [ed    (pool/last-active)
        pos   (editor/->cursor ed)]
    (cursor-form ed pos pos)
    "hello fodsf
    fdsfdskdns"
    12
    ;; hellow lknfdkls
    (map (comp inc dec) [1 2 3]))


;; TODO: calculate the real length of the arguments
;;       i.e. a vector could span several lines and contain weird stuff like
;;       metadata and macros. The current implementation (map (comp inc count str) clj-form)
;;       works only for nicely formatted structures
#_(defn- structs-length
    [clj-form str-range lengths]
    (if (symbol? (first clj-form))
      (recur (rest clj-form) (subs str-range 0))))

(defn- process-cursor
  [ed pos]
  (let [form  (cursor-form ed pos pos)
        ;;NOTE: The cljs.reader/read-string only supports the EDN so any reader dispatch will produce an error
        clj-form (some-> form :range (clojure.string/replace #"#" "") (cljs.reader/read-string))]
    (when (symbol? (first clj-form))
      (let [expr-lengths (map (comp inc count str) clj-form)
            cursor-at    (- (editor/pos->index ed pos)
                            (editor/pos->index ed (:from form)) 1)]
        {:fn (first clj-form)
         :current-arg (reduce (fn [[acc idx] length] (if (< cursor-at (+ acc length))
                                                       (reduced idx)
                                                       [(+ acc length) (inc idx)]))
                              [0 0] expr-lengths)
         :arg-count (count clj-form)}))))



;; =========================== INTERFACE ======================================

(defonce cursor-state (atom {}))

(behavior ::clj-result.live-doc
          :triggers #{:editor.eval.clj.result.live-doc}
          :reaction (fn [ed res]
                      (doseq [result (:results res)
                              :let [pos    (editor/->cursor ed)
                                    rform  (cljs.reader/read-string (:result result))
                                    cfn    (symbol (str (:ns rform) "/" (:name rform)))
                                    arg-no (dec (:arg-count (:info @cursor-state)))
                                    carity (or (some #(when (= (count %) arg-no) %)
                                                     (:arglists rform))
                                               (last (:arglists rform)))]]
                        ;;NOTE: we assume that if no arity matches, then it is a multiarity (& args) call, which is the last one (sorted list)
                        (when (and (:name rform) (not-empty (:ns rform)) (:arglists rform));; make sure that you have something to show
                          (object/raise ed :editor.result.underline (str (list cfn carity)) pos)))))


(behavior ::live-doc-at-cursor
          :triggers #{:move :active}
          :reaction (fn [this]
                      (let [ed     (pool/last-active)
                            pos    (editor/->cursor ed)
                            ctoken (editor/->token ed pos)]
                        (when (:connected (deref (:default (:client @ed)))) ;;avoid eval! if we are not connected
                          (when-not (or (ignore-token? (:type ctoken))
                                        (= (:string ctoken) (:token @cursor-state)))
                            (when-let [prev (and (not= (:line (:pos @cursor-state)) (:line pos)) ;;prefer replace over clear & create
                                                 (get (@ed :widgets) [(editor/line-handle ed (:line (:pos @cursor-state))) :underline]))]
                              (object/raise prev :clear!));; delete unnused widgets
                            (when-let [cursor-info (process-cursor ed pos)]
                              (swap! cursor-state assoc :token (:string ctoken)
                                     :info cursor-info
                                     :pos pos)
                              (object/raise lt.plugins.clojure/clj-lang :eval!
                                            {:origin ed
                                             :info (assoc (@ed :info) :meta {:result-type :live-doc}
                                                     :code (str "(lighttable.nrepl.doc/clean-meta (meta (resolve (symbol '" (:fn cursor-info) "))))"))})))))))
;;NOTE: The cljs.reader/read-string only supports the EDN so any reader dispatch will produce an error. That is solved by lighttable.nrepl.doc/clean-meta
