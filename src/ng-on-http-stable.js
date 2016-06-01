import OnHttpStableDirective   from './ng-on-http-stable-directive';
import OnHttpStableService     from './ng-on-http-stable-service';
import OnHttpStableConfig      from './ng-on-http-stable-config';
import OnHttpStableInterceptor from './ng-on-http-stable-interceptor';

const app = angular.module('ngOnHttpStable', []);

app.directive ('ngOnHttpStable',          OnHttpStableDirective);
app.service   ('OnHttpStableService',     OnHttpStableService);
app.factory   ('OnHttpStableInterceptor', OnHttpStableInterceptor);

app.config(OnHttpStableConfig);