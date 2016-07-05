(ns lt.plugins.user
  (:require [lt.object :as object]
            ;[lt.objs.command :as cmd]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.notifos :as notifos]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [defui behavior]]))

(def lighttable-internals
  #{#"lighttable\.nrepl\.eval"
    #"lighttable\.nrepl\.core"
    #"clojure\.tools\.nrepl\.middleware\.interruptible-eval"})

(def clojure-internals
  #{#"java\.util\.concurrent\.ThreadPoolExecutor"
    #"java\.lang\.Thread\.run"})

(defn- match-ns?
  [line namespaces]
  (cond
    (empty? namespaces) nil
    (re-find (first namespaces) line) true
    :else (recur line (rest namespaces))))

(defn- ignore?
  [line]
  (or (match-ns? line clojure-internals)
      (match-ns? line lighttable-internals)))

(defn- filter-internals
  [stringtrace]
  (let [lines (string/split stringtrace #"\n")]
    (string/join "\n" (remove ignore? lines))))

(defn truncate
  "truncate a string at newline or at 100 characters long"
  [text]
  (when-not (empty? text) ; take 100 characters
    (-> (clojure.string/split-lines text) (first) (subs 0 100))))

(defn strip-ansi
  "Removes ANSI codes from a string, returning just the raw text."
  [string]
  (clojure.string/replace string #"\u001b\[.*?m" ""))

(behavior ::clj-expandable-exception
          :triggers #{:editor.eval.clj.exception}
          :reaction (fn [editor res passed?]
                      (when-not passed?
                        (notifos/done-working ""))
                      (let [meta (:meta res)
                            msg (truncate (:result res))
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta 0)
                                 :start-line (dec (:line meta 1))}]
                        (notifos/set-msg! msg {:class "error"})
                        (object/raise obj :editor.exception.collapsible msg (:stack res) loc))))

(behavior ::cljs-expandable-exception
          :triggers #{:editor.eval.cljs.exception}
          :reaction (fn [obj res passed?]
                      (when-not passed?
                        (notifos/done-working ""))
                      (let [meta (:meta res)
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                 :start-line (dec (:line meta))}
                            msg (truncate (str (or (:stack res) (:ex res))))
                            stack (cond
                                    (:stack res)                           (:stack res)
                                    (and (:ex res) (.-stack (:ex res)))    (.-stack (:ex res))
                                    (and (:ex res) (:verbatim meta))       (:ex res)
                                    (and (:ex res) (not (:verbatim meta))) (pr-str (:ex res))
                                    (not (nil? msg))                       (or (:stack res) (:ex res)); untruncated stacktrace
                                    :else "Unknown error")]
                        (notifos/set-msg! msg {:class "error"})
                        (object/raise obj :editor.exception.collapsible
                                      msg (filter-internals stack) loc))))
