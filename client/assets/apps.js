myApp.factory('loginInterceptor',['$q','$location',function($q, $location){
 return{
  'responseError': function(rejection){
   if (rejection.status == 401){
         $location.url('/login');
   }
   return $q.reject(rejection);
  }
 }
}])
myApp.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('loginInterceptor');
  $routeProvider
    .when('/login',{
      templateUrl: 'assets/partials/loginreg.html',
      controller:'LoginController'
    })
    .when('/', {
      templateUrl: 'assets/partials/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/user/:id', {
     templateUrl: 'assets/partials/user.html',
     controller: 'ShowController'
   })
   .when('/dashboard', {
     templateUrl: 'assets/partials/dashboard.html',
     controller: 'DashboardController'
   })
    .otherwise({
      redirectTo: '/login'
    })
});
