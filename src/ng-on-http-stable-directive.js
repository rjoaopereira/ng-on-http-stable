function ngOnHttpStableDirective(
    onHttpStableService
) {

    function link($scope) {
        onHttpStableService.notifyWhenStable(function () {
            $scope.ready = true;
        });
    }

    return {
        restrict: 'E',
        transclude: true,
        link: link,
        template: '<ng-transclude ng-if="::ready"></ng-transclude>',
        scope: {}
    };
}

ngOnHttpStableDirective.$inject = [
    'OnHttpStableService'
];

export default ngOnHttpStableDirective;