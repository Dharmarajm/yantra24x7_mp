'use strict';

angular.module('bwo_list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_list', {
    templateUrl: 'bwo_list/bwo_list.html',
    controller: 'bwoListCtrl'
  });
}])

.controller('bwoListCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
$scope.bw_list=function(){
if($scope.role_type_name == 'Tenant'){

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
 localStorage.removeItem("bwo_edit");
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