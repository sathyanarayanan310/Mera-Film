'use strict';


var angular = require('angular');
require('angular-route');
window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('angularjs-dropdown-multiselect');
// require('../css/app.scss');

var app = angular.module('movieApp', [ 'ngRoute']);


require('./controller');
require('./service');
app.filter('unique', function() {

   return function(collection, keyname) {

      var output = [],
          keys = [];


      angular.forEach(collection, function(item) {

          var key = item[keyname];

          if(keys.indexOf(key) === -1) {

              keys.push(key);

              output.push(item);
          }
      });

      return output;
   };
});
app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
  })

  .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    })
  .when('/booking', {
    templateUrl: 'views/booking.html',
    controller: 'BookingController',
    access: {restricted: true}
  })
  .when('/trailer', {
    templateUrl: 'views/trailer.html',
    // controller: 'TrailerController',
  })
  .when('/moviebooking', {
    templateUrl: 'views/moviebooking.html',
    controller: 'MovieBookingController',
  })
  .when('/rating', {
    templateUrl: 'views/rating.html',
    controller: 'RatingController',
  })
   .when('/cancellation', {
      templateUrl: 'views/cancellation.html',
      controller: 'CancellationController',
    })
    .when('/confirm', {
       templateUrl: 'views/confirm.html',
       controller: 'ConfirmController',
     })
  .otherwise({
    redirectTo: '/',
  });
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
