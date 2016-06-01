(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function OnHttpStableConfig($httpProvider) {
    $httpProvider.interceptors.push('OnHttpStableInterceptor');
}

OnHttpStableConfig.$inject = ['$httpProvider'];

exports.default = OnHttpStableConfig;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function ngOnHttpStableDirective(onHttpStableService) {

    function link($scope) {
        onHttpStableService.notifyWhenStable(function () {
            $scope.ready = true;
        });
    }

    return {
        restrict: 'E',
        transclude: true,
        link: link,
        templateUrl: 'ng-on-http-stable.html',
        scope: {}
    };
}

ngOnHttpStableDirective.$inject = ['OnHttpStableService'];

exports.default = ngOnHttpStableDirective;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function OnHttpStableInterceptor($q, onHttpStableService) {

    return {
        request: function request(config) {
            onHttpStableService.increaseOutsandingRequests();
            return config;
        },
        requestError: function requestError(rejection) {
            onHttpStableService.completeOutstandingRequest();
            return $q.reject(rejection);
        },
        response: function response(_response) {
            onHttpStableService.completeOutstandingRequest();
            return _response;
        },
        responseError: function responseError(rejection) {
            onHttpStableService.completeOutstandingRequest();
            return $q.reject(rejection);
        }
    };
}

OnHttpStableInterceptor.$inject = ['$q', 'OnHttpStableService'];

exports.default = OnHttpStableInterceptor;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OnHttpStableService = function () {
    function OnHttpStableService() {
        _classCallCheck(this, OnHttpStableService);

        this.outstandingRequestCount = 0;
        this.outstandingRequestCallbacks = [];
    }

    /**
     * @description increase the number of current requests
     */


    _createClass(OnHttpStableService, [{
        key: "increaseOutsandingRequests",
        value: function increaseOutsandingRequests() {
            return ++this.outstandingRequestCount;
        }
        /**
         * @description marks one request as completed
         * if all pending requests are completed, all callbacks are called 
         */

    }, {
        key: "completeOutstandingRequest",
        value: function completeOutstandingRequest() {
            --this.outstandingRequestCount;
            if (this.outstandingRequestCount === 0) {
                while (this.outstandingRequestCallbacks.length) {
                    this.outstandingRequestCallbacks.pop()();
                }
            }
            return this.outstandingRequestCount;
        }
        /**
         * @description adds a function as callback
         * to be called when all pending requests are finished
         */

    }, {
        key: "notifyWhenStable",
        value: function notifyWhenStable(callback) {
            if (this.outstandingRequestCount === 0) {
                callback();
            } else {
                this.outstandingRequestCallbacks.push(callback);
            }
        }
    }]);

    return OnHttpStableService;
}();

exports.default = OnHttpStableService;

},{}],5:[function(require,module,exports){
'use strict';

require('./templates.js');

var _ngOnHttpStableDirective = require('./ng-on-http-stable-directive');

var _ngOnHttpStableDirective2 = _interopRequireDefault(_ngOnHttpStableDirective);

var _ngOnHttpStableService = require('./ng-on-http-stable-service');

var _ngOnHttpStableService2 = _interopRequireDefault(_ngOnHttpStableService);

var _ngOnHttpStableConfig = require('./ng-on-http-stable-config');

var _ngOnHttpStableConfig2 = _interopRequireDefault(_ngOnHttpStableConfig);

var _ngOnHttpStableInterceptor = require('./ng-on-http-stable-interceptor');

var _ngOnHttpStableInterceptor2 = _interopRequireDefault(_ngOnHttpStableInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('ngOnHttpStable', ['ngOnHttpStableTemplates']);

app.directive('ngOnHttpStable', _ngOnHttpStableDirective2.default);
app.service('OnHttpStableService', _ngOnHttpStableService2.default);
app.factory('OnHttpStableInterceptor', _ngOnHttpStableInterceptor2.default);

app.config(_ngOnHttpStableConfig2.default);

},{"./ng-on-http-stable-config":1,"./ng-on-http-stable-directive":2,"./ng-on-http-stable-interceptor":3,"./ng-on-http-stable-service":4,"./templates.js":6}],6:[function(require,module,exports){
"use strict";

angular.module("ngOnHttpStableTemplates", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("ng-on-http-stable.html", "<ng-transclude ng-if=\"::ready\"></ng-transclude>");
}]);

},{}]},{},[5])


//# sourceMappingURL=build.js.map
