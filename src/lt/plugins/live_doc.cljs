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
  TODO - otherwise ask the nREPL for its meta info

  - check the position at which you are
  - if you are at the first symbol, display its docstring to the rightmost side
  - otherwise display the name and proper arity with the args names with the
    current element highlited

    - to properly find out the argument at which the cursor is pointing
      create a length function which given a string a its EDN representation
      returns the source-code-string-length of it
    - once you know all arguments' length, check the cursor position and
      calculate which of the arguments is being point at)

;;NOTE: avoid executing the code if the current position is at a )

(def open-braces #{"(" "{" "["})
(def opposites {")" "(", "}" "{", "]" "["})

(defn- index->pos [ed idx] (.posFromIndex (editor/->cm-ed ed) idx))
(defn- last-index
  [ed]
  (let [last-line-no (editor/line-count ed)]
    (editor/pos->index ed {:line last-line-no
                           :ch (editor/line-length ed last-line-no)})))

(defn- left-brace
  [ed idx]
  (let [pos (index->pos ed idx)]
    (cond
      (and (= (editor/->token-type ed pos) "bracket")
           (= (:string (editor/->token ed pos)) "(")) (index->pos ed (dec idx))
      (zero? idx) nil
      :else (recur ed (dec idx)))))

(defn- right-brace
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
(defn valid-range? [ed start pos stop] (< (editor/pos->index ed start)
                                          (editor/pos->index ed pos)
                                          (editor/pos->index ed stop)))

(defn cursor-form
  [ed pos]
  (let [start (left-brace ed (editor/pos->index ed pos))
        close (when-not (nil? start)
                (right-brace ed (last-index ed) ["("] (+ 2 (editor/pos->index ed start))))]
    (when (valid-range? ed start pos close)
      {:from start :to close :range (editor/range ed start close)})))

;; BUG: when an argument is contained in a form, the current open-close brace
;;      function incorrectly ignore them
#_(let [ed    (pool/last-active)
      pos   (editor/->cursor ed)
      form  (cursor-form ed pos)
      clj-form (some-> form :range (cljs.reader/read-string))]
  (when (symbol? (first clj-form))
    (first clj-form)))
