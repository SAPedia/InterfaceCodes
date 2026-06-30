/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{$(()=>{const{wgPageName:e,wgIsArticle:t}=mw.config.get(["wgPageName","wgIsArticle"]);t&&(mw.util.addPortletLink("p-cactions","#","清除缓存","ca-purge-cache","点击清除当前页面缓存"),$("#ca-purge-cache").on("click",async r=>{r.preventDefault();try{await new mw.Api().post({action:"purge",title:e,forcelinkupdate:!0,forcerecursivelinkupdate:!0}),mw.notify("清除成功，即将刷新……",{type:"success"}),setTimeout(()=>{location.reload()},2e3)}catch(c){mw.notify("清除缓存失败，请重试或于控制台查看详情",{type:"error"}),console.error(`[purgeCache] ${String(c)}`)}}))});})();

/* </nowiki> */
