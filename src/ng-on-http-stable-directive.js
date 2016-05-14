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
        templateUrl: 'ng-on-http-stable.html',
        scope: {}
    };
}

ngOnHttpStableDirective.$inject = [
    'OnHttpStableService'
];

export default ngOnHttpStableDirective;