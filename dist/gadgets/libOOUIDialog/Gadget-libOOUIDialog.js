/**
 * -------------------------------------------------------------------------
 * !!! DON'T MODIFY THIS PAGE MANUALLY, YOUR CHANGES WILL BE OVERWRITTEN !!!
 * !!!     Repository URL: https://github.com/SAPedia/InterfaceCodes     !!!
 * -------------------------------------------------------------------------
 */

/* <nowiki> */

"use strict";(()=>{var z=Object.defineProperty;var m=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var O=(n,i,e)=>i in n?z(n,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[i]=e,c=(n,i)=>{for(var e in i||(i={}))x.call(i,e)&&O(n,e,i[e]);if(m)for(var e of m(i))y.call(i,e)&&O(n,e,i[e]);return n};(()=>{let n=!1,i=[];window.oouiDialog=Object.fromEntries(["alert","confirm","prompt"].map(u=>[u,async(g,p)=>{let{sizes:r}=OO.ui.WindowManager.static,f=Object.keys(r).filter(t=>typeof r[t].width=="number").sort((t,a)=>r[t].width-r[a].width),w=f[0],s=p!=null?p:{},o={size:w};if(s.allowFullscreen!==!0){let{rect:t}=OO.ui.Element.static.getDimensions(window),a=t.right-t.left,l=f.filter(d=>r[d].width<a);l.length>0?o.size=s.size&&l.includes(s.size)?s.size:l[l.length-1]:o.size=w}else o.size=s.size&&s.size in r?s.size:w;if(u==="prompt"){let t=c({autocomplete:!1},s.textInput);o.textInput=new OO.ui.TextInputWidget(t),s.required&&(o.textInput.setIndicator(t.indicator||"required"),o.textInput.setValidation(t.validate||"non-empty"))}await new Promise(t=>{n?i.push({resolve:t}):(n=!0,t())});try{let t;for(;Number.MAX_SAFE_INTEGER>Number.MIN_SAFE_INTEGER;){t=await new Promise((a,l)=>{let d=OO.ui[u];d(g instanceof $?g:$("<p>").html(g),c(c({title:"SAPedia提醒您"},s),o)).done(a).fail(l)});try{o.textInput&&t!==null&&await o.textInput.getValidity();break}catch(a){await OO.ui.alert($("<p>").html("您没有在刚才的输入框内填写符合要求的信息，请重新填写！"),{title:"未填写符合要求的信息"});continue}}return t}finally{i.length>0?i.shift().resolve():n=!1}}]));let e=$("<span>");window.oouiDialog.sanitize=u=>e.text(u).html()})();})();

/* </nowiki> */
