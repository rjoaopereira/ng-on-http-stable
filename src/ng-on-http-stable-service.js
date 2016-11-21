class OnHttpStableService {

    constructor($rootScope, $browser, $http) {
        this.$rootScope = $rootScope;
        this.$browser = $browser;
        this.$http = $http;
    }
    /**
     * @description adds a function as callback
     * to be called when all pending requests are finished
     */
    notifyWhenStable(callback) {
        if(angular.isFunction(this.$browser.notifyWhenNoOutstandingRequests)) {
            return this.$browser.notifyWhenNoOutstandingRequests(callback);
        }

        const unwatch = this.$rootScope.$watch(() => this.$http.pendingRequests.length, (newVal, oldVal) => {
            if (newVal === 0) {
                callback();
                unwatch();
            }
        });
    }
}
OnHttpStableService.$inject = [
    '$rootScope',
    '$browser',
    '$http'
];

export default OnHttpStableService;