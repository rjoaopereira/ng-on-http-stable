function OnHttpStableInterceptor($q, onHttpStableService) {

    return {
        request: function (config) {
            onHttpStableService.increaseOutsandingRequests();
            return config;
        },
        requestError: function (rejection) {
            onHttpStableService.completeOutstandingRequest();
            return $q.reject(rejection);
        },
        response: function (response) {
            onHttpStableService.completeOutstandingRequest();
            return response;
        },
        responseError: function (rejection) {
            onHttpStableService.completeOutstandingRequest();
            return $q.reject(rejection);
        }
    };
}

OnHttpStableInterceptor.$inject = [
    '$q',
    'OnHttpStableService'
];

export default OnHttpStableInterceptor;