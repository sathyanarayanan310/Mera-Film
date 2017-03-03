'use strict';

module.exports = function($scope, $http, $location, $rootScope) {
  var refreshMape = function () {
        $http.get('/map/map').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.maplist = response;
            $scope.map = "";
        });
    };
 refreshMape();

var r = function() {
    $http.get('/movie/movie').success(function(response) {
        console.log('READ IS SUCCESSFUL');
        $scope.moviList = response;
        $scope.movi = "";
    });
  };

    r();

$scope.bookingmovi= function (m) {
                 $rootScope.moviebooking=m;
// alert($rootScope.moviebooking);
$location.path('/moviebooking');
      };

      $scope.ratingreview= function (m) {
                       $rootScope.moviebooking=m;
      // alert($rootScope.moviebooking);
      $location.path('/rating');
            };


};
