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
//Machines data Getting Functions

if($scope.role_type_name=='Tenant'){

$http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.preMaintenanceCreate = response.data;
   
  
    })
}//if block end
else{

$http({
    method:'GET',
    url:$rootScope.api_url+'unit_machine?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
$scope.preMaintenanceCreate = response.data;
   
  
    })

}

$scope.preventiveCreation={"machine_id":'',"area":'',"frequency":'',"phone_number":'',"maintenance_date":'',"reason_for_preventive":'',"status":'Inprogress'};
$scope.preventCreation=function(){
	console.log($scope.preventiveCreation);
	var preventiveCreation={ 
                             "machine_id":$scope.preventiveCreation.machine_id,
                             "area":$scope.preventiveCreation.area,
                             "frequency":$scope.preventiveCreation.frequency.value,
                             "phone_number":$scope.preventiveCreation.phone_number,
                             "maintenance_date":$scope.preventiveCreation.maintenance_date,
                             "reason_for_preventive":$scope.preventiveCreation.reason_for_preventive,
                             "status":$scope.preventiveCreation.status                              
                            };
console.log(preventiveCreation);
 $http({
       method:'POST',
       url: $rootScope.api_url+'preventive_maintenances',
       data: preventiveCreation 
      }).then(function(response){
      	$scope.preventSuccess=response.data;
      	localStorage.setItem("id",$scope.preventSuccess.id);
        console.log(localStorage.getItem("id"))
        alert("Preventive Maintenance Created");
        $location.path('/preventive_maintenance_list');
      })                           
}

}]);