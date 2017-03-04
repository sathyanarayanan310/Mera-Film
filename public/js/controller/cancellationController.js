'use strict';

module.exports = function($scope,$http,$location) {
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  var self = this;
   self.submit = function() {
       console.log('Form is submitted with following user');
  };
console.log($scope.idNo);
console.log($scope.movie);
$scope.showd=false;
var i;
$scope.showdetails = function() {


        $http.get('/con/con').success(function (response) {
            // $scope.confirmlist = response;
            // $scope.confirm = "";
            console.log(response);
            for(i=0;i<=response.length;i++){
       console.log(response[i].conbookingid);
              if(response[i].conbookingid==$scope.idNo&&response[i].conFilmName==$scope.movie){
           console.log($scope.idNo);
           console.log($scope.movie);
           $scope.cancellist = response[i];
           $scope.cancel = "";
           console.log(response[i]);
 // $scope.showd=true;
  $scope.showd=true;

       }
       }
    });


}


  $scope.cancelBook = function(id) {
    $http.delete('/con/con/' + id._id).success(function(response) {
        console.log(response);
        console.log('CANCELLED SUCCESSFULLY');
        // alert('Cancellation Succesfull')
        $location.path('/home');
        // refreshConfirm();
});
  }
};
