/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{(()=>{let c=new LocalObjectStorage("libCachedCode",{expires:[30,"days"]});for(let e of Object.keys(localStorage))e.startsWith("libCachedCode")&&localStorage.removeItem(e);let r=e=>{let t=new Blob([e],{type:"text/plain"});return URL.createObjectURL(t)},s=async e=>{let{code:t}=c.getItem(`${e}`)||{};return typeof t!="string"&&(t=await(await fetch(e)).text()),c.setItem(`libCachedCode:${e}`,{code:t}),t},i=async e=>r(await s(e)),n=async(e,t)=>{let o=t.toLowerCase();if(["script","javascript","js"].includes(o)){let a=document.createElement("script");return a.src=await i(e),await new Promise(l=>{a.addEventListener("load",()=>{l()}),document.head.append(a)})}if(["css","style"].includes(o)){mw.loader.addStyleTag(await s(e));return}},d=(e,t)=>Promise.all(e.map(o=>n(o,t)));window.libCachedCode={getCachedCode:s,getCachedCodeUrl:i,injectCachedCode:n,batchInjectCachedCode:d}})();})();

/* </nowiki> */
