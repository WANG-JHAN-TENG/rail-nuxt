(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{503:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(505);function o(){var t=(new Date).toGMTString(),e=new n.a("SHA-1","TEXT");return e.setHMACKey("oPs2MCCXebrQ1LN0n0g6M8kY81Q","TEXT"),e.update("x-date: "+t),{Authorization:'hmac username="bd83b99ad326452a97b670ff9c5aebba", algorithm="hmac-sha1", headers="x-date", signature="'+e.getHMAC("B64")+'"',"X-Date":t}}},506:function(t,e,r){var content=r(527);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(62).default)("769d7f6c",content,!0,{sourceMap:!1})},510:function(t,e,r){var map={"./af":364,"./af.js":364,"./ar":365,"./ar-dz":366,"./ar-dz.js":366,"./ar-kw":367,"./ar-kw.js":367,"./ar-ly":368,"./ar-ly.js":368,"./ar-ma":369,"./ar-ma.js":369,"./ar-sa":370,"./ar-sa.js":370,"./ar-tn":371,"./ar-tn.js":371,"./ar.js":365,"./az":372,"./az.js":372,"./be":373,"./be.js":373,"./bg":374,"./bg.js":374,"./bm":375,"./bm.js":375,"./bn":376,"./bn-bd":377,"./bn-bd.js":377,"./bn.js":376,"./bo":378,"./bo.js":378,"./br":379,"./br.js":379,"./bs":380,"./bs.js":380,"./ca":381,"./ca.js":381,"./cs":382,"./cs.js":382,"./cv":383,"./cv.js":383,"./cy":384,"./cy.js":384,"./da":385,"./da.js":385,"./de":386,"./de-at":387,"./de-at.js":387,"./de-ch":388,"./de-ch.js":388,"./de.js":386,"./dv":389,"./dv.js":389,"./el":390,"./el.js":390,"./en-au":391,"./en-au.js":391,"./en-ca":392,"./en-ca.js":392,"./en-gb":393,"./en-gb.js":393,"./en-ie":394,"./en-ie.js":394,"./en-il":395,"./en-il.js":395,"./en-in":396,"./en-in.js":396,"./en-nz":397,"./en-nz.js":397,"./en-sg":398,"./en-sg.js":398,"./eo":399,"./eo.js":399,"./es":400,"./es-do":401,"./es-do.js":401,"./es-mx":402,"./es-mx.js":402,"./es-us":403,"./es-us.js":403,"./es.js":400,"./et":404,"./et.js":404,"./eu":405,"./eu.js":405,"./fa":406,"./fa.js":406,"./fi":407,"./fi.js":407,"./fil":408,"./fil.js":408,"./fo":409,"./fo.js":409,"./fr":410,"./fr-ca":411,"./fr-ca.js":411,"./fr-ch":412,"./fr-ch.js":412,"./fr.js":410,"./fy":413,"./fy.js":413,"./ga":414,"./ga.js":414,"./gd":415,"./gd.js":415,"./gl":416,"./gl.js":416,"./gom-deva":417,"./gom-deva.js":417,"./gom-latn":418,"./gom-latn.js":418,"./gu":419,"./gu.js":419,"./he":420,"./he.js":420,"./hi":421,"./hi.js":421,"./hr":422,"./hr.js":422,"./hu":423,"./hu.js":423,"./hy-am":424,"./hy-am.js":424,"./id":425,"./id.js":425,"./is":426,"./is.js":426,"./it":427,"./it-ch":428,"./it-ch.js":428,"./it.js":427,"./ja":429,"./ja.js":429,"./jv":430,"./jv.js":430,"./ka":431,"./ka.js":431,"./kk":432,"./kk.js":432,"./km":433,"./km.js":433,"./kn":434,"./kn.js":434,"./ko":435,"./ko.js":435,"./ku":436,"./ku.js":436,"./ky":437,"./ky.js":437,"./lb":438,"./lb.js":438,"./lo":439,"./lo.js":439,"./lt":440,"./lt.js":440,"./lv":441,"./lv.js":441,"./me":442,"./me.js":442,"./mi":443,"./mi.js":443,"./mk":444,"./mk.js":444,"./ml":445,"./ml.js":445,"./mn":446,"./mn.js":446,"./mr":447,"./mr.js":447,"./ms":448,"./ms-my":449,"./ms-my.js":449,"./ms.js":448,"./mt":450,"./mt.js":450,"./my":451,"./my.js":451,"./nb":452,"./nb.js":452,"./ne":453,"./ne.js":453,"./nl":454,"./nl-be":455,"./nl-be.js":455,"./nl.js":454,"./nn":456,"./nn.js":456,"./oc-lnc":457,"./oc-lnc.js":457,"./pa-in":458,"./pa-in.js":458,"./pl":459,"./pl.js":459,"./pt":460,"./pt-br":461,"./pt-br.js":461,"./pt.js":460,"./ro":462,"./ro.js":462,"./ru":463,"./ru.js":463,"./sd":464,"./sd.js":464,"./se":465,"./se.js":465,"./si":466,"./si.js":466,"./sk":467,"./sk.js":467,"./sl":468,"./sl.js":468,"./sq":469,"./sq.js":469,"./sr":470,"./sr-cyrl":471,"./sr-cyrl.js":471,"./sr.js":470,"./ss":472,"./ss.js":472,"./sv":473,"./sv.js":473,"./sw":474,"./sw.js":474,"./ta":475,"./ta.js":475,"./te":476,"./te.js":476,"./tet":477,"./tet.js":477,"./tg":478,"./tg.js":478,"./th":479,"./th.js":479,"./tk":480,"./tk.js":480,"./tl-ph":481,"./tl-ph.js":481,"./tlh":482,"./tlh.js":482,"./tr":483,"./tr.js":483,"./tzl":484,"./tzl.js":484,"./tzm":485,"./tzm-latn":486,"./tzm-latn.js":486,"./tzm.js":485,"./ug-cn":487,"./ug-cn.js":487,"./uk":488,"./uk.js":488,"./ur":489,"./ur.js":489,"./uz":490,"./uz-latn":491,"./uz-latn.js":491,"./uz.js":490,"./vi":492,"./vi.js":492,"./x-pseudo":493,"./x-pseudo.js":493,"./yo":494,"./yo.js":494,"./zh-cn":495,"./zh-cn.js":495,"./zh-hk":496,"./zh-hk.js":496,"./zh-mo":497,"./zh-mo.js":497,"./zh-tw":498,"./zh-tw.js":498};function n(t){var e=o(t);return r(e)}function o(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=o,t.exports=n,n.id=510},526:function(t,e,r){"use strict";r(506)},527:function(t,e,r){var n=r(61)(!1);n.push([t.i,'.ticket{text-align:center}.v-application--wrap{min-height:0}.ticketTitle{position:relative;margin:20px auto;padding:5px;font-size:2rem;font-weight:400;letter-spacing:2px}.ticketTitle :after{content:"";display:block;position:absolute;width:90px;height:3px;left:50%;bottom:0;background-color:#ca4f0f;margin-left:-45px}.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,.v-data-table>.v-data-table__wrapper>table>thead>tr>th{text-align:center!important;font-size:1.25rem}.v-data-table>.v-data-table__wrapper>table>tbody>tr>td{font-size:16px}@media (max-width:665px){.ticketTitle h3{font-size:24px}.v-data-table>.v-data-table__wrapper>table>tbody>tr>td,.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,.v-data-table>.v-data-table__wrapper>table>thead>tr>th{font-size:14px;padding:5px}.ticketTable input{width:40px}}',""]),t.exports=n},532:function(t,e,r){"use strict";r.r(e);var n={props:["parentInfo"],data:function(){return{ticketInfo:this.parentInfo}},updated:function(){},computed:{},methods:{}},o=(r(526),r(87)),c=r(178),l=r.n(c),d=r(360),h=r(361),f=r(549),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-container",[r("div",{staticClass:"ticket"},[r("div",{staticClass:"ticketTitle"},[r("h3",[t._v(t._s(t.$t("trainInfo.priceTable")))])]),t._v(" "),r("div",{staticClass:"ticketTable"},[r("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th"),t._v(" "),r("th",[t._v(t._s(t.$t("trainInfo.adult")))]),t._v(" "),r("th",[t._v(t._s(t.$t("trainInfo.kidLoveOlder")))]),t._v(" "),r("th",[t._v(t._s(t.$t("trainInfo.group")))])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v(t._s(t.$t("trainInfo.standard")))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.standardAdult))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.standardKid))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.standardGroup))])]),t._v(" "),r("tr",[r("td",[t._v(t._s(t.$t("trainInfo.business")))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.bussinessAdult))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.bussinessKid))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.bussinessGroup))])]),t._v(" "),r("tr",[r("td",[t._v(t._s(t.$t("trainInfo.free")))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.freeAdult))]),t._v(" "),r("td",[t._v(t._s(t.ticketInfo.freeKid))]),t._v(" "),r("td",[t._v("-")])])])]},proxy:!0}])})],1)])])],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VApp:d.a,VContainer:h.a,VSimpleTable:f.a})},553:function(t,e,r){var content=r(611);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(62).default)("251ac160",content,!0,{sourceMap:!1})},610:function(t,e,r){"use strict";r(553)},611:function(t,e,r){var n=r(61)(!1);n.push([t.i,'.alert-area[data-v-0819ab48]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);justify-items:center;z-index:10}.alert-area .v-btn:not(.v-btn--round).v-size--default[data-v-0819ab48]{min-width:20px}.prompt-area[data-v-0819ab48]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);justify-items:center;z-index:9}.prompt-input[data-v-0819ab48]{z-index:10;max-width:250px}.main-content[data-v-0819ab48]{position:relative;margin:30px auto}.station[data-v-0819ab48]{max-width:200px}.title[data-v-0819ab48] :after{content:"";display:block;position:absolute;width:90px;height:3px;left:50%;bottom:0;background-color:#ca4f0f;margin-left:-45px}.selection[data-v-0819ab48]{background:#ebe9e9;max-width:1200px}.search[data-v-0819ab48]{font-size:1rem}.time-picker[data-v-0819ab48]{max-width:200px}.footer[data-v-0819ab48]{max-width:1200px}@media (max-width:370px){.selection[data-v-0819ab48]{font-size:14px}.selecton input[data-v-0819ab48]{width:50px}.btn[data-v-0819ab48]{font-size:14px}}',""]),t.exports=n},636:function(t,e,r){"use strict";r.r(e);var n=r(11),o=(r(70),r(21),r(16),r(54),r(20),r(86),r(181),r(5),r(34),r(35),r(99)),c=r.n(o),l=r(363),d=r.n(l),h=r(503),f={data:function(){return{alert:!1,alertMessage:"",prompt:!1,promptMes:"",promptInput:"",promptValue:!1,stops:[{name:this.$t("data.station0"),value:""},{name:this.$t("data.station0990"),value:"0990"},{name:this.$t("data.station1000"),value:"1000"},{name:this.$t("data.station1010"),value:"1010"},{name:this.$t("data.station1020"),value:"1020"},{name:this.$t("data.station1030"),value:"1030"},{name:this.$t("data.station1035"),value:"1035"},{name:this.$t("data.station1040"),value:"1040"},{name:this.$t("data.station1043"),value:"1043"},{name:this.$t("data.station1047"),value:"1047"},{name:this.$t("data.station1050"),value:"1050"},{name:this.$t("data.station1060"),value:"1060"},{name:this.$t("data.station1070"),value:"1070"}],ways:[{name:this.$t("data.oneWay"),value:!1},{name:this.$t("data.roundTrip"),value:!0}],searchInfo:{departure:{name:"",value:""},arrival:{name:"",value:""},oneWayOrNot:!1,departDate:"",departTime:"",backDepartDate:"",backDepartTime:""},headers:[{text:this.$t("trainInfo.trainNo"),align:"center",sortable:!1,value:"trainNo"},{text:this.$t("trainInfo.departTime"),align:"center",value:"departTime"},{text:this.$t("trainInfo.arriveTime"),align:"center",value:"arriveTime"},{text:this.$t("trainInfo.movingTime"),align:"center",value:"movingTime"}],selectedTrain:[{trainNo:"",departStation:"",departTime:"",arriveStation:"",arriveTime:"",date:"",movingTime:""}],selectedBackTrain:[{trainNo:"",departStation:"",departTime:"",arriveStation:"",arriveTime:"",date:"",movingTime:""}],ticketInfo:{freeKid:0,standardKid:0,standardGroup:0,freeAdult:0,standardAdult:0,bussinessKid:0,bussinessGroup:0,bussinessAdult:0},trainInfo:[],backup1:[],backTrainInfo:[],backup2:[],isBtnDisabled:!0}},beforeMount:function(){this.searchInfo.departure.name=this.$store.getters.departureName,this.searchInfo.departure.value=this.$store.getters.departureValue,this.searchInfo.arrival.name=this.$store.getters.arrivalName,this.searchInfo.arrival.value=this.$store.getters.arrivalValue,this.searchInfo.oneWayOrNot=this.$store.getters.oneWayOrNot,this.searchInfo.departDate=this.$store.getters.departDate,this.searchInfo.departTime=this.$store.getters.departTime,this.searchInfo.backDepartDate=this.$store.getters.backDepartDate,this.searchInfo.backDepartTime=this.$store.getters.backDepartTime,this.ticketInfo=this.$store.getters.ticketInfo,this.trainInfo=this.$store.getters.trainInfo,this.backTrainInfo=this.$store.getters.backTrainInfo},watch:{selectedTrain:function(){this.checkSelect()},selectedBackTrain:function(){this.checkSelect()},backup1:{handler:function(){this.trainInfo=this.backup1},deep:!0},backup2:{handler:function(){this.backTrainInfo=this.backup2},deep:!0}},methods:{customAlert:function(t){this.alert=!0,this.alertMessage=t},closeAlert:function(){this.alert=!1},customPrompt:function(t){this.prompt=!0,this.promptMes=t},closePrompt:function(){this.promptInput="",this.prompt=!1},checkPrompt:function(){"0000"===this.promptInput?(this.promptValue=!0,this.promptInput="",window.location.assign("/rail-nuxt/manage")):""===this.promptInput?(this.prompt=!1,this.promptInput=""):(this.customAlert(this.$t("data.passwordErr")),this.prompt=!1,this.promptInput="")},checkStation:function(){var t=this.searchInfo.departure.value,e=this.searchInfo.arrival.value;if(""!==t&&""!==e&&t!==e){this.backup1=[],this.backup2=[],this.trainInfo=[],this.backTrainInfo=[];var r=this.searchInfo.departDate,n=this.searchInfo.departTime,o=this.searchInfo.backDepartDate,c=this.searchInfo.backDepartTime;if(this.searchInfo.oneWayOrNot){var l=this.checkTime(r,n),d=this.checkTime(o,c);l&&d&&(this.searching(),this.$store.commit("insertData",this.searchInfo))}else{this.checkTime(r,n)&&(this.oneWaySearching(),this.$store.commit("insertData",this.searchInfo))}}else this.customAlert(this.$t("index.correctStation"))},checkTime:function(t,e){var r=t.split("-"),time=e.split(":"),n=new Date(r[0],r[1]-1,r[2],time[0],time[1],0),o=!1;return d()(t).isBefore(d()().format("YYYY-MM-DD"))||d()(t).isSame(d()().format("YYYY-MM-DD"))&&d()(n).isBefore(d()().subtract(60,"seconds").format())||d()(t).isAfter(d()().add(25,"days").format("YYYY-MM-DD"))?this.customAlert(this.$t("index.correctTime")):o=!0,o},sendMes:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.searchInfo.departure.value,n=t.searchInfo.arrival.value,o=t.searchInfo.departDate,l="https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/".concat(r,"/to/").concat(n,"/").concat(o,"?$format=JSON"),e.next=6,c.a.get(l,{headers:Object(h.a)()}).then((function(e){var r=t.searchInfo.departTime,n=t.infoFilter(t.rebuildTrainInfo(e.data),r);t.backup1=t.timeFilter(n)}));case 6:case"end":return e.stop()}}),e)})))()},rebuildTrainInfo:function(t){for(var e=t,r={},n=[],i=0;i<e.length;i++)r={trainNo:e[i].DailyTrainInfo.TrainNo,departStation:this.searchInfo.departure.name,departTime:e[i].OriginStopTime.DepartureTime,arriveStation:this.searchInfo.arrival.name,arriveTime:e[i].DestinationStopTime.ArrivalTime,date:e[i].TrainDate},n.push(r);return n},infoFilter:function(t,e){for(var r=e.split(":"),n=t,o=[],c={},l=[],i=0;i<n.length;i++)l=(c=n[i]).departTime.split(":"),Number(l[0])>=Number(r[0])&&o.push(c);return o.length>5&&(o.length=5),o},timeFilter:function(t){for(var e=t,r=[],n=[],o=[],c=null,l=null,hr=0,h=0,f={},i=0;i<e.length;i++)r=e[i].date.split("-"),n=e[i].departTime.split(":"),o=e[i].arriveTime.split(":"),c=new Date(r[0],r[1],r[2],n[0],n[1],0),l=new Date(r[0],r[1],r[2],o[0],o[1],0),hr=d.a.duration(d()(l).diff(c)).hours(),h=d.a.duration(d()(l).diff(c)).minutes(),f="".concat(hr,":").concat(h),e[i].movingTime=f;return e},getTicketInfo:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.searchInfo.departure.value,n=t.searchInfo.arrival.value,o="https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/".concat(r,"/to/").concat(n,"?$top=30&$format=JSON"),e.next=5,c.a.get(o,{headers:Object(h.a)()}).then((function(e){t.dealTicketInfo(e.data[0])}));case 5:case"end":return e.stop()}}),e)})))()},dealTicketInfo:function(t){for(var e=[],r={},i=0;i<t.Fares.length;i++)r=t.Fares[i].Price,e.push(r);e.sort((function(a,b){return a-b})),this.ticketInfo={freeKid:e[0],standardKid:e[1],standardGroup:e[2],freeAdult:e[3],standardAdult:e[4],bussinessKid:e[5],bussinessGroup:e[6],bussinessAdult:e[7]}},sendBackMes:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.searchInfo.arrival.value,n=t.searchInfo.departure.value,o=t.searchInfo.backDepartDate,l="https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/".concat(r,"/to/").concat(n,"/").concat(o,"?$format=JSON"),e.next=6,c.a.get(l,{headers:Object(h.a)()}).then((function(e){var r=t.searchInfo.backDepartTime,data=t.infoFilter(t.rebuildTrainInfo(e.data),r);t.backup2=t.timeFilter(data)}));case 6:case"end":return e.stop()}}),e)})))()},oneWaySearching:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.backTrainInfo=[],r=t.sendMes(),n=t.getTicketInfo(),e.next=6,Promise.all([r,n]);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("catch",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},searching:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t.sendMes(),n=t.getTicketInfo(),o=t.sendBackMes(),e.next=6,Promise.all([r,o,n]);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("catch",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},goManage:function(){this.customPrompt(this.$t("data.password"),"")},chooseTrain:function(){this.$store.commit("chooseTrain",this.selectedTrain[0]),this.$store.commit("insertTrainInfo",this.trainInfo),this.$store.commit("insertTicketInfo",this.ticketInfo)},chooseBackTrain:function(){this.$store.commit("chooseBackTrain",this.selectedBackTrain[0]),this.$store.commit("insertBackTrainInfo",this.backTrainInfo)},checkSelect:function(){0===this.backTrainInfo.length?0===this.selectedTrain.length?this.isBtnDisabled=!0:(this.isBtnDisabled=!1,this.chooseTrain()):0===this.selectedTrain.length||0===this.selectedBackTrain.length?this.isBtnDisabled=!0:(this.isBtnDisabled=!1,this.chooseTrain(),this.chooseBackTrain())}}},m=(r(610),r(87)),v=r(178),k=r.n(v),j=r(640),I=r(360),x=r(355),_=r(628),T=r(361),w=r(632),y=r(362),$=r(557),D=r(624),component=Object(m.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-container",{staticClass:"alert-area"},[t.alert?r("v-alert",{staticClass:"mx-auto",attrs:{color:"orange lighten-1","max-width":"400",elevation:"4",type:"info",transition:"scale-transition"}},[r("v-row",{staticClass:"text-center",attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"10"}},[t._v("\n                      "+t._s(t.alertMessage)+"\n                    ")]),t._v(" "),r("v-col",[r("v-btn",{attrs:{color:"amber darken-4"},on:{click:t.closeAlert}},[t._v("X")])],1)],1)],1):t._e()],1),t._v(" "),r("v-container",{staticClass:"prompt-area"},[t.prompt?r("v-alert",{staticClass:"mx-auto",attrs:{color:"white","max-width":"400",elevation:"4",transition:"scale-transition"}},[r("v-row",{staticClass:"text-center",attrs:{justify:"center"}},[r("v-col",[r("v-text-field",{staticClass:"prompt-input mx-auto",attrs:{label:t.promptMes,height:"30",outlined:"",autofocus:""},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.checkPrompt.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.closePrompt.apply(null,arguments)}]},model:{value:t.promptInput,callback:function(e){t.promptInput=e},expression:"promptInput"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{attrs:{color:"black",dark:""},on:{click:t.checkPrompt}},[t._v("OK")]),t._v(" "),r("v-btn",{attrs:{color:"grey lighten-3",light:""},on:{click:t.closePrompt}},[t._v("X")])],1)],1)],1):t._e()],1),t._v(" "),r("v-container",{staticClass:"main-content"},[r("v-row",{staticClass:"title",attrs:{justify:"center"}},[r("h2",{staticClass:"text-h5 text-sm-h4"},[t._v(t._s(t.$t("index.title")))])])],1),t._v(" "),r("v-container",{staticClass:"selection"},[r("v-row",{staticClass:"trip",attrs:{justify:"space-around"}},[r("v-col",{attrs:{cols:"6",sm:"3"}},[r("v-select",{staticClass:"station mx-auto",attrs:{label:t.$t("index.departure"),items:t.stops,"item-text":"name","item-value":"value","return-object":"","background-color":"white"},model:{value:t.searchInfo.departure,callback:function(e){t.$set(t.searchInfo,"departure",e)},expression:"searchInfo.departure"}})],1),t._v(" "),r("v-col",{attrs:{cols:"6",sm:"3"}},[r("v-select",{staticClass:"station mx-auto",attrs:{label:t.$t("index.arrival"),items:t.stops,"item-text":"name","item-value":"value","return-object":"","background-color":"white"},model:{value:t.searchInfo.arrival,callback:function(e){t.$set(t.searchInfo,"arrival",e)},expression:"searchInfo.arrival"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"3"}},[r("v-select",{staticClass:"station mx-auto",attrs:{items:t.ways,"item-text":"name","item-value":"value","background-color":"white"},model:{value:t.searchInfo.oneWayOrNot,callback:function(e){t.$set(t.searchInfo,"oneWayOrNot",e)},expression:"searchInfo.oneWayOrNot"}})],1)],1),t._v(" "),r("v-row",{staticClass:"dateTime",attrs:{justify:"space-around"}},[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-text-field",{staticClass:"time-picker mx-auto",attrs:{label:t.$t("index.goDate"),height:"32",type:"date","background-color":"white"},model:{value:t.searchInfo.departDate,callback:function(e){t.$set(t.searchInfo,"departDate",e)},expression:"searchInfo.departDate"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-text-field",{staticClass:"time-picker mx-auto",attrs:{label:t.$t("index.goTime"),height:"32",type:"time","background-color":"white"},model:{value:t.searchInfo.departTime,callback:function(e){t.$set(t.searchInfo,"departTime",e)},expression:"searchInfo.departTime"}})],1)],1),t._v(" "),!0===t.searchInfo.oneWayOrNot?r("v-row",{staticClass:"backDateTime",attrs:{justify:"space-around"}},[r("v-col",[r("v-text-field",{staticClass:"time-picker mx-auto",attrs:{label:t.$t("index.backDate"),height:"32",type:"date","background-color":"white"},model:{value:t.searchInfo.backDepartDate,callback:function(e){t.$set(t.searchInfo,"backDepartDate",e)},expression:"searchInfo.backDepartDate"}})],1),t._v(" "),r("v-col",[r("v-text-field",{staticClass:"time-picker mx-auto",attrs:{label:t.$t("index.backTime"),height:"32",type:"time","background-color":"white"},model:{value:t.searchInfo.backDepartTime,callback:function(e){t.$set(t.searchInfo,"backDepartTime",e)},expression:"searchInfo.backDepartTime"}})],1)],1):t._e(),t._v(" "),r("v-row",{attrs:{justify:"center"}},[r("v-btn",{attrs:{color:"warning"},on:{click:t.checkStation}},[t._v(t._s(t.$t("index.search")))])],1)],1),t._v(" "),t.trainInfo.length>0&&0!==Object.keys(t.ticketInfo).length?r("v-container",{staticClass:"trainInfo"},[t.trainInfo.length>0?r("div",{staticClass:"trainItem mt-5"},[r("div",[r("h2",[t._v(t._s(t.$t("trainInfo.title")))])]),t._v(" "),r("h4",[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.searchInfo.departure.name)+"\n\t\t\t\t\t\t\t\t\t~\n\t\t\t\t\t\t\t\t\t"+t._s(t.searchInfo.arrival.name)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),r("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.trainInfo,"items-per-page":5,"item-key":"trainNo","single-select":"","show-select":"","disable-sort":"","hide-default-footer":""},model:{value:t.selectedTrain,callback:function(e){t.selectedTrain=e},expression:"selectedTrain"}}),t._v(" "),r("hr")],1):t._e(),t._v(" "),t.backTrainInfo.length>0?r("div",{staticClass:"trainItem mt-5"},[r("h4",[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.searchInfo.arrival.name)+"\n\t\t\t\t\t\t\t\t\t~\n\t\t\t\t\t\t\t\t\t"+t._s(t.searchInfo.departure.name)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),r("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.backTrainInfo,"items-per-page":5,"item-key":"trainNo","single-select":"","show-select":"","disable-sort":"","hide-default-footer":""},model:{value:t.selectedBackTrain,callback:function(e){t.selectedBackTrain=e},expression:"selectedBackTrain"}}),t._v(" "),r("hr")],1):t._e(),t._v(" "),r("div",{staticClass:"ticketPrice my-3"},[r("TicketPrice",{attrs:{parentInfo:t.ticketInfo}})],1),t._v(" "),r("v-row",{staticClass:"booking ma-2",attrs:{justify:"center"}},[r("v-btn",{attrs:{disabled:t.isBtnDisabled,nuxt:"",to:t.localePath("booking"),color:"warning"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.$t("trainInfo.book"))+"\n\t\t\t\t\t\t\t\t")])],1)],1):t._e(),t._v(" "),r("v-container",{staticClass:"footer my-3"},[r("v-row",{attrs:{justify:"space-around"}},[r("v-btn",{attrs:{nuxt:"",to:t.localePath("bookingInfo"),color:"primary","max-width":"100"}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.$t("index.bookSearch"))+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),r("v-btn",{attrs:{color:"grey darken-4",dark:""},on:{click:t.goManage}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.$t("index.manage"))+"\n\t\t\t\t\t\t\t\t")])],1)],1)],1)}),[],!1,null,"0819ab48",null);e.default=component.exports;k()(component,{TicketPrice:r(532).default}),k()(component,{VAlert:j.a,VApp:I.a,VBtn:x.a,VCol:_.a,VContainer:T.a,VDataTable:w.a,VRow:y.a,VSelect:$.a,VTextField:D.a})}}]);