/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{(()=>{const s=new LocalObjectStorage("AnnTools-libCachedCode",{expires:[30,"days"]});for(const e of Object.keys(localStorage))e.startsWith("AnnTools-libCachedCode")&&localStorage.removeItem(e);const i=e=>{const t=new Blob([e],{type:"text/plain"});return URL.createObjectURL(t)},a=async e=>{let{code:t}=s.getItem(`${e}`)||{};return typeof t!="string"&&(t=await(await fetch(e)).text()),s.setItem(`AnnTools-libCachedCode:${e}`,{code:t}),t},n=async e=>i(await a(e)),d=async(e,t)=>{const o=t.toLowerCase();if(["script","javascript","js"].includes(o)){const c=document.createElement("script");return c.src=await n(e),await new Promise(l=>{c.addEventListener("load",()=>{l()}),document.head.append(c)})}if(["css","style"].includes(o)){mw.loader.addStyleTag(await a(e));return}},r=(e,t)=>Promise.all(e.map(o=>d(o,t)));window.libCachedCode={getCachedCode:a,getCachedCodeUrl:n,injectCachedCode:d,batchInjectCachedCode:r}})();})();

/* </nowiki> */
