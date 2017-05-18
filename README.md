# RxJs-angularJS
A small example of using observables in AngularJS

Don't forget to run bower install !

```ruby

$scope.auth = (payload) => {
      authService.login(payload)
        .subscribe((res) => console.log(res),
          (error) => {
            console.log(error);
          });
    }

```