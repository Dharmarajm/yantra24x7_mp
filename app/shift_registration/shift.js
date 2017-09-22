'use strict';

angular.module('shift', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shift_registration', {
    templateUrl: 'shift_registration/shift.html',
    controller: 'ShiftCtrl'
  });
}])

.controller('ShiftCtrl', ['$scope', '$http','$location','$rootScope','$window','$log','$timeout','$filter',
  function($scope, $http,$location,$rootScope,$window,$log,$timeout,$filter) {

//$scope.tenant_id=localStorage.getItem("tenant_id");

$scope.shiftregistration ={id:null, start_time:"", end_time:"",
total_working_hours:"", number:"", start_time_dummy:"",
end_time_dummy:"", total_time_dummy:"",day_start_time:"",
day_start_time_dummy:"",unit_id:null};//,tenant_id: $scope.tenant_id};
$scope.shiftform= function(){ // $scope.ntime="9:00 am"

 $scope.daystart = $filter('date')($scope.shiftregistration.start_time_dummy, "hh:mma");
  $scope.dayend = $filter('date')($scope.shiftregistration.end_time_dummy, "hh:mma");
   $scope.work = $filter('date')($scope.shiftregistration.total_time_dummy, "HH:mm:ss");
   $scope.day = $filter('date')($scope.shiftregistration.day_start_time_dummy, "HH:mma");
   var shiftregistration = {
"number": $scope.shiftregistration.number,
 "start_time": $scope.daystart,
 "end_time": $scope.dayend,
 "total_working_hours": $scope.work,
 "day_start_time": $scope.day,
 "unit_id": $scope.reference_id,
 "start_time_dummy": $scope.shiftregistration.start_time_dummy,
 "end_time_dummy": $scope.shiftregistration.end_time_dummy,
 "total_time_dummy": $scope.shiftregistration.total_time_dummy,
 "day_start_time_dummy":$scope.shiftregistration.day_start_time_dummy
   }

if($scope.shiftregistration.id==null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'shifts',
        data: shiftregistration
      })

      .success(function(data) {

        if(data){
        alert("Registration completed");
        $scope.shiftinit();
        }else{
        alert('Registration Failed');
        }
      })
}
else{

    $http
      ({
        method: 'put',
        url: $rootScope.api_url+'shifts/'+$scope.shiftregistration.id,
        data: shiftregistration
      })

      .success(function(data) {

        if(data){
       alert("Updated Successfully");
       $scope.shiftinit();
    }else{
        alert('Updation Failed');
        }
      })
}
    }

$scope.shiftinit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_shift?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
 $rootScope.shiftdetails= response.data;
  //console.log($rootScope.shiftdetails);
   //localStorage.setItem("sid",$scope.shiftdetails.id);
 //  localStorage.setItem("sno",$scope.shiftdetails.no_of_shift);

})

  $http({

    method:'GET',
    url:$rootScope.api_url+'unit_shift_current_time?unit_id='+$scope.reference_id
  })
  .then(function(response){    
   $scope.shift = response.data; 
   console.log($scope.shift);
    })
}

$scope.breaktime=function(id){

localStorage.setItem("breaktime_id",id);
         $location.path('/breaktime');

}



    $scope.cleandata= function() {

$scope.shifttransact ={id:null, start_time:"", end_time:"",
total_working_hours:"", number:"", start_time_dummy:"",
end_time_dummy:"", total_time_dummy:"",day_start_time:"",
day_start_time_dummy:"",unit_id:null};

 $scope.shiftregistration = angular.copy($scope.shifttransact);
 }

    $scope.edit= function(id) {
      
var i;

   for(i in $rootScope.shiftdetails) {
   
            if($rootScope.shiftdetails[i].id == id) {

               var shifttrans_id=$rootScope.shiftdetails[i];
               $scope.shiftregistration = angular.copy(shifttrans_id);

              
            }

        }
        console.log($scope.shiftregistration);
    }

$scope.delete= function(id) {

$http.delete($rootScope.api_url+'shifts/'+id).success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      $scope.shiftinit();
        }else{
        alert('Delete Failed');
        }
      });


}


}]).directive('bindHtmlCompile', function($compile) {
    return {
      restrict: "A",
      scope: {
        bindHtmlCompile: "="
      },
      link: function(scope, elem) {
        scope.$watch("bindHtmlCompile", function(newVal) {
          elem.html('');
          var newElem = angular.element(newVal);
          var compileNewElem = $compile(newElem)(scope.$parent);
          elem.append(compileNewElem);
        });
      }
    };
  });