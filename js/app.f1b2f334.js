(function(e){function t(t){for(var n,r,c=t[0],s=t[1],l=t[2],u=0,d=[];u<c.length;u++)r=c[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);h&&h(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,r=1;r<a.length;r++){var c=a[r];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},o={app:0},i=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-2d0c94bb":"872beebe","chunk-49dace30":"361860b8","chunk-e1b151ec":"f627e6bb","chunk-25b80ccc":"5c675b81","chunk-38a264a2":"078fe6b9"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a={"chunk-38a264a2":1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var n="css/"+({}[e]||e)+"."+{"chunk-2d0c94bb":"31d6cfe0","chunk-49dace30":"31d6cfe0","chunk-e1b151ec":"31d6cfe0","chunk-25b80ccc":"31d6cfe0","chunk-38a264a2":"e4a7695c"}[e]+".css",o=s.p+n,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],u=l.getAttribute("data-href");if(u===n||u===o)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var n=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete r[e],h.parentNode.removeChild(h),a(i)},h.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){r[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,a){n=o[e]=[t,a]}));t.push(n[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=c(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(h);var a=o[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,a[1](d)}o[e]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/bahamut-pie/",s.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var h=u;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=a("5c96"),o=a.n(r),i=(a("8aa1"),a("9ca8")),c=a("2ef0"),s=a.n(c),l=a("a584"),u=a("add2"),d=a.n(u),h=(a("c1c3"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("transition",{attrs:{name:"slide-down"}},["/"!==this.$router.currentRoute.path?a("header",[a("div",{staticClass:"nav"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/dashboard"}},[e._v("儀表板")]),a("router-link",{staticClass:"nav-link",attrs:{to:"/articles"}},[e._v("文章")]),a("router-link",{staticClass:"nav-link",attrs:{to:"/playground"}},[e._v("Playground")]),a("el-dropdown",{staticClass:"btn-more",attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("el-button",{attrs:{size:"small",icon:"el-icon-menu"}}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{icon:"el-icon-dish",command:"landing"}},[e._v("重新烤派")]),a("el-dropdown-item",{attrs:{icon:"el-icon-refresh",command:"refetch"}},[e._v("刷新內餡")]),a("el-dropdown-item",{attrs:{icon:"el-icon-info",command:"about"}},[e._v("關於巴哈姆派")])],1)],1)],1)]):e._e()]),a("el-dialog",{attrs:{title:"關於巴哈姆派",width:"650px",top:"20vh",visible:e.dialogAbout},on:{"update:visible":function(t){e.dialogAbout=t},opened:e.gaOpenDialog}},[a("el-scrollbar",{staticClass:"fz-18",attrs:{wrapStyle:"max-height:500px;"}},[a("p",[e._v(" 安安你好！我是巴哈姆派的作者 "),a("a",{staticClass:"fw-bold",attrs:{href:"https://home.gamer.com.tw/homeindex.php?owner=handred800",target:"_blank"}},[e._v("handred800")]),a("br")]),a("p",[e._v(" 本人在巴哈小屋創作遊戲心得有一段時間了，身為一個創作者想知道流量數據或讀者偏好是很正常的事！"),a("br"),e._v(" 但站方沒提供什麼有用的數據面板功能，那自己就跳下來做一個吧～"),a("br")]),a("p",[e._v(" 如果你在烤派時遇到任何問題或是有任何功能建議，歡迎至 "),a("a",{staticClass:"fw-bold",attrs:{href:"https://peing.net/zh-TW/handred800",target:"_blank"}},[e._v("提問箱")]),e._v(" 留言。"),a("br"),e._v(" 最後，如果你是工程師大大也很歡迎來此專案的 "),a("a",{staticClass:"fw-bold",attrs:{href:"https://github.com/handred800/bahamut-pie",target:"_blank"}},[e._v("gh-page")]),e._v(" 指教或發PR。 ")])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"el-button el-button--primary",attrs:{href:"https://www.buymeacoffee.com/handred800",target:"_blank"},on:{click:e.donateLink}},[e._v("🥧 贊助烤派")])])],1),a("transition",{attrs:{name:e.transitionName,mode:"out-in"}},[a("router-view",{class:{container:"/"!==this.$router.currentRoute.path}})],1),"/"===this.$router.currentRoute.path?a("el-button",{staticClass:"float-btn",attrs:{type:"link",icon:"el-icon-info"},on:{click:function(t){e.dialogAbout=!0}}}):e._e()],1)}),f=[],p=(a("b0c0"),{data:function(){return{dialogAbout:!1,transitionName:""}},methods:{handleCommand:function(e){switch(e){case"landing":this.$store.commit("clearData"),this.$router.push("/");break;case"refetch":this.$store.commit("createNotify",{title:"資料更新中..."}),this.$store.dispatch("fetchData",this.$store.state.ownerId);break;case"about":this.dialogAbout=!0;break;default:break}},gaOpenDialog:function(){this.$gtag.event("開啟",{event_category:"非功能",event_label:"關於視窗",value:5})},donateLink:function(){this.$gtag.event("點擊",{event_category:"非功能",event_label:"贊助",value:30})}},watch:{$route:function(e,t){var a=e.meta.index,n=t.meta.index;t.name&&(this.transitionName=a>n?"slide-right":"slide-left")}}}),m=p,g=a("2877"),b=Object(g["a"])(m,h,f,!1,null,null,null),v=b.exports,y=(a("d3b7"),a("8c4f"));n["default"].use(y["a"]);var w=[{path:"*",redirect:"/"},{name:"landing-page",path:"/",component:function(){return a.e("chunk-2d0c94bb").then(a.bind(null,"5912"))},meta:{index:0,needData:!1}},{name:"dashboard",path:"/dashboard",component:function(){return Promise.all([a.e("chunk-e1b151ec"),a.e("chunk-25b80ccc")]).then(a.bind(null,"4601"))},meta:{index:1,needData:!0}},{name:"articles",path:"/articles",component:function(){return a.e("chunk-49dace30").then(a.bind(null,"0482"))},meta:{index:2,needData:!0}},{name:"playground",path:"/playground",component:function(){return Promise.all([a.e("chunk-e1b151ec"),a.e("chunk-38a264a2")]).then(a.bind(null,"e76a"))},meta:{index:3,needData:!0}}],k=new y["a"]({mode:"history",base:"/bahamut-pie/",linkActiveClass:"active",routes:w}),_=k,C=(a("94b1"),a("c037"),a("15af"),a("5ce2"),a("0352"),a("007d"),a("0a6d"),a("d28f"),a("9390"),a("5450"),a("2f62"));n["default"].use(C["a"]);var D=new C["a"].Store({state:{dictionary:{count:"文章數",coin:"巴幣",gp:"GP",view:"觀看數"},ownerId:"",allData:[],isLoading:!1,dashboardConfig:{barchartFilterConfig:{dataType:"view",dataSortBy:"date",dataLength:-1,dataRange:!1,dataRangeMin:0,dataRangeMax:99999999},scatterchartFilterConfig:{dataType:"date",dataLength:-1,viewRange:!1,viewRangeMin:0,viewRangeMax:99999999,gpRange:!1,gpRangeMin:0,gpRangeMax:99999999}}},mutations:{setIsLoading:function(e,t){e.isLoading=t},setOwnerId:function(e,t){e.ownerId=t},setData:function(e,t){e.allData=t},clearData:function(e){e.allData=[],sessionStorage.clear("cacheData")},createNotify:function(e,t){var a={duration:3e3,offset:80};Object.assign(a,t),this._vm.$notify(a)}},actions:{fetchData:function(e,t){var a=e.commit;a("setIsLoading",!0),fetch("https://bahamut-home-article-cralwer.herokuapp.com?owner=".concat(t)).then((function(e){return e.json()})).then((function(e){var t=e.success,n=e.data;a("setIsLoading",!1),t?(sessionStorage.setItem("cacheData",JSON.stringify(n)),a("setData",n),a("createNotify",{title:"資料載入完成",type:"success"}),_.push("/dashboard")):a("createNotify",{title:n.message,type:"error",duration:4e3})})).catch((function(e){console.log(e),a("createNotify",{title:"發生錯誤，請稍後重試或至提問箱回報",type:"error",duration:5e3})}))}},modules:{}});n["default"].prototype._=s.a,n["default"].use(o.a),n["default"].component("v-chart",i["a"]),n["default"].config.productionTip=!1,n["default"].use(l["a"],{config:{id:"G-BNX0T2NJ85"}},_),n["default"].use(d.a,{id:"2194240"}),_.beforeEach((function(e,t,a){if(e.meta.needData)if(0===D.state.allData.length){var n=sessionStorage.cacheData?JSON.parse(sessionStorage.cacheData):[];0===n.length?a("/"):(D.commit("setData",n),a())}else a();else a()})),new n["default"]({router:_,store:D,render:function(e){return e(v)}}).$mount("#app")},"8aa1":function(e,t,a){},c1c3:function(e,t,a){}});
//# sourceMappingURL=app.f1b2f334.js.map