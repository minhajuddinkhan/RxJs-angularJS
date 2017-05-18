angular.module('app', ['rx'])
  .controller('appCtrl', function($scope, authService) {

    $scope.auth = (payload) => {
      authService.login(payload)
        .subscribe((res) => console.log(res),
          (error) => {
            console.log(error);
          });
    }
  })
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
