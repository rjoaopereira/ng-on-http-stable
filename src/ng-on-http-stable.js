import OnHttpStableDirective   from './ng-on-http-stable-directive';
import OnHttpStableService     from './ng-on-http-stable-service';

const app = angular.module('ngOnHttpStable', []);

app.directive ('ngOnHttpStable',          OnHttpStableDirective);
app.service   ('OnHttpStableService',     OnHttpStableService);