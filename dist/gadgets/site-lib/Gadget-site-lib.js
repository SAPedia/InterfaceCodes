/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{window.wgUXS=(e,t,a,r,i,n,s,w,g,o)=>({zh:w||t||a||r||i||n||s||g||o||"","zh-hans":t||r||s||o||"","zh-hant":a||i||n||g||"","zh-cn":r||t||s||o||"","zh-sg":s||t||r||o||"","zh-tw":i||a||n||g||"","zh-hk":n||a||g||i||"","zh-mo":g||a||n||i||""})[e]||w||t||a||r||i||n||s||g||o;window.wgULS=(e,t,a,r,i,n,s,w,g)=>window.wgUXS(mw.config.get("wgUserLanguage"),e,t,a,r,i,n,s,w,g);window.wgUVS=(e,t,a,r,i,n,s,w,g)=>window.wgUXS(mw.config.get("wgUserVariant"),e,t,a,r,i,n,s,w,g);var c=mw.log.deprecate;c(window,"addPortletLink",(...e)=>mw.util.addPortletLink.bind(mw.util)(...e),"Use mw.util.addPortletLink() instead");c(window,"getURLParamValue",(...e)=>mw.util.getParamValue.bind(mw.util)(...e),"Use mw.util.getParamValue() instead");c(window,"hasClass",(e,t)=>$(e).hasClass(t),"Use jQuery#hasClass instead");var l=window.libCachedCode;c(window,"importScriptCallback",(e,t)=>l.injectCachedCode(`${mw.config.get("wgServer")}${mw.config.get("wgScript")}?title=${mw.util.wikiUrlencode(e)}&action=raw&ctype=text/javascript`,"script").then(t),'Use `await libCachedCode.injectCachedCode(page, "script")` instead');c(window,"importScriptURICallback",(e,t)=>l.injectCachedCode(e,"script").then(t),'Use `await libCachedCode.injectCachedCode(page, "script")` instead');window.libPrefixNumber=(e,t=2)=>`${e}`.padStart(t,"0");var{wgNamespaceNumber:d,wgNamespaceIds:m}=mw.config.get(["wgNamespaceNumber","wgNamespaceIds"]);window.libGetPageNames=()=>{let e={talkPage:!1,basePageName:!1},t=[],a=d<0||d%2===1?NaN:d+1,r="";for(let[s,w]of Object.entries(m))w===d&&t.push(s),!r&&w===a&&(r=s);if(t.length===0)return e;let i=mw.config.get("wgPageName"),n=i.toLowerCase();for(let s of t){let w=`${s.toLowerCase()}:`;if(n.startsWith(w)){let g=mw.util.escapeRegExp(s);i=i.replace(new RegExp(`^${g}:`,"i"),"");break}}return e.basePageName=i,r&&(e.talkPage=`${r}:${i}`),e};})();

/* </nowiki> */
