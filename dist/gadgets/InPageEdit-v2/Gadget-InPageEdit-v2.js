/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{mw.loader.load("https://testingcf.jsdelivr.net/npm/mediawiki-inpageedit@latest"),mw.hook("InPageEdit").add(e=>{const t=e.InPageEdit,i=e._msg,{wgRelevantPageName:a,wgRevisionId:d}=mw.config.get(["wgRelevantPageName","wgRevisionId"]);$("#ca-edit").after($("<li>",{id:"ca-quick-edit",class:"vector-tab-noicon mw-list-item"}).append($("<a>",{href:"javascript:void(0)",text:typeof Wikiplus!="undefined"?`${i("quick-edit")}(IPE)`:i("quick-edit")}).on("click",()=>{t.quickEdit({page:a,revision:d||void 0})})))});})();

/* </nowiki> */
