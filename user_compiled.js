if(!lt.util.load.provided_QMARK_('lt.plugins.live-doc')) {
goog.provide('lt.plugins.live_doc');
goog.require('cljs.core');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.live_doc.open_braces = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["(",null,"{",null,"[",null], null), null);
lt.plugins.live_doc.opposites = new cljs.core.PersistentArrayMap(null, 3, [")","(","}","{","]","["], null);
lt.plugins.live_doc.index__GT_pos = (function index__GT_pos(ed,idx){return lt.objs.editor.__GT_cm_ed.call(null,ed).posFromIndex(idx);
});
lt.plugins.live_doc.last_index = (function last_index(ed){var last_line_no = lt.objs.editor.line_count.call(null,ed);return lt.objs.editor.pos__GT_index.call(null,ed,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),last_line_no,new cljs.core.Keyword(null,"ch","ch",1013907415),lt.objs.editor.line_length.call(null,ed,last_line_no)], null));
});
lt.plugins.live_doc.left_bracket = (function left_bracket(ed,bracket,idx){while(true){
var pos = lt.plugins.live_doc.index__GT_pos.call(null,ed,idx);if((cljs.core._EQ_.call(null,lt.objs.editor.__GT_token_type.call(null,ed,pos),"bracket")) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,ed,pos)),bracket)))
{return lt.plugins.live_doc.index__GT_pos.call(null,ed,(idx - 1));
} else
{if((idx === 0))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__7299 = ed;
var G__7300 = bracket;
var G__7301 = (idx - 1);
ed = G__7299;
bracket = G__7300;
idx = G__7301;
continue;
}
} else
{return null;
}
}
}
break;
}
});
lt.plugins.live_doc.right_bracket = (function right_bracket(ed,last_idx,stack,idx){while(true){
var pos = lt.plugins.live_doc.index__GT_pos.call(null,ed,idx);if(cljs.core.empty_QMARK_.call(null,stack))
{return lt.plugins.live_doc.index__GT_pos.call(null,ed,(idx - 1));
} else
{if((idx >= last_idx))
{return null;
} else
{if(cljs.core.not_EQ_.call(null,lt.objs.editor.__GT_token_type.call(null,ed,pos),"bracket"))
{{
var G__7302 = ed;
var G__7303 = last_idx;
var G__7304 = stack;
var G__7305 = (idx + 1);
ed = G__7302;
last_idx = G__7303;
stack = G__7304;
idx = G__7305;
continue;
}
} else
{if(new cljs.core.Keyword(null,"brace","brace",1107901861))
{var token = new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,ed,pos));if(cljs.core.contains_QMARK_.call(null,lt.plugins.live_doc.open_braces,token))
{{
var G__7306 = ed;
var G__7307 = last_idx;
var G__7308 = cljs.core.conj.call(null,stack,token);
var G__7309 = (idx + 1);
ed = G__7306;
last_idx = G__7307;
stack = G__7308;
idx = G__7309;
continue;
}
} else
{if(cljs.core._EQ_.call(null,cljs.core.peek.call(null,stack),cljs.core.get.call(null,lt.plugins.live_doc.opposites,token)))
{{
var G__7310 = ed;
var G__7311 = last_idx;
var G__7312 = cljs.core.pop.call(null,stack);
var G__7313 = (idx + 1);
ed = G__7310;
last_idx = G__7311;
stack = G__7312;
idx = G__7313;
continue;
}
} else
{if(new cljs.core.Keyword(null,"error","error",1110689146))
{return null;
} else
{return null;
}
}
}
} else
{return null;
}
}
}
}
break;
}
});
lt.plugins.live_doc.ignore_expr_QMARK_ = (function ignore_expr_QMARK_(expr){return !((cljs.core.first.call(null,expr) instanceof cljs.core.Symbol));
});
lt.plugins.live_doc.ignore_token_QMARK_ = (function ignore_token_QMARK_(ttype){return (cljs.core._EQ_.call(null,ttype,"string")) || (cljs.core._EQ_.call(null,ttype,"comment")) || ((ttype == null));
});
lt.plugins.live_doc.valid_range_QMARK_ = (function valid_range_QMARK_(ed,start,pos,stop){return ((lt.objs.editor.pos__GT_index.call(null,ed,start) < lt.objs.editor.pos__GT_index.call(null,ed,pos))) && ((lt.objs.editor.pos__GT_index.call(null,ed,pos) < lt.objs.editor.pos__GT_index.call(null,ed,stop)));
});
lt.plugins.live_doc.cursor_form = (function cursor_form(ed,cpos,bpos){while(true){
var start = lt.plugins.live_doc.left_bracket.call(null,ed,"(",lt.objs.editor.pos__GT_index.call(null,ed,bpos));var close = (((start == null))?null:lt.plugins.live_doc.right_bracket.call(null,ed,lt.plugins.live_doc.last_index.call(null,ed),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["("], null),(2 + lt.objs.editor.pos__GT_index.call(null,ed,start))));if(((start == null)) || ((close == null)))
{return null;
} else
{if(!(lt.plugins.live_doc.valid_range_QMARK_.call(null,ed,start,cpos,close)))
{{
var G__7314 = ed;
var G__7315 = cpos;
var G__7316 = lt.plugins.live_doc.index__GT_pos.call(null,ed,lt.objs.editor.pos__GT_index.call(null,ed,start));
ed = G__7314;
cpos = G__7315;
bpos = G__7316;
continue;
}
} else
{if(new cljs.core.Keyword(null,"success","success",3441701749))
{return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),close,new cljs.core.Keyword(null,"range","range",1122184367),lt.objs.editor.range.call(null,ed,start,close)], null);
} else
{return null;
}
}
}
break;
}
});
lt.plugins.live_doc.process_cursor = (function process_cursor(ed,pos){var form = lt.plugins.live_doc.cursor_form.call(null,ed,pos,pos);var clj_form = (function (){var G__7283 = form;var G__7283__$1 = (((G__7283 == null))?null:new cljs.core.Keyword(null,"range","range",1122184367).cljs$core$IFn$_invoke$arity$1(G__7283));var G__7283__$2 = (((G__7283__$1 == null))?null:clojure.string.replace.call(null,G__7283__$1,/#/,""));var G__7283__$3 = (((G__7283__$2 == null))?null:cljs.reader.read_string.call(null,G__7283__$2));return G__7283__$3;
})();if((cljs.core.first.call(null,clj_form) instanceof cljs.core.Symbol))
{var expr_lengths = cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.inc,cljs.core.count,cljs.core.str),clj_form);var cursor_at = ((lt.objs.editor.pos__GT_index.call(null,ed,pos) - lt.objs.editor.pos__GT_index.call(null,ed,new cljs.core.Keyword(null,"from","from",1017056028).cljs$core$IFn$_invoke$arity$1(form))) - 1);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"fn","fn",1013907514),cljs.core.first.call(null,clj_form),new cljs.core.Keyword(null,"current-arg","current-arg",1613970292),cljs.core.reduce.call(null,((function (expr_lengths,cursor_at,form,clj_form){
return (function (p__7284,length){var vec__7285 = p__7284;var acc = cljs.core.nth.call(null,vec__7285,0,null);var idx = cljs.core.nth.call(null,vec__7285,1,null);if((cursor_at < (acc + length)))
{return cljs.core.reduced.call(null,idx);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(acc + length),(idx + 1)], null);
}
});})(expr_lengths,cursor_at,form,clj_form))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0], null),expr_lengths),new cljs.core.Keyword(null,"arg-count","arg-count",1203124810),cljs.core.count.call(null,clj_form)], null);
} else
{return null;
}
});
if(typeof lt.plugins.live_doc.cursor_state !== 'undefined')
{} else
{lt.plugins.live_doc.cursor_state = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
lt.plugins.live_doc.__BEH__clj_result__DOT__live_doc = (function __BEH__clj_result__DOT__live_doc(ed,res){var seq__7293 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__7295 = null;var count__7296 = 0;var i__7297 = 0;while(true){
if((i__7297 < count__7296))
{var result = cljs.core._nth.call(null,chunk__7295,i__7297);var pos_7317 = lt.objs.editor.__GT_cursor.call(null,ed);var rform_7318 = cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));var cfn_7319 = cljs.core.symbol.call(null,[cljs.core.str(new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(rform_7318)),cljs.core.str("/"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(rform_7318))].join(''));var arg_no_7320 = (new cljs.core.Keyword(null,"arg-count","arg-count",1203124810).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.live_doc.cursor_state))) - 1);var carity_7321 = (function (){var or__4884__auto__ = cljs.core.some.call(null,((function (seq__7293,chunk__7295,count__7296,i__7297,pos_7317,rform_7318,cfn_7319,arg_no_7320,result){
return (function (p1__7286_SHARP_){if(cljs.core._EQ_.call(null,cljs.core.count.call(null,p1__7286_SHARP_),arg_no_7320))
{return p1__7286_SHARP_;
} else
{return null;
}
});})(seq__7293,chunk__7295,count__7296,i__7297,pos_7317,rform_7318,cfn_7319,arg_no_7320,result))
,new cljs.core.Keyword(null,"arglists","arglists",3710771825).cljs$core$IFn$_invoke$arity$1(rform_7318));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return cljs.core.last.call(null,new cljs.core.Keyword(null,"arglists","arglists",3710771825).cljs$core$IFn$_invoke$arity$1(rform_7318));
}
})();if(cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(rform_7318);if(cljs.core.truth_(and__4872__auto__))
{var and__4872__auto____$1 = cljs.core.not_empty.call(null,new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(rform_7318));if(cljs.core.truth_(and__4872__auto____$1))
{return new cljs.core.Keyword(null,"arglists","arglists",3710771825).cljs$core$IFn$_invoke$arity$1(rform_7318);
} else
{return and__4872__auto____$1;
}
} else
{return and__4872__auto__;
}
})()))
{lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"editor.result.underline","editor.result.underline",541343758),[cljs.core.str(cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,carity_7321),cfn_7319))].join(''),pos_7317);
} else
{}
{
var G__7322 = seq__7293;
var G__7323 = chunk__7295;
var G__7324 = count__7296;
var G__7325 = (i__7297 + 1);
seq__7293 = G__7322;
chunk__7295 = G__7323;
count__7296 = G__7324;
i__7297 = G__7325;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__7293);if(temp__4126__auto__)
{var seq__7293__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7293__$1))
{var c__5632__auto__ = cljs.core.chunk_first.call(null,seq__7293__$1);{
var G__7326 = cljs.core.chunk_rest.call(null,seq__7293__$1);
var G__7327 = c__5632__auto__;
var G__7328 = cljs.core.count.call(null,c__5632__auto__);
var G__7329 = 0;
seq__7293 = G__7326;
chunk__7295 = G__7327;
count__7296 = G__7328;
i__7297 = G__7329;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__7293__$1);var pos_7330 = lt.objs.editor.__GT_cursor.call(null,ed);var rform_7331 = cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));var cfn_7332 = cljs.core.symbol.call(null,[cljs.core.str(new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(rform_7331)),cljs.core.str("/"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(rform_7331))].join(''));var arg_no_7333 = (new cljs.core.Keyword(null,"arg-count","arg-count",1203124810).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.live_doc.cursor_state))) - 1);var carity_7334 = (function (){var or__4884__auto__ = cljs.core.some.call(null,((function (seq__7293,chunk__7295,count__7296,i__7297,pos_7330,rform_7331,cfn_7332,arg_no_7333,result,seq__7293__$1,temp__4126__auto__){
return (function (p1__7286_SHARP_){if(cljs.core._EQ_.call(null,cljs.core.count.call(null,p1__7286_SHARP_),arg_no_7333))
{return p1__7286_SHARP_;
} else
{return null;
}
});})(seq__7293,chunk__7295,count__7296,i__7297,pos_7330,rform_7331,cfn_7332,arg_no_7333,result,seq__7293__$1,temp__4126__auto__))
,new cljs.core.Keyword(null,"arglists","arglists",3710771825).cljs$core$IFn$_invoke$arity$1(rform_7331));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return cljs.core.last.call(null,new cljs.core.Keyword(null,"arglists","arglists",3710771825).cljs$core$IFn$_invoke$arity$1(rform_7331));
}
})();if(cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(rform_7331);if(cljs.core.truth_(and__4872__auto__))
{var and__4872__auto____$1 = cljs.core.not_empty.call(null,new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(rform_7331));if(cljs.core.truth_(and__4872__auto____$1))
{return new cljs.core.Keyword(null,"arglists","arglists",3710771825).cljs$core$IFn$_invoke$arity$1(rform_7331);
} else
{return and__4872__auto____$1;
}
} else
{return and__4872__auto__;
}
})()))
{lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"editor.result.underline","editor.result.underline",541343758),[cljs.core.str(cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,carity_7334),cfn_7332))].join(''),pos_7330);
} else
{}
{
var G__7335 = cljs.core.next.call(null,seq__7293__$1);
var G__7336 = null;
var G__7337 = 0;
var G__7338 = 0;
seq__7293 = G__7335;
chunk__7295 = G__7336;
count__7296 = G__7337;
i__7297 = G__7338;
continue;
}
}
} else
{return null;
}
}
break;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.live-doc","clj-result.live-doc","lt.plugins.live-doc/clj-result.live-doc",3233434325),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.live-doc","editor.eval.clj.result.live-doc",1850493244),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.live_doc.__BEH__clj_result__DOT__live_doc);
lt.plugins.live_doc.__BEH__live_doc_at_cursor = (function __BEH__live_doc_at_cursor(this$){var ed = lt.objs.editor.pool.last_active.call(null);var pos = lt.objs.editor.__GT_cursor.call(null,ed);var ctoken = lt.objs.editor.__GT_token.call(null,ed,pos);if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))))))
{if((lt.plugins.live_doc.ignore_token_QMARK_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(ctoken))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(ctoken),new cljs.core.Keyword(null,"token","token",1124445547).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.live_doc.cursor_state)))))
{return null;
} else
{var temp__4126__auto___7339 = (function (){var and__4872__auto__ = cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"pos","pos",1014015430).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.live_doc.cursor_state))),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos));if(and__4872__auto__)
{return cljs.core.get.call(null,cljs.core.deref.call(null,ed).call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"pos","pos",1014015430).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.live_doc.cursor_state)))),new cljs.core.Keyword(null,"underline","underline",4281907774)], null));
} else
{return and__4872__auto__;
}
})();if(cljs.core.truth_(temp__4126__auto___7339))
{var prev_7340 = temp__4126__auto___7339;lt.object.raise.call(null,prev_7340,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
} else
{}
var temp__4126__auto__ = lt.plugins.live_doc.process_cursor.call(null,ed,pos);if(cljs.core.truth_(temp__4126__auto__))
{var cursor_info = temp__4126__auto__;cljs.core.swap_BANG_.call(null,lt.plugins.live_doc.cursor_state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",1124445547),new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(ctoken),new cljs.core.Keyword(null,"info","info",1017141280),cursor_info,new cljs.core.Keyword(null,"pos","pos",1014015430),pos);
return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),ed,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,ed).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"live-doc","live-doc",2430421065)], null),new cljs.core.Keyword(null,"code","code",1016963423),[cljs.core.str("(lighttable.nrepl.doc/clean-meta (meta (resolve (symbol '"),cljs.core.str(new cljs.core.Keyword(null,"fn","fn",1013907514).cljs$core$IFn$_invoke$arity$1(cursor_info)),cljs.core.str("))))")].join(''))], null));
} else
{return null;
}
}
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.live-doc","live-doc-at-cursor","lt.plugins.live-doc/live-doc-at-cursor",564495031),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"move","move",1017261891),null,new cljs.core.Keyword(null,"active","active",3885920888),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.live_doc.__BEH__live_doc_at_cursor);
}
if(!lt.util.load.provided_QMARK_('lt.plugins.pop-error')) {
goog.provide('lt.plugins.pop_error');
goog.require('cljs.core');
goog.require('crate.binding');
goog.require('lt.util.dom');
goog.require('lt.util.dom');
goog.require('crate.binding');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.pop_error.ansi_set_AMPERSAND_reset = /(.*?)\u001b\[([\d+;]+)m(.*?)\u001b\[m\s*/;
lt.plugins.pop_error.ansi_set = /(.*?)\u001b\[([\d+;]+)m(.*)/;
lt.plugins.pop_error.span_font = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"bold","bold",1016933879),"font-weight: bold",new cljs.core.Keyword(null,"italic","italic",4130090402),"font-style: italic"], null);
lt.plugins.pop_error.span_color = new cljs.core.PersistentArrayMap(null, 8, ["30","black","31","OrangeRed","32","limegreen ","33","yellow","34","blue","35","purple","36","cyan","37","white"], null);
/**
* takes a string with the ansi codes (ex: 1;31) and returns a string with
* the equivalent CSS style to use
*/
lt.plugins.pop_error.mods__GT_css = (function mods__GT_css(mods){return clojure.string.join.call(null,";",(function (){var iter__5601__auto__ = (function iter__6446(s__6447){return (new cljs.core.LazySeq(null,(function (){var s__6447__$1 = s__6447;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__6447__$1);if(temp__4126__auto__)
{var s__6447__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__6447__$2))
{var c__5599__auto__ = cljs.core.chunk_first.call(null,s__6447__$2);var size__5600__auto__ = cljs.core.count.call(null,c__5599__auto__);var b__6449 = cljs.core.chunk_buffer.call(null,size__5600__auto__);if((function (){var i__6448 = 0;while(true){
if((i__6448 < size__5600__auto__))
{var modifier = cljs.core._nth.call(null,c__5599__auto__,i__6448);cljs.core.chunk_append.call(null,b__6449,(function (){var pred__6456 = cljs.core._EQ_;var expr__6457 = modifier;if(cljs.core.truth_(pred__6456.call(null,"1",expr__6457)))
{return new cljs.core.Keyword(null,"bold","bold",1016933879).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{if(cljs.core.truth_(pred__6456.call(null,"3",expr__6457)))
{return new cljs.core.Keyword(null,"italic","italic",4130090402).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{return [cljs.core.str("color:"),cljs.core.str(cljs.core.get.call(null,lt.plugins.pop_error.span_color,modifier))].join('');
}
}
})());
{
var G__6499 = (i__6448 + 1);
i__6448 = G__6499;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__6449),iter__6446.call(null,cljs.core.chunk_rest.call(null,s__6447__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__6449),null);
}
} else
{var modifier = cljs.core.first.call(null,s__6447__$2);return cljs.core.cons.call(null,(function (){var pred__6459 = cljs.core._EQ_;var expr__6460 = modifier;if(cljs.core.truth_(pred__6459.call(null,"1",expr__6460)))
{return new cljs.core.Keyword(null,"bold","bold",1016933879).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{if(cljs.core.truth_(pred__6459.call(null,"3",expr__6460)))
{return new cljs.core.Keyword(null,"italic","italic",4130090402).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{return [cljs.core.str("color:"),cljs.core.str(cljs.core.get.call(null,lt.plugins.pop_error.span_color,modifier))].join('');
}
}
})(),iter__6446.call(null,cljs.core.rest.call(null,s__6447__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__5601__auto__.call(null,clojure.string.split.call(null,mods,/;/));
})());
});
/**
* takes a text with a single ansi-code font change and returns a list with
* the preceding text and a styled span according to the ansi code
*/
lt.plugins.pop_error.inner_span = (function inner_span(text){var csi_inner = cljs.core.zipmap.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"match","match",1117572407),new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"mods","mods",1017261347),new cljs.core.Keyword(null,"content","content",1965434859)], null),cljs.core.re_find.call(null,lt.plugins.pop_error.ansi_set,text));var span_style = lt.plugins.pop_error.mods__GT_css.call(null,new cljs.core.Keyword(null,"mods","mods",1017261347).cljs$core$IFn$_invoke$arity$1(csi_inner));var span_content = new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(csi_inner);if(cljs.core.empty_QMARK_.call(null,csi_inner))
{return cljs.core._conj.call(null,cljs.core.List.EMPTY,text);
} else
{return cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),span_style], null),span_content], null)),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(csi_inner));
}
});
/**
* takes a text-line with ansi code and transforms it into a sequence of spans
* for each ansi font change. The original format is preserved. Each span has
* its own style according to the ansi code used. See span-font and span-color
* for more details
*/
lt.plugins.pop_error.spanner = (function spanner(text){if(cljs.core.empty_QMARK_.call(null,text))
{return null;
} else
{var csi_text = cljs.core.zipmap.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"match","match",1117572407),new cljs.core.Keyword(null,"space","space",1123542136),new cljs.core.Keyword(null,"mods","mods",1017261347),new cljs.core.Keyword(null,"content","content",1965434859)], null),cljs.core.re_find.call(null,lt.plugins.pop_error.ansi_set_AMPERSAND_reset,text));var span_style = lt.plugins.pop_error.mods__GT_css.call(null,new cljs.core.Keyword(null,"mods","mods",1017261347).cljs$core$IFn$_invoke$arity$1(csi_text));var span_content = cljs.core.cons.call(null,new cljs.core.Keyword(null,"space","space",1123542136).cljs$core$IFn$_invoke$arity$1(csi_text),lt.plugins.pop_error.inner_span.call(null,new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(csi_text)));if(cljs.core.empty_QMARK_.call(null,csi_text))
{return text;
} else
{return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),span_style], null),span_content], null),spanner.call(null,cljs.core.subs.call(null,text,cljs.core.count.call(null,new cljs.core.Keyword(null,"match","match",1117572407).cljs$core$IFn$_invoke$arity$1(csi_text)))));
}
}
});
/**
* takes a full stacktrace text with ansi code and transforms it into sequence of divs for
* each line, and spans for each ansi font change. Returns a hiccup structure
*/
lt.plugins.pop_error.ansi__GT_hiccup = (function ansi__GT_hiccup(stack_text){var stack_lines = clojure.string.split_lines.call(null,stack_text);var div_lines = cljs.core.map.call(null,((function (stack_lines){
return (function (p1__6462_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"div","div",1014003715),lt.plugins.pop_error.spanner.call(null,p1__6462_SHARP_)],null));
});})(stack_lines))
,stack_lines);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.full","span.full",4619654693),div_lines], null);
});
lt.plugins.pop_error.__GT_collapse_class = (function __GT_collapse_class(this$,summary){return [cljs.core.str("inline-exception result-mark"),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"open","open",1017321916).cljs$core$IFn$_invoke$arity$1(this$))?" open":null))].join('');
});
lt.plugins.pop_error.collapsible_exception_UI = (function collapsible_exception_UI(this$,info){var e__6275__auto__ = crate.core.html.call(null,(function (){var stacktrace = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(info);var summary = [cljs.core.str(new cljs.core.Keyword(null,"summary","summary",3451231000).cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str(" ...")].join('');return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",1108647146),crate.binding.bound.call(null,this$,((function (stacktrace,summary){
return (function (p1__6463_SHARP_){return lt.plugins.pop_error.__GT_collapse_class.call(null,p1__6463_SHARP_,summary);
});})(stacktrace,summary))
),new cljs.core.Keyword(null,"style","style",1123684643),"background: #73404c; color: #ffa6a6;\n                   max-width:initial; max-height:initial"], null),lt.plugins.pop_error.ansi__GT_hiccup.call(null,stacktrace),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.truncated","span.truncated",906070412),summary], null)], null);
})());var seq__6470_6500 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mousewheel","mousewheel",2043515208),((function (e__6275__auto__){
return (function (e){return lt.util.dom.stop_propagation.call(null,e);
});})(e__6275__auto__))
,new cljs.core.Keyword(null,"click","click",1108654330),((function (e__6275__auto__){
return (function (e){lt.util.dom.prevent.call(null,e);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"click","click",1108654330));
});})(e__6275__auto__))
,new cljs.core.Keyword(null,"contextmenu","contextmenu",911789824),((function (e__6275__auto__){
return (function (e){lt.util.dom.prevent.call(null,e);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",1117686292),e);
});})(e__6275__auto__))
,new cljs.core.Keyword(null,"dblclick","dblclick",3463991820),((function (e__6275__auto__){
return (function (e){lt.util.dom.prevent.call(null,e);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"double-click","double-click",956590078));
});})(e__6275__auto__))
], null)));var chunk__6471_6501 = null;var count__6472_6502 = 0;var i__6473_6503 = 0;while(true){
if((i__6473_6503 < count__6472_6502))
{var vec__6474_6504 = cljs.core._nth.call(null,chunk__6471_6501,i__6473_6503);var ev__6276__auto___6505 = cljs.core.nth.call(null,vec__6474_6504,0,null);var func__6277__auto___6506 = cljs.core.nth.call(null,vec__6474_6504,1,null);lt.util.dom.on.call(null,e__6275__auto__,ev__6276__auto___6505,func__6277__auto___6506);
{
var G__6507 = seq__6470_6500;
var G__6508 = chunk__6471_6501;
var G__6509 = count__6472_6502;
var G__6510 = (i__6473_6503 + 1);
seq__6470_6500 = G__6507;
chunk__6471_6501 = G__6508;
count__6472_6502 = G__6509;
i__6473_6503 = G__6510;
continue;
}
} else
{var temp__4126__auto___6511 = cljs.core.seq.call(null,seq__6470_6500);if(temp__4126__auto___6511)
{var seq__6470_6512__$1 = temp__4126__auto___6511;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6470_6512__$1))
{var c__5632__auto___6513 = cljs.core.chunk_first.call(null,seq__6470_6512__$1);{
var G__6514 = cljs.core.chunk_rest.call(null,seq__6470_6512__$1);
var G__6515 = c__5632__auto___6513;
var G__6516 = cljs.core.count.call(null,c__5632__auto___6513);
var G__6517 = 0;
seq__6470_6500 = G__6514;
chunk__6471_6501 = G__6515;
count__6472_6502 = G__6516;
i__6473_6503 = G__6517;
continue;
}
} else
{var vec__6475_6518 = cljs.core.first.call(null,seq__6470_6512__$1);var ev__6276__auto___6519 = cljs.core.nth.call(null,vec__6475_6518,0,null);var func__6277__auto___6520 = cljs.core.nth.call(null,vec__6475_6518,1,null);lt.util.dom.on.call(null,e__6275__auto__,ev__6276__auto___6519,func__6277__auto___6520);
{
var G__6521 = cljs.core.next.call(null,seq__6470_6512__$1);
var G__6522 = null;
var G__6523 = 0;
var G__6524 = 0;
seq__6470_6500 = G__6521;
chunk__6471_6501 = G__6522;
count__6472_6502 = G__6523;
i__6473_6503 = G__6524;
continue;
}
}
} else
{}
}
break;
}
return e__6275__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.pop-error","collapsible-exception","lt.plugins.pop-error/collapsible-exception",1594897884),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"clear!","clear!",3951036134),null,new cljs.core.Keyword(null,"click","click",1108654330),null,new cljs.core.Keyword(null,"double-click","double-click",956590078),null], null), null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"collapsible.exception","collapsible.exception",4407952093),null,new cljs.core.Keyword(null,"inline","inline",4124874251),null], null), null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,info){var temp__4126__auto__ = lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",1013907473).cljs$core$IFn$_invoke$arity$1(info));if(cljs.core.truth_(temp__4126__auto__))
{var ed = temp__4126__auto__;var content = lt.plugins.pop_error.collapsible_exception_UI.call(null,this$,info);lt.object.merge_BANG_.call(null,this$,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"widget","widget",4520824246),lt.objs.editor.line_widget.call(null,lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",1013907473).cljs$core$IFn$_invoke$arity$1(info)),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(info)),content,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"coverGutter","coverGutter",510635812),false], null))));
return content;
} else
{return null;
}
}));
lt.plugins.pop_error.__BEH__expandable_exceptions = (function __BEH__expandable_exceptions(this$,summary,stack,loc){var ed = new cljs.core.Keyword(null,"ed","ed",1013907473).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var ex_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.pop-error","collapsible-exception","lt.plugins.pop-error/collapsible-exception",1594897884),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),this$,new cljs.core.Keyword(null,"result","result",4374444943),stack,new cljs.core.Keyword(null,"summary","summary",3451231000),summary,new cljs.core.Keyword(null,"loc","loc",1014011570),loc,new cljs.core.Keyword(null,"line","line",1017226086),line], null));var temp__4126__auto___6525 = cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"inline","inline",4124874251)], null));if(cljs.core.truth_(temp__4126__auto___6525))
{var prev_6526 = temp__4126__auto___6525;if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",1017321916).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_6526))))
{lt.object.merge_BANG_.call(null,ex_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",1017321916),true], null));
} else
{}
lt.object.raise.call(null,prev_6526,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
} else
{}
if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",3689311729).cljs$core$IFn$_invoke$arity$1(loc)))
{var seq__6483_6527 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (ed,line,ex_obj){
return (function (p1__6476_SHARP_){return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__6476_SHARP_),new cljs.core.Keyword(null,"inline","inline",4124874251)], null));
});})(ed,line,ex_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",3689311729).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc))));var chunk__6485_6528 = null;var count__6486_6529 = 0;var i__6487_6530 = 0;while(true){
if((i__6487_6530 < count__6486_6529))
{var widget_6531 = cljs.core._nth.call(null,chunk__6485_6528,i__6487_6530);if(cljs.core.truth_(widget_6531))
{lt.object.raise.call(null,widget_6531,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__6532 = seq__6483_6527;
var G__6533 = chunk__6485_6528;
var G__6534 = count__6486_6529;
var G__6535 = (i__6487_6530 + 1);
seq__6483_6527 = G__6532;
chunk__6485_6528 = G__6533;
count__6486_6529 = G__6534;
i__6487_6530 = G__6535;
continue;
}
} else
{{
var G__6536 = seq__6483_6527;
var G__6537 = chunk__6485_6528;
var G__6538 = count__6486_6529;
var G__6539 = (i__6487_6530 + 1);
seq__6483_6527 = G__6536;
chunk__6485_6528 = G__6537;
count__6486_6529 = G__6538;
i__6487_6530 = G__6539;
continue;
}
}
} else
{var temp__4126__auto___6540 = cljs.core.seq.call(null,seq__6483_6527);if(temp__4126__auto___6540)
{var seq__6483_6541__$1 = temp__4126__auto___6540;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6483_6541__$1))
{var c__5632__auto___6542 = cljs.core.chunk_first.call(null,seq__6483_6541__$1);{
var G__6543 = cljs.core.chunk_rest.call(null,seq__6483_6541__$1);
var G__6544 = c__5632__auto___6542;
var G__6545 = cljs.core.count.call(null,c__5632__auto___6542);
var G__6546 = 0;
seq__6483_6527 = G__6543;
chunk__6485_6528 = G__6544;
count__6486_6529 = G__6545;
i__6487_6530 = G__6546;
continue;
}
} else
{var widget_6547 = cljs.core.first.call(null,seq__6483_6541__$1);if(cljs.core.truth_(widget_6547))
{lt.object.raise.call(null,widget_6547,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__6548 = cljs.core.next.call(null,seq__6483_6541__$1);
var G__6549 = null;
var G__6550 = 0;
var G__6551 = 0;
seq__6483_6527 = G__6548;
chunk__6485_6528 = G__6549;
count__6486_6529 = G__6550;
i__6487_6530 = G__6551;
continue;
}
} else
{{
var G__6552 = cljs.core.next.call(null,seq__6483_6541__$1);
var G__6553 = null;
var G__6554 = 0;
var G__6555 = 0;
seq__6483_6527 = G__6552;
chunk__6485_6528 = G__6553;
count__6486_6529 = G__6554;
i__6487_6530 = G__6555;
continue;
}
}
}
} else
{}
}
break;
}
} else
{}
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",2354242081)], null),cljs.core.assoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"inline","inline",4124874251)], null),ex_obj);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.pop-error","expandable-exceptions","lt.plugins.pop-error/expandable-exceptions",1842341293),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.exception.collapsible","editor.exception.collapsible",1104975516),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.pop_error.__BEH__expandable_exceptions);
}
if(!lt.util.load.provided_QMARK_('lt.plugins.user')) {
goog.provide('lt.plugins.user');
goog.require('cljs.core');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor');
goog.require('lt.object');
lt.plugins.user.lighttable_internals = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [/lighttable\.nrepl\.core/,null,/clojure\.tools\.nrepl\.middleware\.interruptible-eval/,null,/lighttable\.nrepl\.eval/,null], null), null);
lt.plugins.user.clojure_internals = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [/java\.lang\.Thread\.run/,null,/java\.util\.concurrent\.ThreadPoolExecutor/,null], null), null);
lt.plugins.user.match_ns_QMARK_ = (function match_ns_QMARK_(line,namespaces){while(true){
if(cljs.core.empty_QMARK_.call(null,namespaces))
{return null;
} else
{if(cljs.core.truth_(cljs.core.re_find.call(null,cljs.core.first.call(null,namespaces),line)))
{return true;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__6572 = line;
var G__6573 = cljs.core.rest.call(null,namespaces);
line = G__6572;
namespaces = G__6573;
continue;
}
} else
{return null;
}
}
}
break;
}
});
lt.plugins.user.ignore_QMARK_ = (function ignore_QMARK_(line){var or__4884__auto__ = lt.plugins.user.match_ns_QMARK_.call(null,line,lt.plugins.user.clojure_internals);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return lt.plugins.user.match_ns_QMARK_.call(null,line,lt.plugins.user.lighttable_internals);
}
});
lt.plugins.user.filter_internals = (function filter_internals(stringtrace){var lines = clojure.string.split.call(null,stringtrace,/\n/);return clojure.string.join.call(null,"\n",cljs.core.remove.call(null,lt.plugins.user.ignore_QMARK_,lines));
});
/**
* truncate a string at newline or at 100 characters long
*/
lt.plugins.user.truncate = (function truncate(text){if(cljs.core.empty_QMARK_.call(null,text))
{return null;
} else
{return cljs.core.subs.call(null,cljs.core.first.call(null,clojure.string.split_lines.call(null,text)),0,100);
}
});
/**
* Removes ANSI codes from a string, returning just the raw text.
*/
lt.plugins.user.strip_ansi = (function strip_ansi(string){return clojure.string.replace.call(null,string,/\u001b\[.*?m/,"");
});
lt.plugins.user.__BEH__clj_expandable_exception = (function __BEH__clj_expandable_exception(editor,res,passed_QMARK_){if(cljs.core.truth_(passed_QMARK_))
{} else
{lt.objs.notifos.done_working.call(null,"");
}
var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var msg = lt.plugins.user.truncate.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res));var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$2(meta,0),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$2(meta,1) - 1)], null);lt.objs.notifos.set_msg_BANG_.call(null,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return lt.object.raise.call(null,lt.plugins.user.obj,new cljs.core.Keyword(null,"editor.exception.collapsible","editor.exception.collapsible",1104975516),msg,new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res),loc);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.user","clj-expandable-exception","lt.plugins.user/clj-expandable-exception",1455758174),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.user.__BEH__clj_expandable_exception);
lt.plugins.user.__BEH__cljs_expandable_exception = (function __BEH__cljs_expandable_exception(obj,res,passed_QMARK_){if(cljs.core.truth_(passed_QMARK_))
{} else
{lt.objs.notifos.done_working.call(null,"");
}
var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var msg = lt.plugins.user.truncate.call(null,[cljs.core.str((function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})())].join(''));var stack = (cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res))?new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res):(cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__4872__auto__))
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack;
} else
{return and__4872__auto__;
}
})())?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack:(cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__4872__auto__))
{return new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(meta);
} else
{return and__4872__auto__;
}
})())?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res):(cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__4872__auto__))
{return cljs.core.not.call(null,new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(meta));
} else
{return and__4872__auto__;
}
})())?cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res)):((!((msg == null)))?(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})():((new cljs.core.Keyword(null,"else","else",1017020587))?"Unknown error":null))))));lt.objs.notifos.set_msg_BANG_.call(null,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.exception.collapsible","editor.exception.collapsible",1104975516),msg,lt.plugins.user.filter_internals.call(null,stack),loc);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.user","cljs-expandable-exception","lt.plugins.user/cljs-expandable-exception",968415503),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.user.__BEH__cljs_expandable_exception);
}

//# sourceMappingURL=user_compiled.js.map