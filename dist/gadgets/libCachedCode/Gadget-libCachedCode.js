/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{(()=>{const n=new LocalObjectStorage("AnnTools-libCachedCode",{expires:[30,"days"]});for(const e of Object.keys(localStorage))e.startsWith("AnnTools-libCachedCode")&&localStorage.removeItem(e);const r=e=>{const t=new Blob([e],{type:"text/plain"});return URL.createObjectURL(t)},s=async e=>{let{code:t}=n.getItem(`${e}`)||{};return typeof t!="string"&&(t=await(await fetch(e)).text()),n.setItem(`AnnTools-libCachedCode:${e}`,{code:t}),t},c=async e=>r(await s(e)),i=async(e,t)=>{const o=t.toLowerCase();if(["script","javascript","js"].includes(o)){const a=document.createElement("script");return a.src=await c(e),await new Promise(l=>{a.addEventListener("load",()=>{l()}),document.head.append(a)})}if(["css","style"].includes(o)){mw.loader.addStyleTag(await s(e));return}},d=(e,t)=>Promise.all(e.map(o=>i(o,t)));window.libCachedCode={getCachedCode:s,getCachedCodeUrl:c,injectCachedCode:i,batchInjectCachedCode:d}})();})();

/* </nowiki> */
