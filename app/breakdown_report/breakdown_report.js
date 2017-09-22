'use strict';

angular.module('bwo_reports', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_reports', {
    templateUrl: 'breakdown_report/breakdown_report.html',
    controller: 'breakdownListCtrl'
  });
}])

.controller('breakdownListCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
$scope.bw_list=function(){
/*if($scope.role_type_name == 'Tenant'){

	 $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_break_down_orders?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
 $scope.bwo_display_list= response.data; 
 
    })



}else{

 $http({

    method:'GET',
    url:$rootScope.api_url+'unit_break_down_orders?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
  $scope.bwo_display_list= response.data; 
  
    })
}
*/

  if($scope.role_type_name=='Tenant'){

$http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.machines = response.data;
   
  
    })
    $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_service_engineers?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.service_engineer_list= response.data; 
  
    })
}//if block end
else{

$http({
    method:'GET',
    url:$rootScope.api_url+'unit_machine?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
    $scope.machines = response.data;
   
  
    })
    $http({

    method:'GET',
    url:$rootScope.api_url+'unit_service_engineers?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
   $scope.service_engineer_list = response.data; 
  
    })

}

  $http({

    method:'GET',
    url:$rootScope.api_url+'unit_shift_current_time?unit_id='+$scope.reference_id
  })
  .then(function(response){    
   $scope.shift_for_bwo_report= response.data; 
   
    })


}
$scope.bwo_fields={from_date:"",to_date:"",shift_id:null,machine_id:null,service_engineer_id:null};
$scope.generate_bwo=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'breakdown_report?from_date='+$scope.bwo_fields.from_date+'&&to_date='+$scope.bwo_fields.to_date+'&&machine_id='+$scope.bwo_fields.machine_id+'&&shift_id='+$scope.bwo_fields.shift_id+'&&service_engineer_id='+$scope.bwo_fields.service_engineer_id
  })
  .then(function(response){
    
  $scope.bwo_display_list= response.data; 
  
    })

}



$scope.inhouse_forward=function(id){


     localStorage.setItem("bwo_id",id);
      $location.path('/bwo_service_details');	 

}


$scope.spare_forward=function(id){


     localStorage.setItem("bwo_id",id);
      $location.path('/bwo_analysis');	 

}
$scope.new_creation=function(){

	$location.path('/bwo_creation');
}









  $scope.edit_bwo = function(id) {
  	localStorage.setItem("bwo_edit",id);
  	$location.path('/bwo_creation')

    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'breakdown_work_orders/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.bw_list();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}






}]);