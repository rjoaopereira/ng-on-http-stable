describe('OnHttpStableDirective', () => {

    let $rootScope;
    let $compile;
    let $scope;
    let element;
    let onHttpStable;

    beforeEach(angular.mock.module('ngOnHttpStable'));

    beforeEach(() => {
        
        inject(function (_$rootScope_, _$compile_, _OnHttpStableService_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $scope = $rootScope.$new();
            onHttpStable = _OnHttpStableService_;
        });

        element = $compile('<ng-on-http-stable></ng-on-http-stable>')($scope);
    });
    describe('when the page has finished the outstanding requests', () => {
        beforeEach(() => {
            $scope.$apply();
        });

        it('should have one child element', () => {
            expect(element.children().length).toBe(1);
        });
    });

    describe('when the page has not finished the outstanding requests', () => {
        beforeEach(() => {
            spyOn(onHttpStable, 'notifyWhenStable');
            $scope.$apply();
        });

        it('should have no children elements', () => {
            expect(element.children().length).toBe(0);
        });
    });
});