(ns lt.plugins.pop-error
  (:require [lt.object :as object]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as ed]
            [crate.binding :refer [bound]]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [defui behavior]]))

(def ^:const ^:private ansi-set&reset #"(.*?)\u001b\[([\d+;]+)m(.*?)\u001b\[m\s*")
(def ^:const ^:private ansi-set #"(.*?)\u001b\[([\d+;]+)m(.*)")

(def ^:const ^:private span-font {:bold "font-weight: bold", :italic "font-style: italic"})
(def ^:const ^:private span-color {"30" "black", "31" "OrangeRed", "32" "limegreen ", "33" "yellow",
                                  "34" "blue", "35" "purple", "36" "cyan", "37" "white"})

(defn mods->css
  "takes a string with the ansi codes (ex: 1;31) and returns a string with
  the equivalent CSS style to use"
  [mods]
  (clojure.string/join ";"
    (for [modifier (clojure.string/split mods #";")]
      (condp = modifier
        "1" (:bold span-font)
        "3" (:italic span-font)
        (str "color:" (get span-color modifier))))))

(defn- inner-span
  "takes a text with a single ansi-code font change and returns a list with
  the preceding text and a styled span according to the ansi code"
  [text]
  (let [csi-inner    (zipmap [:match :start :mods :content] (re-find ansi-set text))
        span-style   (mods->css (:mods csi-inner))
        span-content (:content csi-inner)]
    (if (empty? csi-inner) (list text)
      (list (:start csi-inner) [:span {:style span-style} span-content]))))

(defn- spanner
  "takes a text-line with ansi code and transforms it into a sequence of spans
  for each ansi font change. The original format is preserved. Each span has
  its own style according to the ansi code used. See span-font and span-color
  for more details"
  [text]
  (when-not (empty? text)
    (let [csi-text     (zipmap [:match :space :mods :content] (re-find ansi-set&reset text))
          span-style   (mods->css (:mods csi-text))
          span-content (cons (:space csi-text) (inner-span (:content csi-text)))]
      (if (empty? csi-text) text
        (cons [:span {:style span-style} span-content]
              (spanner (subs text (count (:match csi-text)))))))))

(defn- ansi->hiccup
  "takes a full stacktrace text with ansi code and transforms it into sequence of divs for
  each line, and spans for each ansi font change. Returns a hiccup structure"
  [stack-text]
  (let [stack-lines (clojure.string/split-lines stack-text)
        div-lines   (map #(vector :div (spanner %)) stack-lines)]
    [:span.full div-lines]))

(defn ->collapse-class [this summary]
  (str "inline-exception result-mark"
        (when (:open this) " open")))

(defui collapsible-exception-UI [this info]
  (let [stacktrace (:result info)
        summary    (str (:summary info) " ...")]
    [:span {:class (bound this #(->collapse-class % summary))
           :style "background: #73404c; color: #ffa6a6;
                   max-width:initial; max-height:initial"}
;;      [:span.full stacktrace]
     (ansi->hiccup stacktrace)
     [:span.truncated summary]])
  :mousewheel (fn [e] (dom/stop-propagation e))
  :click      (fn [e] (dom/prevent e)
                      (object/raise this :click))
  :contextmenu (fn [e] (dom/prevent e)
                       (object/raise this :menu! e))
  :dblclick    (fn [e] (dom/prevent e)
                       (object/raise this :double-click)))

(object/object* ::collapsible-exception
                :triggers #{:click :double-click :clear!}
                :tags #{:inline :collapsible.exception}
                :init
  (fn [this info]
    (when-let [ed (ed/->cm-ed (:ed info))]
      (let [content (collapsible-exception-UI this info)]
        (object/merge! this
          (assoc info :widget (ed/line-widget (ed/->cm-ed (:ed info))
                                              (:line (:loc info))
                                              content
                                              {:coverGutter false})))
        content))))

(behavior ::expandable-exceptions
          :triggers #{:editor.exception.collapsible}
          :reaction
  (fn [this summary stack loc]
    (let [ed      (:ed @this)
          line    (ed/line-handle ed (:line loc))
          ex-obj (object/create ::collapsible-exception
                                 {:ed this, :result stack,
                                  :summary summary
                                  :loc loc, :line line})]
      (when-let [prev (get (@this :widgets) [line :inline])]
        (when (:open @prev) (object/merge! ex-obj {:open true}))
        (object/raise prev :clear!))
      (when (:start-line loc)
        (doseq [widget (map #(get (@this :widgets) [(ed/line-handle ed %) :inline])
                             (range (:start-line loc) (:line loc)))
                :when widget]
          (object/raise widget :clear!)))
      (object/update! this [:widgets] assoc [line :inline] ex-obj))))
