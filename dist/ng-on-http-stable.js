!function t(e,n,r){function i(u,a){if(!n[u]){if(!e[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(o)return o(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[u]={exports:{}};e[u][0].call(f.exports,function(t){var n=e[u][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(t,e,n){"use strict";function r(t){function e(e){t.notifyWhenStable(function(){e.$applyAsync(function(){e.ready=!0})})}return{restrict:"E",transclude:!0,link:e,template:'<ng-transclude ng-if="::ready"></ng-transclude>',scope:{}}}Object.defineProperty(n,"__esModule",{value:!0}),r.$inject=["OnHttpStableService"],n["default"]=r},{}],2:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(e,n,i){r(this,t),this.$rootScope=e,this.$browser=n,this.$http=i}return i(t,[{key:"notifyWhenStable",value:function(t){var e=this;if(angular.isFunction(this.$browser.notifyWhenNoOutstandingRequests))return this.$browser.notifyWhenNoOutstandingRequests(t);var n=this.$rootScope.$watch(function(){return e.$http.pendingRequests.length},function(e,r){0===e&&(t(),n())})}}]),t}();o.$inject=["$rootScope","$browser","$http"],n["default"]=o},{}],3:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=t("./ng-on-http-stable-directive"),o=r(i),u=t("./ng-on-http-stable-service"),a=r(u),c=angular.module("ngOnHttpStable",[]);c.directive("ngOnHttpStable",o["default"]),c.service("OnHttpStableService",a["default"])},{"./ng-on-http-stable-directive":1,"./ng-on-http-stable-service":2}]},{},[3]);
//# sourceMappingURL=ng-on-http-stable.js.map
