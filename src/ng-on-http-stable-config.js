
function OnHttpStableConfig(
    $httpProvider
) {
    $httpProvider.interceptors.push([
        '$q',
        'OnHttpStableService',
        function OutstandingRequestsInterceptor(
            $q,
            onHttpStableService
        ) {
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
        }]);
}

OnHttpStableConfig.$inject = [
    '$httpProvider'
];

export default OnHttpStableConfig