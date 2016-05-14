import './templates.js';

import OnHttpStableDirective  from './ng-on-http-stable-directive';
import OnHttpStableService    from './ng-on-http-stable-service';
import OnHttpStableConfig     from './ng-on-http-stable-config';

const app = angular.module('ngOnHttpStable', ['ngOnHttpStableTemplates']);

app.directive ('ngOnHttpStable',         OnHttpStableDirective);
app.service   ('OnHttpStableService',    OnHttpStableService);

app.config(OnHttpStableConfig);