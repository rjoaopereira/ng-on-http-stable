!function t(e,n,r){function u(o,s){if(!n[o]){if(!e[o]){var a="function"==typeof require&&require;if(!s&&a)return a(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return u(n?n:t)},l,l.exports,t,e,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)u(r[o]);return u}({1:[function(t,e,n){"use strict";function r(t){t.interceptors.push("OnHttpStableInterceptor")}Object.defineProperty(n,"__esModule",{value:!0}),r.$inject=["$httpProvider"],n["default"]=r},{}],2:[function(t,e,n){"use strict";function r(t){function e(e){t.notifyWhenStable(function(){e.ready=!0})}return{restrict:"E",transclude:!0,link:e,template:'<ng-transclude ng-if="::ready"></ng-transclude>',scope:{}}}Object.defineProperty(n,"__esModule",{value:!0}),r.$inject=["OnHttpStableService"],n["default"]=r},{}],3:[function(t,e,n){"use strict";function r(t,e){return{request:function(t){return e.increaseOutsandingRequests(),t},requestError:function(n){return e.completeOutstandingRequest(),t.reject(n)},response:function(t){return e.completeOutstandingRequest(),t},responseError:function(n){return e.completeOutstandingRequest(),t.reject(n)}}}Object.defineProperty(n,"__esModule",{value:!0}),r.$inject=["$q","OnHttpStableService"],n["default"]=r},{}],4:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(){r(this,t),this.outstandingRequestCount=0,this.outstandingRequestCallbacks=[]}return u(t,[{key:"increaseOutsandingRequests",value:function(){return++this.outstandingRequestCount}},{key:"completeOutstandingRequest",value:function(){if(--this.outstandingRequestCount,0===this.outstandingRequestCount)for(;this.outstandingRequestCallbacks.length;)this.outstandingRequestCallbacks.pop()();return this.outstandingRequestCount}},{key:"notifyWhenStable",value:function(t){0===this.outstandingRequestCount?t():this.outstandingRequestCallbacks.push(t)}}]),t}();n["default"]=i},{}],5:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var u=t("./ng-on-http-stable-directive"),i=r(u),o=t("./ng-on-http-stable-service"),s=r(o),a=t("./ng-on-http-stable-config"),c=r(a),l=t("./ng-on-http-stable-interceptor"),f=r(l),d=angular.module("ngOnHttpStable",[]);d.directive("ngOnHttpStable",i["default"]),d.service("OnHttpStableService",s["default"]),d.factory("OnHttpStableInterceptor",f["default"]),d.config(c["default"])},{"./ng-on-http-stable-config":1,"./ng-on-http-stable-directive":2,"./ng-on-http-stable-interceptor":3,"./ng-on-http-stable-service":4}]},{},[5]);
//# sourceMappingURL=ng-on-http-stable.js.map
