
myApp.controller('ShowController', function($scope, LoginFactory, $routeParams){

  function showusers(){
    LoginFactory.show($routeParams.id, function(data){
      $scope.Users=data;
      console.log(data)
    })
  }
  showusers();

  $scope.show = function(){
    LoginFactory.show($scope.user, function(data){
    if(data.hasOwnProperty('errors')){
      $scope.showErrors = data.errors;
      console.log(data.errors);
    } else {
      showusers();
      $location.path('/user');
    }
  })
  };
});
