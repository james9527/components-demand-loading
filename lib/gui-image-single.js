!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mCmsComponents=e():t.mCmsComponents=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=5)}([function(t,e,n){"use strict";function o(t,e,n,o,i,r,s,a){var d,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),r&&(u._scopeId="data-v-"+r),s?(d=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=d):i&&(d=a?function(){i.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:i),d)if(u.functional){u._injectStyles=d;var f=u.render;u.render=function(t,e){return d.call(e),f(t,e)}}else{var l=u.beforeCreate;u.beforeCreate=l?[].concat(l,d):[d]}return{exports:t,options:u}}n.d(e,"a",(function(){return o}))},function(t,e,n){},,,,function(t,e,n){"use strict";n.r(e);var o={name:"GuiImageSingle",data:()=>({}),props:{dataInfo:{type:Object,default:()=>{}}},created(){},computed:{templetCode(){return this.dataInfo&&this.dataInfo.templetCode||"floorPhotoTemplet"},isPadding(){return this.dataInfo&&this.dataInfo[this.templetCode]&&1==this.dataInfo[this.templetCode].templatePadding?"template-padding":""},imgList(){return this.dataInfo&&this.dataInfo[this.templetCode]&&this.dataInfo[this.templetCode].imgList||[]},templetId(){return this.dataInfo&&this.dataInfo.templetId||"GuiImageSingle"}}},i=(n(9),n(0)),r=Object(i.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"gui-image-single-wrapper"},[e("a",{class:["singlePic"],attrs:{href:this.imgList.length&&this.imgList[0].scheme,"data-code":this.templetId+"-1"}},[e("img",{staticClass:"img",attrs:{src:this.imgList.length&&this.imgList[0].imageUrl,onerror:"this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='"}})])])}),[],!1,null,"420ab756",null).exports;r.install=function(t){t.component(r.name,r)},e.default=r},,,,function(t,e,n){"use strict";n(1)}])}));
//# sourceMappingURL=gui-image-single.js.map