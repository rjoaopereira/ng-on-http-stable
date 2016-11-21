describe('OnHttpStableService', () => {

    let victim;
    let $http;
    let $rootScope;
    let $browser;
    let notificationSpy;
    let browserSpy;
    let rootScopeSpy;

    beforeEach(angular.mock.module('ngOnHttpStable', [
        '$provide',
        function ($provide) {
            $browser = {
                notifyWhenNoOutstandingRequests : angular.noop,
                $$applicationDestroyed: angular.noop,
                $$checkUrlChange: angular.noop
            }
            $provide.value('$browser', $browser)
        }]));

    beforeEach(() => {
        inject([
            '$injector',
            function ($injector) {
                $http = $injector.get('$http')
                $rootScope = $injector.get('$rootScope')
                victim = $injector.get('OnHttpStableService');
            }]);
        notificationSpy = jasmine.createSpy('notificationSpy');
    });

    describe('when $browser.notifyWhenNoOutstandingRequests is available', () => {
        beforeEach(() => {
            spyOn($browser, 'notifyWhenNoOutstandingRequests');
            victim.notifyWhenStable(notificationSpy);
        });

        it('should notify immediately', () => {
            expect($browser.notifyWhenNoOutstandingRequests).toHaveBeenCalledWith(notificationSpy);
        });
    });
    describe('when $browser.notifyWhenNoOutstandingRequests is not available', () => {
        beforeEach(() => {
            spyOn($rootScope, '$watch').and.callThrough();
            delete $browser.notifyWhenNoOutstandingRequests;
        });
        describe('when there are pending requests', () => {
            beforeEach(() => {
                $http.pendingRequests.push('pending');
                victim.notifyWhenStable(notificationSpy);
                $rootScope.$apply();
            })
            it('should not execute the callback', () => {
                expect(notificationSpy).not.toHaveBeenCalled();
            });
        });
        describe('when there are no pending requests', () => {
            beforeEach(() => {
                victim.notifyWhenStable(notificationSpy);
                $rootScope.$apply();
            })
            it('should execute the callback', () => {
                expect(notificationSpy).toHaveBeenCalled();
            });
        });
        
    });
});