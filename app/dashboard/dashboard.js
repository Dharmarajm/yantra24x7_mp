
'use strict';

angular.module('dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', '$http','$location','$window','$rootScope','$timeout','$interval',
  function($scope, $http,$location,$window,$rootScope,$timeout,$interval) {
  
    var tick = function() {
    $scope.clock = Date.now();
  }
  tick();
  $interval(tick, 1000);

   $scope.myLoader = true;

   $scope.dashboard=function(){
 
    $http({
       method:'GET',
       url:$rootScope.api_url+'api/v1/machines/dashboard_test?tenant_id='+$scope.tenant_id
   }).then(function(response){
     $scope.myLoader = false;
       $scope.cardnames = response.data;  
        $scope.LastUpdate = $scope.cardnames[0].last_update;
        console.log(response.data);
        localStorage.setItem("shiftno", $scope.cardnames.shift_no);
  })

   $http({
     method:'GET',
     url:$rootScope.api_url+'api/v1/alarms/alarm_dashboard?tenant_id='+$scope.tenant_id})
     .then(function(response){
           $scope.RecentAlarm= response.data;
            console.log($scope.RecentAlarm);
      })

   $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/operator_allocations?tenant_id='+$rootScope.tenant
  })
  .then(function(response){
   $rootScope.operator_alls = response.data; 
   
    })
  };
     
$scope.machine_page_redirect=function(id){
 localStorage.setItem("machine_id",id);
  $location.path('/machine')
}

$scope.job_page_redirect=function(id){
 localStorage.setItem("cncjob_id",id);
 localStorage.setItem("Filterid",0);
  $location.path('/jobpage')
}
}]);