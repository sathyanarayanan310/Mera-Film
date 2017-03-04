'use strict';

module.exports = function($scope, $http, $log, $rootScope, $location) {
  $scope.movieinfo = $rootScope.moviebooking;
  console.log($scope.movieinfo );
  $scope.seatarr = true;
  console.log($scope.movieinfo);
  var date;
 var details=[];
$scope.seat=false;
var i;
$rootScope.seatArrange=[];
  // console.log($scope.movieinfo);
  var self = this;
   self.submit = function() {
       console.log('Form is submitted with following user');
  };

  var refreshBookin = function () {
        $http.get('/book/book').success(function (response) {
            console.log('book READ IS SUCCESSFUL');
            $scope.Booklist = response;
            $scope.book = "";
    });
    };

    refreshBookin();



    var refreshConfirm = function () {

        $http.get('/con/con').success(function (response) {

            console.log('Confirm READ IS SUCCESSFUL');
            $scope.confirmlist = response;
            $scope.confirm = "";
            console.log($scope.confirmlist);


    });
    };
    refreshConfirm();

    var selected=[];
    var reserved=[];
    $scope.rows = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H','I', 'J', 'K', 'L','M','N','O','P','Q','R'    ];
       $scope.cols = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];

      //  $scope.rows1 = ['E', 'F', 'G', 'H',];
      //     $scope.cols1 = [ 1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10];
       //
      //     $scope.rows2 = ['I', 'J', 'K', 'L',];
      //        $scope.cols2 = [ 1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10];


  $scope.getStatus = function(seatPos) {
  if(reserved.indexOf(seatPos) > -1) {
                return 'reserved';
            } else if(selected.indexOf(seatPos) > -1) {
                return 'selected';
            }
}
            $scope.seatClicked=function(seatPos){
              var index = selected.indexOf(seatPos);
               if(index != -1) {
                   // seat already selected, remove
                   selected.splice(index, 1)
               } else {
                   // new seat, push
                   var no=document.getElementById("numberticket").value;
console.log(no);
                   if(selected.length>=0)
                   {
                     selected.push(seatPos);
                     console.log(selected);
                     if(selected.length==no)
                     {
                       $scope.seatarr=false;
                     }
                   }

                  //  selected.push(seatPos);
                   console.log(selected);

                  document.getElementById("seating").innerHTML=selected;
                  // $scope.nofseats=selected.length;
                  // $scope.seatNo=selected;
            // seatClick();
             }
            };

            // $scope.d=function(){
            //
            // // alert(date);
            // console.log(date);
            // }
            $scope.add =function(){
              console.log($scope.confirmlist);
 // date=document.getElementById("datebook").value;
 //              $scope.book.Day=date;
              $scope.book.FilmName=$scope.movieinfo.Film;
 console.log($scope.book.FilmName);
             console.log($scope.book.CityName);
             console.log($scope.book.HallName);
             console.log($scope.book.Day);
             console.log($scope.book.ShowTime);
  try
              {
              for(i=0;i<=$scope.confirmlist.length;i++)
                    {
                      if($scope.confirmlist.length>=0)
                      {
                        console.log($scope.confirmlist[i].conFilmName);
                        console.log($scope.confirmlist[i].conCityName);
                        console.log($scope.confirmlist[i].conHallName);
                        console.log($scope.confirmlist[i].conDay);
                        console.log($scope.confirmlist[i].conShowTime);

                    if ($scope.confirmlist[i].conFilmName==$scope.book.FilmName && $scope.confirmlist[i].conCityName==$scope.book.CityName  && $scope.confirmlist[i].conHallName==$scope.book.HallName  && $scope.confirmlist[i].conDay==$scope.book.Day && $scope.confirmlist[i].conShowTime==$scope.book.ShowTime){
                     reserved=$scope.confirmlist[i].conseatNo;
                         console.log(reserved);

                   }
                    else
                    {
                       alert("there is no blked seats");
                    }
                  }
                  else
                    {
                      alert("there is no booked data");
                    }
                  }
                    }
                  catch(e){}
              };

              $scope.bk = function() {
                var arr = [];
while(arr.length < 1){
    var randomnumber = Math.ceil(Math.random()*100000)
    if(arr.indexOf(randomnumber) > -1) continue;
    // arr[arr.length] = randomnumber;
    arr.push(randomnumber);
    alert(arr);
    console.log(arr);
}

$scope.book.bookingid= arr;
// $scope.book.bookingid= arr;
                // date=document.getElementById("datebook").text;
                $scope.book.FilmName=$scope.movieinfo.Film;
              $scope.book.seatNo=selected;
              // var amt=parseInt($scope.Amount);
              $scope.book.totalAmount=  100*selected.length;
              console.log($scope.book.totalAmount);
              // $scope.book.Day=date;
              // console.log($scope.book.seatNo);
                  console.log($scope.book);
                  $http.post('/book/book', $scope.book).success(function (response) {
                          console.log(response);
// $rootScope.confirm=$scope.book;
// console.log(confirm);
                      });
                      $rootScope.confirm=$scope.book;
                     console.log(confirm);
              // alert($rootScope.moviebooking);
              $location.path('/confirm');
              // refreshBookin();
            };


                var refreshLocat = function () {
                      $http.get('/cty/cty').success(function (response) {
                          console.log('READ IS SUCCESSFUL');
                          $scope.loclist = response;
                          $scope.loc = "";
                      });
                  };
                    refreshLocat();

var uniqueNames = [];
var uniqueObj = [];
var uniqueHall=[];
var uniqueTheat=[];

  var refreshMape = function () {
        $http.get('/map/map').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.maplist = response;
            $scope.map = "";
            for(i = 0; i< $scope.maplist.length; i++){
                if($scope.maplist[i].Film==$scope.movieinfo.Film){
              if(uniqueNames.indexOf($scope.maplist[i].City) === -1){
                  uniqueObj.push($scope.maplist[i]);
              uniqueNames.push($scope.maplist[i].City);

            }
            console.log(uniqueNames);
               $scope.locMovie=uniqueNames;
       }
     }
     });


 }

       $scope.sel=function(){
         var j;
         for( j= 0; j< $scope.maplist.length; j++){

       if($scope.maplist[j].Film==$scope.movieinfo.Film&&$scope.maplist[j].City==$scope.book.CityName){
         if(uniqueHall.indexOf($scope.maplist[j].Hall) === -1){
             uniqueTheat.push($scope.maplist[j]);
         uniqueHall.push($scope.maplist[j].Hall);
       console.log(uniqueHall);
       $scope.loctheat=uniqueHall;
       }}
       }
     };

     var uniqueshow=[];
     var uniqueTime=[];

     $scope.selshow=function(){
       var m;
       for( m= 0; m< $scope.maplist.length; m++){

     if($scope.maplist[m].Film==$scope.movieinfo.Film&&$scope.maplist[m].City==$scope.book.CityName&&$scope.maplist[m].Hall==$scope.book.HallName){
       if(uniqueHall.indexOf($scope.maplist[m].showtime) === -1){
           uniqueshow.push($scope.maplist[m]);
       uniqueTime.push($scope.maplist[m].showtime);
     console.log(uniqueTime);
     $scope.Showtee=uniqueTime;
     }
   }
     }
   };




      refreshMape();

      var refreshTheat = function () {
            $http.get('/theater/theater').success(function (response) {
                console.log('theater READ IS SUCCESSFUL');
                $scope.thtrelist = response;
                $scope.thtre = "";
            });
        };

        refreshTheat();
        };
