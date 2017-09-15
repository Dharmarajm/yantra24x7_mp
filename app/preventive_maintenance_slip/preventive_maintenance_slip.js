'use strict';

angular.module('preventive_maintenance_slip', ['ngRoute','ui.calendar','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_slip', {
    templateUrl: 'preventive_maintenance_slip/preventive_maintenance_slip.html',
    controller: 'preventiveMaintenanceSlip'
  });
}])

.controller('preventiveMaintenanceSlip', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

  //Get Method for getting machines                      
$http({
        method: 'GET',
        url: $rootScope.api_url+'machines'
      }).then(function(response){
        $scope.anualCheckMachines=response.data;
      })
           
}]);