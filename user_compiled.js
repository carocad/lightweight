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
lt.plugins.live_doc.left_brace = (function left_brace(ed,idx){while(true){
var pos = lt.plugins.live_doc.index__GT_pos.call(null,ed,idx);if((cljs.core._EQ_.call(null,lt.objs.editor.__GT_token_type.call(null,ed,pos),"bracket")) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,ed,pos)),"(")))
{return lt.plugins.live_doc.index__GT_pos.call(null,ed,(idx - 1));
} else
{if((idx === 0))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__6369 = ed;
var G__6370 = (idx - 1);
ed = G__6369;
idx = G__6370;
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
lt.plugins.live_doc.right_brace = (function right_brace(ed,last_idx,stack,idx){while(true){
var pos = lt.plugins.live_doc.index__GT_pos.call(null,ed,idx);if(cljs.core.empty_QMARK_.call(null,stack))
{return lt.plugins.live_doc.index__GT_pos.call(null,ed,(idx - 1));
} else
{if((idx >= last_idx))
{return null;
} else
{if(cljs.core.not_EQ_.call(null,lt.objs.editor.__GT_token_type.call(null,ed,pos),"bracket"))
{{
var G__6371 = ed;
var G__6372 = last_idx;
var G__6373 = stack;
var G__6374 = (idx + 1);
ed = G__6371;
last_idx = G__6372;
stack = G__6373;
idx = G__6374;
continue;
}
} else
{if(new cljs.core.Keyword(null,"brace","brace",1107901861))
{var token = new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,ed,pos));if(cljs.core.contains_QMARK_.call(null,lt.plugins.live_doc.open_braces,token))
{{
var G__6375 = ed;
var G__6376 = last_idx;
var G__6377 = cljs.core.conj.call(null,stack,token);
var G__6378 = (idx + 1);
ed = G__6375;
last_idx = G__6376;
stack = G__6377;
idx = G__6378;
continue;
}
} else
{if(cljs.core._EQ_.call(null,cljs.core.peek.call(null,stack),cljs.core.get.call(null,lt.plugins.live_doc.opposites,token)))
{{
var G__6379 = ed;
var G__6380 = last_idx;
var G__6381 = cljs.core.pop.call(null,stack);
var G__6382 = (idx + 1);
ed = G__6379;
last_idx = G__6380;
stack = G__6381;
idx = G__6382;
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
lt.plugins.live_doc.valid_range_QMARK_ = (function valid_range_QMARK_(ed,start,pos,stop){return ((lt.objs.editor.pos__GT_index.call(null,ed,start) < lt.objs.editor.pos__GT_index.call(null,ed,pos))) && ((lt.objs.editor.pos__GT_index.call(null,ed,pos) < lt.objs.editor.pos__GT_index.call(null,ed,stop)));
});
lt.plugins.live_doc.cursor_form = (function cursor_form(ed,pos){var start = lt.plugins.live_doc.left_brace.call(null,ed,lt.objs.editor.pos__GT_index.call(null,ed,pos));var close = (((start == null))?null:lt.plugins.live_doc.right_brace.call(null,ed,lt.plugins.live_doc.last_index.call(null,ed),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["("], null),(2 + lt.objs.editor.pos__GT_index.call(null,ed,start))));if(lt.plugins.live_doc.valid_range_QMARK_.call(null,ed,start,pos,close))
{return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),close,new cljs.core.Keyword(null,"range","range",1122184367),lt.objs.editor.range.call(null,ed,start,close)], null);
} else
{return null;
}
});
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
lt.plugins.pop_error.mods__GT_css = (function mods__GT_css(mods){return clojure.string.join.call(null,";",(function (){var iter__5601__auto__ = (function iter__6399(s__6400){return (new cljs.core.LazySeq(null,(function (){var s__6400__$1 = s__6400;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__6400__$1);if(temp__4126__auto__)
{var s__6400__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__6400__$2))
{var c__5599__auto__ = cljs.core.chunk_first.call(null,s__6400__$2);var size__5600__auto__ = cljs.core.count.call(null,c__5599__auto__);var b__6402 = cljs.core.chunk_buffer.call(null,size__5600__auto__);if((function (){var i__6401 = 0;while(true){
if((i__6401 < size__5600__auto__))
{var modifier = cljs.core._nth.call(null,c__5599__auto__,i__6401);cljs.core.chunk_append.call(null,b__6402,(function (){var pred__6409 = cljs.core._EQ_;var expr__6410 = modifier;if(cljs.core.truth_(pred__6409.call(null,"1",expr__6410)))
{return new cljs.core.Keyword(null,"bold","bold",1016933879).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{if(cljs.core.truth_(pred__6409.call(null,"3",expr__6410)))
{return new cljs.core.Keyword(null,"italic","italic",4130090402).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{return [cljs.core.str("color:"),cljs.core.str(cljs.core.get.call(null,lt.plugins.pop_error.span_color,modifier))].join('');
}
}
})());
{
var G__6452 = (i__6401 + 1);
i__6401 = G__6452;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__6402),iter__6399.call(null,cljs.core.chunk_rest.call(null,s__6400__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__6402),null);
}
} else
{var modifier = cljs.core.first.call(null,s__6400__$2);return cljs.core.cons.call(null,(function (){var pred__6412 = cljs.core._EQ_;var expr__6413 = modifier;if(cljs.core.truth_(pred__6412.call(null,"1",expr__6413)))
{return new cljs.core.Keyword(null,"bold","bold",1016933879).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{if(cljs.core.truth_(pred__6412.call(null,"3",expr__6413)))
{return new cljs.core.Keyword(null,"italic","italic",4130090402).cljs$core$IFn$_invoke$arity$1(lt.plugins.pop_error.span_font);
} else
{return [cljs.core.str("color:"),cljs.core.str(cljs.core.get.call(null,lt.plugins.pop_error.span_color,modifier))].join('');
}
}
})(),iter__6399.call(null,cljs.core.rest.call(null,s__6400__$2)));
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
return (function (p1__6415_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"div","div",1014003715),lt.plugins.pop_error.spanner.call(null,p1__6415_SHARP_)],null));
});})(stack_lines))
,stack_lines);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.full","span.full",4619654693),div_lines], null);
});
lt.plugins.pop_error.__GT_collapse_class = (function __GT_collapse_class(this$,summary){return [cljs.core.str("inline-exception result-mark"),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"open","open",1017321916).cljs$core$IFn$_invoke$arity$1(this$))?" open":null))].join('');
});
lt.plugins.pop_error.collapsible_exception_UI = (function collapsible_exception_UI(this$,info){var e__6275__auto__ = crate.core.html.call(null,(function (){var stacktrace = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(info);var summary = [cljs.core.str(new cljs.core.Keyword(null,"summary","summary",3451231000).cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str(" ...")].join('');return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",1108647146),crate.binding.bound.call(null,this$,((function (stacktrace,summary){
return (function (p1__6416_SHARP_){return lt.plugins.pop_error.__GT_collapse_class.call(null,p1__6416_SHARP_,summary);
});})(stacktrace,summary))
),new cljs.core.Keyword(null,"style","style",1123684643),"background: #73404c; color: #ffa6a6;\n                   max-width:initial; max-height:initial"], null),lt.plugins.pop_error.ansi__GT_hiccup.call(null,stacktrace),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.truncated","span.truncated",906070412),summary], null)], null);
})());var seq__6423_6453 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mousewheel","mousewheel",2043515208),((function (e__6275__auto__){
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
], null)));var chunk__6424_6454 = null;var count__6425_6455 = 0;var i__6426_6456 = 0;while(true){
if((i__6426_6456 < count__6425_6455))
{var vec__6427_6457 = cljs.core._nth.call(null,chunk__6424_6454,i__6426_6456);var ev__6276__auto___6458 = cljs.core.nth.call(null,vec__6427_6457,0,null);var func__6277__auto___6459 = cljs.core.nth.call(null,vec__6427_6457,1,null);lt.util.dom.on.call(null,e__6275__auto__,ev__6276__auto___6458,func__6277__auto___6459);
{
var G__6460 = seq__6423_6453;
var G__6461 = chunk__6424_6454;
var G__6462 = count__6425_6455;
var G__6463 = (i__6426_6456 + 1);
seq__6423_6453 = G__6460;
chunk__6424_6454 = G__6461;
count__6425_6455 = G__6462;
i__6426_6456 = G__6463;
continue;
}
} else
{var temp__4126__auto___6464 = cljs.core.seq.call(null,seq__6423_6453);if(temp__4126__auto___6464)
{var seq__6423_6465__$1 = temp__4126__auto___6464;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6423_6465__$1))
{var c__5632__auto___6466 = cljs.core.chunk_first.call(null,seq__6423_6465__$1);{
var G__6467 = cljs.core.chunk_rest.call(null,seq__6423_6465__$1);
var G__6468 = c__5632__auto___6466;
var G__6469 = cljs.core.count.call(null,c__5632__auto___6466);
var G__6470 = 0;
seq__6423_6453 = G__6467;
chunk__6424_6454 = G__6468;
count__6425_6455 = G__6469;
i__6426_6456 = G__6470;
continue;
}
} else
{var vec__6428_6471 = cljs.core.first.call(null,seq__6423_6465__$1);var ev__6276__auto___6472 = cljs.core.nth.call(null,vec__6428_6471,0,null);var func__6277__auto___6473 = cljs.core.nth.call(null,vec__6428_6471,1,null);lt.util.dom.on.call(null,e__6275__auto__,ev__6276__auto___6472,func__6277__auto___6473);
{
var G__6474 = cljs.core.next.call(null,seq__6423_6465__$1);
var G__6475 = null;
var G__6476 = 0;
var G__6477 = 0;
seq__6423_6453 = G__6474;
chunk__6424_6454 = G__6475;
count__6425_6455 = G__6476;
i__6426_6456 = G__6477;
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
lt.plugins.pop_error.__BEH__expandable_exceptions = (function __BEH__expandable_exceptions(this$,summary,stack,loc){var ed = new cljs.core.Keyword(null,"ed","ed",1013907473).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var ex_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.pop-error","collapsible-exception","lt.plugins.pop-error/collapsible-exception",1594897884),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),this$,new cljs.core.Keyword(null,"result","result",4374444943),stack,new cljs.core.Keyword(null,"summary","summary",3451231000),summary,new cljs.core.Keyword(null,"loc","loc",1014011570),loc,new cljs.core.Keyword(null,"line","line",1017226086),line], null));var temp__4126__auto___6478 = cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"inline","inline",4124874251)], null));if(cljs.core.truth_(temp__4126__auto___6478))
{var prev_6479 = temp__4126__auto___6478;if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",1017321916).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_6479))))
{lt.object.merge_BANG_.call(null,ex_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",1017321916),true], null));
} else
{}
lt.object.raise.call(null,prev_6479,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
} else
{}
if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",3689311729).cljs$core$IFn$_invoke$arity$1(loc)))
{var seq__6436_6480 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (ed,line,ex_obj){
return (function (p1__6429_SHARP_){return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__6429_SHARP_),new cljs.core.Keyword(null,"inline","inline",4124874251)], null));
});})(ed,line,ex_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",3689311729).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc))));var chunk__6438_6481 = null;var count__6439_6482 = 0;var i__6440_6483 = 0;while(true){
if((i__6440_6483 < count__6439_6482))
{var widget_6484 = cljs.core._nth.call(null,chunk__6438_6481,i__6440_6483);if(cljs.core.truth_(widget_6484))
{lt.object.raise.call(null,widget_6484,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__6485 = seq__6436_6480;
var G__6486 = chunk__6438_6481;
var G__6487 = count__6439_6482;
var G__6488 = (i__6440_6483 + 1);
seq__6436_6480 = G__6485;
chunk__6438_6481 = G__6486;
count__6439_6482 = G__6487;
i__6440_6483 = G__6488;
continue;
}
} else
{{
var G__6489 = seq__6436_6480;
var G__6490 = chunk__6438_6481;
var G__6491 = count__6439_6482;
var G__6492 = (i__6440_6483 + 1);
seq__6436_6480 = G__6489;
chunk__6438_6481 = G__6490;
count__6439_6482 = G__6491;
i__6440_6483 = G__6492;
continue;
}
}
} else
{var temp__4126__auto___6493 = cljs.core.seq.call(null,seq__6436_6480);if(temp__4126__auto___6493)
{var seq__6436_6494__$1 = temp__4126__auto___6493;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6436_6494__$1))
{var c__5632__auto___6495 = cljs.core.chunk_first.call(null,seq__6436_6494__$1);{
var G__6496 = cljs.core.chunk_rest.call(null,seq__6436_6494__$1);
var G__6497 = c__5632__auto___6495;
var G__6498 = cljs.core.count.call(null,c__5632__auto___6495);
var G__6499 = 0;
seq__6436_6480 = G__6496;
chunk__6438_6481 = G__6497;
count__6439_6482 = G__6498;
i__6440_6483 = G__6499;
continue;
}
} else
{var widget_6500 = cljs.core.first.call(null,seq__6436_6494__$1);if(cljs.core.truth_(widget_6500))
{lt.object.raise.call(null,widget_6500,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__6501 = cljs.core.next.call(null,seq__6436_6494__$1);
var G__6502 = null;
var G__6503 = 0;
var G__6504 = 0;
seq__6436_6480 = G__6501;
chunk__6438_6481 = G__6502;
count__6439_6482 = G__6503;
i__6440_6483 = G__6504;
continue;
}
} else
{{
var G__6505 = cljs.core.next.call(null,seq__6436_6494__$1);
var G__6506 = null;
var G__6507 = 0;
var G__6508 = 0;
seq__6436_6480 = G__6505;
chunk__6438_6481 = G__6506;
count__6439_6482 = G__6507;
i__6440_6483 = G__6508;
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
lt.plugins.user.lighttable_internals = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [/clojure\.tools\.nrepl\.middleware\.interruptible-eval/,null,/lighttable\.nrepl\.core/,null,/lighttable\.nrepl\.eval/,null], null), null);
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
var G__6525 = line;
var G__6526 = cljs.core.rest.call(null,namespaces);
line = G__6525;
namespaces = G__6526;
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