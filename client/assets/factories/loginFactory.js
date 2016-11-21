
myApp.factory('LoginFactory', ['$http', '$location', function($http, $location){
  var factory = {};
  factory.registerUser = function(user, callback){
    $http({
      method: "POST",
      url: "/users",
      data: user
    }).then(function(returned_data){
      console.log('factory received response:',returned_data.data)
      callback(returned_data.data);
    })
  }
  factory.loginUser = function(user, callback){
    $http({
      method: "POST",
      url: "/login",
      data: user
    }).then(function(returned_data){
      console.log('factory received response:',returned_data.data)
      callback(returned_data.data);
    })
  }
  factory.getCurrentUser = function(callback){
    $http({
      method:'get',
      url:'/currentUser'
    }).then(function(returned_data){
      callback(returned_data.data);
    })
  }
  factory.logout=function(user, callback){
  $http({
    method: "POST",
    url: '/logout',
    data: user
  }).then(function(returned_data){
    callback(returned_data.data);
  })
}
  factory.addbucket = function(bucket, callback){
    console.log('made it to the bucket factory:', bucket);
    $http({
      method: "POST",
      url: '/addingbuckets',
      data:bucket
    }).then(function(returned_data){
      console.log("server returned this data", returned_data.data);
      console.log('going to the routes')
      callback(returned_data.data);
    })
  }
  factory.getBuckets = function(callback){
    $http({
      method: "GET",
      url: '/getbuckets'
    }).then(function(res){
      // console.log("server returned this data from getbuckets," res.data)
      callback(res.data);
    })
  }
  factory.getUsers = function(callback) {
    $http({
      method: "GET",
      url: '/getusers',
    }).then(function(returned_data){
      callback(returned_data.data);
    })
  }
  factory.show = function(userId, callback) {
    $http({
      method: "GET",
      url: '/user/'+userId,
      data: userId
    }).then(function(returned_data){
      console.log('going to routes from show')
      callback(returned_data.data);
    })
  }
  factory.getPeeps = function(callback){
    $http({
      method: "GET",
      url: '/getpeeps'
    }).then(function(res){
      callback(res.data);
    })
  }
  factory.newStatus = function(status, callback){
      $http({
        method: "POST",
        url: '/updatestatus',
        data: status
      }).then(function(res){
         callback(res);
      })
   };
  return factory;
}])
