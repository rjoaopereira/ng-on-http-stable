# ng-on-http-stable
angular directive that renders when there are no $http outstanding requests 

# Purpose
This directive was created to delay the downloading of tracking scripts, it can, however, be used for any other purpose.

## Usage
The directive should be placed in after the code which will be making the requests. Making it the last element in your page is always a good approach :).

## directive
```html
<ng-on-http-stable>
  <p>This will render when the $http service has no more pending calls</p>
</ng-on-http-stable>
```

## service
A service is also available.
```js
onHttpStableService.notifyWhenStable(function () {
    //execute logic
});
```
