# RxJs-angularJS
A small example of using observables in AngularJS

# Installing Dependencies

``` bower install ```

# Javascript


module: 

```javascript
angular.module('app', ['rx'])

```

controller:


```javascript

angular.module('app')
  .controller('appCtrl', function($scope, authService) {
    $scope.auth = (payload) => {
      authService.login(payload)
        .subscribe((res) => console.log(res),
          (error) => {
            console.log(error);
          });
    }
  })
```

service:

```javascript
angular.module('app')
 .factory('authService',  function(restFactory, rx) {

      let login = (payload) => {

        let url = 'YOUR_API_URL';
        return rx.Observable
          .fromPromise(restFactory.post(url, payload))
          .map((response) => {
            return response.data;
          })
          .catch((error) => {
            return rx.Observable.create((observable) =>{
              observable.next(error.data)
            });
          })
      };

    return {
      login
    }
  })
``` 

rest : 
```javascript
angular.module('app')
 .factory('restFactory', function ($http) {

    let post = (url, payload) => {
      return $http.post(url, payload)
    };

    let get = (url) => {
      return $http.get(url);
    };

    return {
      post,
      get
    };
  });


```
