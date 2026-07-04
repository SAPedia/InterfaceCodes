/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{$(()=>{let{wgPageName:e,wgIsArticle:c}=mw.config.get(["wgPageName","wgIsArticle"]);if(!c)return;let t=new mw.Api;mw.util.addPortletLink("p-cactions","#","清除缓存","ca-purge-cache","点击清除当前页面缓存"),$("#ca-purge-cache").on("click",async r=>{r.preventDefault();try{await t.post({action:"purge",title:e,forcelinkupdate:!0,forcerecursivelinkupdate:!0}),await t.postWithToken("csrf",{action:"edit",title:e,appendtext:"",nocreate:!0,watchlist:"nochange"}),mw.notify("清除成功，即将刷新……",{type:"success"}),setTimeout(()=>{location.reload()},2e3)}catch(a){mw.notify("清除缓存失败，请重试或于控制台查看详情",{type:"error"}),console.error(`[purgeCache] ${String(a)}`)}})});})();

/* </nowiki> */
