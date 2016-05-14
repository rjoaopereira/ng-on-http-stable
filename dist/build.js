(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function OnHttpStableConfig($httpProvider) {
    console.log("OnHttpStableConfig");
    $httpProvider.interceptors.push(['$q', 'OnHttpStableService', function OutstandingRequestsInterceptor($q, onHttpStableService) {
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
    }]);
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function OnHttpStableService() {
    var outstandingRequestCount = 0;
    var outstandingRequestCallbacks = [];

    /**
     * @description increase the number of current requests
     */
    function increaseOutsandingRequests() {
        return ++outstandingRequestCount;
    }
    /**
     * @description marks one request as completed
     * if all pending requests are completed, all callbacks are called 
     */
    function completeOutstandingRequest() {
        --outstandingRequestCount;
        if (outstandingRequestCount === 0) {
            while (outstandingRequestCallbacks.length) {
                outstandingRequestCallbacks.pop()();
            }
        }
        return outstandingRequestCount;
    }
    /**
     * @description adds a function as callback
     * to be called when all pending requests are finished
     */
    function notifyWhenNoOutstandingRequests(callback) {
        if (outstandingRequestCount === 0) {
            callback();
        } else {
            outstandingRequestCallbacks.push(callback);
        }
    }

    return {
        increaseOutsandingRequests: increaseOutsandingRequests,
        completeOutstandingRequest: completeOutstandingRequest,
        notifyWhenStable: notifyWhenNoOutstandingRequests
    };
}

OnHttpStableService.$inject = [];

exports.default = OnHttpStableService;

},{}],4:[function(require,module,exports){
'use strict';

require('./templates.js');

var _ngOnHttpStableDirective = require('./ng-on-http-stable-directive');

var _ngOnHttpStableDirective2 = _interopRequireDefault(_ngOnHttpStableDirective);

var _ngOnHttpStableService = require('./ng-on-http-stable-service');

var _ngOnHttpStableService2 = _interopRequireDefault(_ngOnHttpStableService);

var _ngOnHttpStableConfig = require('./ng-on-http-stable-config');

var _ngOnHttpStableConfig2 = _interopRequireDefault(_ngOnHttpStableConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('ngOnHttpStable', ['ngOnHttpStableTemplates']);

app.directive('ngOnHttpStable', _ngOnHttpStableDirective2.default);
app.service('OnHttpStableService', _ngOnHttpStableService2.default);

app.config(_ngOnHttpStableConfig2.default);

},{"./ng-on-http-stable-config":1,"./ng-on-http-stable-directive":2,"./ng-on-http-stable-service":3,"./templates.js":5}],5:[function(require,module,exports){
"use strict";

angular.module("ngOnHttpStableTemplates", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("ng-on-http-stable.html", "<ng-transclude ng-if=\"::ready\"></ng-transclude>");
}]);

},{}]},{},[4])


//# sourceMappingURL=build.js.map
