describe('OnHttpStableService', () => {

    let victim;
    let notificationSpy;

    beforeEach(angular.mock.module('ngOnHttpStable'));

    beforeEach(() => {
        inject([
            'OnHttpStableService',
            function (_OnHttpStableService_) {
                victim = _OnHttpStableService_;
            }]);

        notificationSpy = jasmine.createSpy('notificationSpy');
    });

    describe('when no requests are added', () => {
        beforeEach(() => {
            victim.notifyWhenStable(notificationSpy);
        });

        it('should notify immediately', () => {
            expect(notificationSpy).toHaveBeenCalled();
        });
    });

    describe('when requests are added', () => {

        beforeEach(() => {
            victim.increaseOutsandingRequests();
            victim.increaseOutsandingRequests();
            victim.notifyWhenStable(notificationSpy);
        });

        describe('when not all requests are completed', () => {
            beforeEach(() => {
                victim.completeOutstandingRequest();
            });

            it('should not notify', () => {
                expect(notificationSpy).not.toHaveBeenCalled();
            });
        });

        describe('when all requests are completed', () => {
            beforeEach(() => {
                victim.completeOutstandingRequest();
                victim.completeOutstandingRequest();
                victim.notifyWhenStable(notificationSpy);
            });

            it('should notify', () => {
                expect(notificationSpy).toHaveBeenCalled();
            });
        });
    });
});