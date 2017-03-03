'use strict';

module.exports = function ($scope, $q, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      var self = this;
       self.submit = function() {
           console.log('Form is submitted with following user');
     };
      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password, $q)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error   nxb
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };



}
