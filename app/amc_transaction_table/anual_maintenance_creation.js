'use strict';

angular.module('anualMaintenanceCreation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/anual_maintenance_creation', {
    templateUrl: 'anual_maintenance_creation/anual_maintenance_creation.html',
    controller: 'anualMaintenanceCreationCtrl'
  });
}])

.controller('anualMaintenanceCreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

  $scope.anualmaintain={ "maintenance_type":[
                                           {"value":"AMC"},   
                                           {"value":"NO AMC"},
                                           {"value":"WARRANTY"}
                                           
                                          ]
                       };

//Machine Name getting functions
$http({
        method: 'GET',
        url: $rootScope.api_url+'machines'
      }).then(function(response){
      	$scope.anualCheckMachines=response.data;
      })                       


//Post Method for creating anual maintenance

$scope.anualMaintainCreate=function(){
	
	var anualCreate={ 
                             "machine_id":$scope.anualMainCreation.machine_id,
                             "maintenance_type":$scope.anualMainCreation.maintenance_type_id.value,
                             "manufacturing_date":$scope.anualMainCreation.manufacturing_date,
                             "duration_from":$scope.anualMainCreation.duration_from,
                             "duration_to":$scope.anualMainCreation.duration_to,
                             "renewal_started_date":$scope.anualMainCreation.renewal_started_date,
                             "visit_per_annum":$scope.anualMainCreation.visit_per_annum,
                             "amount_paid":$scope.anualMainCreation.amount_paid                               
                            };
console.log(anualCreate);
 $http({
       method:'POST',
       url: $rootScope.api_url+'amc_details',
       data: anualCreate 
      }).then(function(response){
      	$scope.anualCreateSuccess=response.data;
        
      	alert("Anual Maintenance Created")
        
      })                           
}

}]);