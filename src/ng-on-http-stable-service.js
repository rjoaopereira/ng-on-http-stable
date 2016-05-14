function OnHttpStableService() {
    let outstandingRequestCount = 0;
    let outstandingRequestCallbacks = [];

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
        notifyWhenStable          : notifyWhenNoOutstandingRequests
    };
}

OnHttpStableService.$inject = [];

export default OnHttpStableService;