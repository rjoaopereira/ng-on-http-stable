describe('OnHttpStableInterceptor', () => {

    let onHttpStable;
    let victim;
    let $rootScope;
    let mock = {};

    beforeEach(angular.mock.module('ngOnHttpStable'));

    beforeEach(() => {
        
        inject(function (_$rootScope_, _OnHttpStableInterceptor_, _OnHttpStableService_) {
            $rootScope   = _$rootScope_;
            victim       = _OnHttpStableInterceptor_;
            onHttpStable = _OnHttpStableService_;

            spyOn(onHttpStable, 'increaseOutsandingRequests');
            spyOn(onHttpStable, 'completeOutstandingRequest');
        });

    });
    describe('request', () => {
        it('should increase the oustanding requests', () => {
            let result = victim.request(mock);
            expect(onHttpStable.increaseOutsandingRequests).toHaveBeenCalled();
            expect(result).toBe(mock);
        });
    });
    describe('requestError', () => {
        it('should decrease the oustanding requests', () => {
            let spy    = jasmine.createSpy('spy');
            let result = victim.requestError(mock);

            result.catch(spy);
            $rootScope.$digest();
            expect(onHttpStable.completeOutstandingRequest).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(mock);
        });
    });
    describe('response', () => {
        it('should decrease the oustanding requests', () => {
            let result = victim.response(mock);
            expect(onHttpStable.completeOutstandingRequest).toHaveBeenCalled();
            expect(result).toBe(mock);
        });
    });
    describe('responseError', () => {
        it('should decrease the oustanding requests', () => {
            let spy    = jasmine.createSpy('spy');
            let result = victim.responseError(mock);

            result.catch(spy);
            $rootScope.$digest();
            expect(onHttpStable.completeOutstandingRequest).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(mock);
        });
    });
});