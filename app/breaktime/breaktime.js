  'use strict';

angular.module('breaktime', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/breaktime', {
    templateUrl: 'breaktime/breaktime.html',
    controller: 'BreaktimeCtrl'
  });
}])

.controller('BreaktimeCtrl', ['$scope', '$http','$location','$window','$rootScope','$filter',
  function($scope, $http,$location,$window,$rootScope,$filter) {


$scope.breaktime_ids=localStorage.getItem("breaktime_id");
 
$scope.breakregistration = {id: null,
  reason:"",
  start_time:"",
  end_time:"",
  start_time_dummy:"",
  end_time_dummy:"",
  shift_id:$scope.breaktime_ids,
  };

$scope.breakForm= function(){  
 $scope.daystart = $filter('date')($scope.breakregistration.start_time_dummy, "hh:mma");
  $scope.dayend = $filter('date')($scope.breakregistration.end_time_dummy, "hh:mma");

        var breakregistration = 
        {"shift_break":{"reason":$scope.breakregistration.reason,"start_time":$scope.daystart,"end_time":$scope.dayend,"start_time_dummy":$scope.breakregistration.start_time_dummy,"end_time_dummy":$scope.breakregistration.end_time_dummy,"shift_id":$scope.breaktime_ids}};
  if ($scope.breakregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'shift_breaks_create',
        data: breakregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.breakregistration="";
    alert("Registration completed");
     $scope.breaktimeinit();
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'shift_break_update?id='+$scope.breakregistration.id,
        data: breakregistration  
      })
      
      .success(function(data) {
        
        if(data){

alert("Updated Successfully");
     $scope.breaktimeinit();
        $scope.breaktimeinit();
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });  
        }else{      
        alert('Updation Failed');   
        }
      });
    }
  }


$scope.breaktimeinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'shift_break?shift_id='+$scope.breaktime_ids
  })
  .then(function(response){
  
   $rootScope.breaks = response.data; 
   
    })
}
  $scope.cleandata=function(){

$scope.cleardata={id: null,
  reason:"",
  start_time:"",
  end_time:"",
  start_time_dummy:"",
  end_time_dumy:"",
  shift_id:$scope.breaktime_ids,
  };
$scope.breakregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
      var i;
   for(i in $rootScope.breaks) {

            if($rootScope.breaks[i].id == id) {
            
               var break_id=$rootScope.breaks[i];
               $scope.breakregistration = angular.copy(break_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'shift_breaks_delete?id='+id).success(function(data) {
        
        if(data){

alert("Deleted Successfully");
     $scope.breaktimeinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

  

}]);