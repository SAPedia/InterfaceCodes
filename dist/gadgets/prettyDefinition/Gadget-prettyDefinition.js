/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{(()=>{const{wgPageName:M,wgFormattedNamespaces:h}=mw.config.get(["wgPageName","wgFormattedNamespaces"]);if(!(M==="MediaWiki:Gadgets-definition"&&document.querySelector(".mw-parser-output")))return;const m=document.createElement("a"),d=(t,e)=>(m.href=t,m.textContent=e,m.outerHTML),r=(t,e)=>d(mw.util.getUrl(t),e||t),p=t=>r(`MediaWiki:Gadget-${t}`,t),w=/^(\s*)([\w_-]+)\s*/,k=t=>`Gadget-${t}`,f=(t,e)=>d(`#${k(t)}`,e||t),L=t=>{var n;const e=w.exec(t);return e&&(n=e[2])!=null?n:null},c=(t,e)=>t.replace(/([^,\s](?:[^,]*[^,\s])*)(?=\s*(?:,|$))/g,e),N=(t,e,n,i,a)=>{let g=a;switch(e){case"dependencies":g=c(a,s=>{const o=/^ext\.gadget\.(.+)$/.exec(s);return o&&o[1]?f(o[1],s):r(`mw:ResourceLoader/Core modules#${s}`,s)});break;case"rights":e=r("mw:Manual:User_rights#List_of_permissions",e);break;case"skins":{e=r("mw:Manual:Skins","skins"),g=c(a,s=>r(`mw:Skin:${s}`,s));break}case"peers":g=c(a,f);break;case"namespaces":{g=c(a,s=>{const o=parseInt(s);if(!isNaN(o)){const u=h[o];if(u!==void 0){const l=document.createElement("abbr");return l.title=u===""?"(main)":u,l.textContent=s,l.outerHTML}}return s});break}case"categories":g=c(a,s=>r(`Category:${s}`,s));break}return`${e}${n}=${i}${g.replace(/\s*,\s*/g,", ")}`},b=t=>t.replace(w,(e,n,i)=>`${n}${p(i)} `).replace(/([\w_\-.]+\.(?:css|js(?:on)?))/g,p).replace(/(\s*)\|(\s*)/g," | ").replace(/([a-z]+)(\s*)=(\s*)(.+?)(?=\s*[|\]])/g,N);$(()=>{const t=$(".mw-parser-output");t.find("li:not(.gadgets-validation li)").each((e,n)=>{const i=L(n.innerHTML);i&&(n.id=k(i)),n.innerHTML=b(n.innerHTML)}),t.find("pre:not(.gadgets-validation pre)").each((e,n)=>{n.innerHTML=n.innerHTML.replace(/[^\n]+/g,b)})})})();})();

/* </nowiki> */
