'use strict';

angular.module('anualMaintenanceCreation', ['ngRoute','ui.calendar','ui.bootstrap'])

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
                     
if($scope.role_type_name=='Tenant'){

$http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.anualCheckMachines = response.data;
   console.log()
  
    })
}//if block end
else{

$http({
    method:'GET',
    url:$rootScope.api_url+'unit_machine?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
$scope.anualCheckMachines = response.data;
   
  
    })

}
//Post Method for creating anual maintenance

$scope.anualMaintainCreate=function(){
	
	var anualCreate={ 
                             "machine_id":$scope.anualMainCreation.machine_id,
                             "maintenance_type":$scope.anualMainCreation.maintenance_type_id.value,
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
       // localStorage.setItem("id",$scope.anualCreateSuccess.id);
        //$scope.amc_detail_id=localStorage.getItem("id");
       // console.log($scope.amc_detail_id);
      	//alert("Anual Maintenance Created")
        $location.path('/anual_maintenance_list');
        
      })                           
}

}]);