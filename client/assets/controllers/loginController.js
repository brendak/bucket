//LoginController
myApp.controller('LoginController', function($scope, LoginFactory, $location){

  $scope.loginUser = function(user){
    console.log(user);
    LoginFactory.loginUser(user, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.loginErrors = data.errors
      }else{
        $location.path('/')
      }
    })
  }
  $scope.logout=function(){
    LoginFactory.logout(this.user, function(data){
      $scope.users=data;
      $location.path('/');
    })
  }
  $scope.registerUser = function(user){
    LoginFactory.registerUser(user, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.regErrors = data.errors
      }else{
        $location.path('/')
      }
    })
  }
})
