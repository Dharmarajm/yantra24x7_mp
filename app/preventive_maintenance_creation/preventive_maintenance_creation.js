'use strict';

angular.module('preventive_maintenance_creation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_creation', {
    templateUrl: 'preventive_maintenance_creation/preventive_maintenance_creation.html',
    controller: 'preventiveMaintenanceCreationCtrl'
  });
}])

.controller('preventiveMaintenanceCreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

  $scope.preCreation={ "frequency":[
                                           {"value":"Weekly"},   
                                           {"value":"Monthly"},
                                           {"value":"Quarterly"},
                                           {"value":"Half Yearly"},
                                           {"value":"Yearly"}
                                          ]
                             };
  /*$scope.preventiveCreation={ 
                             "machine_id":"",
                             "area":"",
                             "frequency":"",
                             "phone_number":"",
                             "maintenance_date":"",
                             "reason_for_preventive":""                               
                            }; */
$http({
        method: 'GET',
        url: $rootScope.api_url+'machines'
      }).then(function(response){
      	$scope.preMaintenanceCreate=response.data;
      })
$scope.preventCreation=function(){
	
	var preventiveCreation={ 
                             "machine_id":$scope.preventiveCreation.machine_id,
                             "area":$scope.preventiveCreation.area,
                             "frequency":$scope.preventiveCreation.frequency.value,
                             "phone_number":$scope.preventiveCreation.phone_number,
                             "maintenance_date":$scope.preventiveCreation.maintenance_date,
                             "reason_for_preventive":$scope.preventiveCreation.reason_for_preventive                               
                            };
console.log(preventiveCreation);
 $http({
       method:'POST',
       url: $rootScope.api_url+'preventive_maintenances',
       data: preventiveCreation 
      }).then(function(response){
      	$scope.preventSuccess=response.data;
      	console.log($scope.preventSuccess);
        alert("Preventive Maintenance Created");
      })                           
}

}]);