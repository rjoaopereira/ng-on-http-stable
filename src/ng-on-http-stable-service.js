class OnHttpStableService {

    constructor() {
        this.outstandingRequestCount     = 0;
        this.outstandingRequestCallbacks = [];
    }

    /**
     * @description increase the number of current requests
     */
    increaseOutsandingRequests() {
        return ++this.outstandingRequestCount;
    }
    /**
     * @description marks one request as completed
     * if all pending requests are completed, all callbacks are called 
     */
    completeOutstandingRequest() {
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
    notifyWhenStable(callback) {
        if (this.outstandingRequestCount === 0) {
            callback();
        } else {
            this.outstandingRequestCallbacks.push(callback);
        }
    }
}

export default OnHttpStableService;