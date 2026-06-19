/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{(()=>{const{wgAction:d,wgCodeEditorCurrentLanguage:l}=mw.config.get(["wgAction","wgCodeEditorCurrentLanguage"]);["edit","submit"].includes(String(d))&&window.addEventListener("keydown",e=>{if(!e.ctrlKey)return;const t=document.getElementById("wpSave"),n=document.getElementById("wpMinoredit"),c=document.getElementById("wpPreview"),r=document.getElementById("wpDiff"),i=document.querySelector("#wpTemplateSandboxPreview input");switch(e.key){case"s":e.preventDefault(),t==null||t.click();break;case"S":e.preventDefault(),n==null||n.click(),t==null||t.click();break;case"V":e.preventDefault(),l==="lua"&&(i==null||i.click()),c==null||c.click();break;case"D":e.preventDefault(),r==null||r.click();break}})})();})();

/* </nowiki> */
