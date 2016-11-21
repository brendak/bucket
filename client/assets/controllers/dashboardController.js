
myApp.controller('DashboardController', function($scope, LoginFactory, $location){
  LoginFactory.getCurrentUser(function(user){
    $scope.currentUser = user
  })

  function getBuckets(){
    LoginFactory.getBuckets(function(data){
      $scope.buckets = data;
    })
  }
  getBuckets()


  $scope.createbucket = function(){
    LoginFactory.addbucket($scope.newBucket, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.custErrors = data.errors;
        console.log(data.errors);
      } else{
        getBuckets()
      }
    })
  }

  function getUsers(){
    LoginFactory.getUsers(function(data){
      $scope.Users = data;
      console.log('data from getusers function', $scope.Users);
    })
  }
  getUsers()

  //
  // $scope.updateStatus = function(){
  //    LoginFactory.newStatus($scope.status, function(data){
  //       if(data.hasOwnProperty('errors')){
  //          $scope.statusErrors = data.errors;
  //       }else{
  //          $scope.status = {};
  //          getBuckets();
  //       }
  //    })
  // }


});
