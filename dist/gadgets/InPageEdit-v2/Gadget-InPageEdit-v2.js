/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{mw.loader.load("https://testingcf.jsdelivr.net/npm/mediawiki-inpageedit@latest"),mw.hook("InPageEdit").add(e=>{const i=e.InPageEdit,{wgRelevantPageName:t,wgRevisionId:a}=mw.config.get(["wgRelevantPageName","wgRevisionId"]);$("#ca-edit").after($("<li>",{id:"ca-quick-edit",class:"vector-tab-noicon mw-list-item"}).append($("<a>",{href:"javascript:void(0)",text:e._msg("quick-edit")}).on("click",()=>{i.quickEdit({page:t,revision:a||void 0})})))});})();

/* </nowiki> */
