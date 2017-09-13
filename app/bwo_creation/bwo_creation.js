'use strict';

angular.module('bwo_creation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_creation', {
    templateUrl: 'bwo_creation/bwo_creation.html',
    controller: 'bwoCreationCtrl'
  });
}])

.controller('bwoCreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

$scope.checklist={ "require_brain_storming":[{"id":1,"value":true},{"id":0,"value":false}],
                   "need_servicesupport":[{"id":1,"value":true},{"id":0,"value":false}],
                   "psn_notificationmail":[{"id":1,"value":true},{"id":0,"value":false}],
                   "kaizen_status":[{"id":1,"value":true},{"id":0,"value":false}]  
                 };

$scope.bwocreation={
                     "machine_id": "",
                     "manufacture_date":"",
                     "maintenance_workorder_number": "", 
                     "start_time": "", 
                     "end_time": "",
                     "alarm": "", 
                     "maintainence_workorder_type": "", 
                     "maintenance_workorder_closedby": "",
                     "status": "", 
                     "awaiting": "", 
                     "require_brain_storming": "", 
                     "need_servicesupport": "", 
                     "psn_notificationmail": "", 
                     "kaizen_status": "",
                     "maintenance_type_id":"",
                     "nature_of_breakdown_id": "", 
                     "breakdown_type_id": "",
                     "file_path": ""
                   };
// Post Method for BWO Creation

$scope.bwoCreation=function(){
  var bwocreation={
                   "machine_id": $scope.bwocreation.machine_id,
                   "manufacture_date": $scope.bwocreation.manufacture_date,
                   "maintenance_workorder_number": $scope.bwocreation.maintenance_workorder_number, 
                   "start_time": $scope.bwocreation.start_time, 
                   "end_time": $scope.bwocreation.end_time,
                   "alarm": $scope.bwocreation.alarm, 
                   "maintainence_workorder_type": $scope.bwocreation.maintainence_workorder_type, 
                   "maintenance_workorder_closedby": $scope.bwocreation.maintenance_workorder_closedby,
                   "status": $scope.bwocreation.status, 
                   "awaiting": $scope.bwocreation.awaiting, 
                   "require_brain_storming": $scope.bwocreation.require_brain_storming, 
                   "need_servicesupport": $scope.bwocreation.need_servicesupport, 
                   "psn_notificationmail": $scope.bwocreation.psn_notificationmail, 
                   "kaizen_status": $scope.bwocreation.kaizen_status, 
                   "maintenance_type_id":$scope.bwocreation.maintenance_type_id,
                   "nature_of_breakdown_id": $scope.bwocreation.nature_of_breakdown_id, 
                   "breakdown_type_id": $scope.bwocreation.breakdown_type_id,
                   "file_path": $scope.bwocreation.file_path
                  }; 
 console.log(data); 

  $http({
  	method:'post',
  	url: $rootScope.api_url+'breakdown_work_orders',
  	data: bwocreation
  }).then(function(data){
  	
  	if(data){
  	 alert('Breakdown work orders Created');
      $location.path('/bwo_service_details');	 
  	}else{
      alert('breakdown work orders created failed');

  	}
  })	
}

// Sections Data getting functions
$http({

    method:'GET',
    url: $rootScope.api_url+'unit_section?unit_id='+4
  })
  .then(function(response){
   $scope.bwoSections = response.data;
   console.log($scope.bwoSections);

})

//Maintenance Type getting functions

$http({

    method:'GET',
    url: $rootScope.api_url+'maintenance_type'
  })
  .then(function(response){
   $scope.maintenanceTypeList = response.data;
   console.log($scope.bwoSections);

})

//Breakdown Type getting functions

$http({

    method:'GET',
    url: $rootScope.api_url+'breakdown_type'
  })
  .then(function(response){
   $scope.breakdownList = response.data;
})

//Nature of Breakdowns Getting functions

$http({

    method:'GET',
    url: $rootScope.api_url+'nature_of_breakdowns'
  })
  .then(function(response){
   $scope.natureBreakdownList = response.data;
})  


//Dynamic DropDown for Machine ID

$scope.change=function(id){
  $scope.sectionId=id;
  console.log($scope.sectionId)
 $http({

    method:'GET',
    url: $rootScope.api_url+'section_machines?section_id='+id
  })
  .then(function(response){
   $scope.bwoMachines = response.data;
   console.log($scope.bwoSections);

 })
}

$scope.create=function(id){
 console.log(id);
}
}]);