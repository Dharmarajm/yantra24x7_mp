'use strict';

angular.module('preventive_maintanance_slip_check', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintanance_slip_check', {
    templateUrl: 'preventive_maintanance_slip_check/preventive_maintanance_slip_check.html',
    controller: 'preventiveMaintenanceSlipChecklistCtrl'
  });
}])

.controller('preventiveMaintenanceSlipChecklistCtrl', ['$scope', '$http','$location','$window','$rootScope',
function($scope, $http,$location,$window,$rootScope) {
  

  $http({
  	method:'get',
  	url: $rootScope.api_url+'preventive_main_transaction',
  }).then(function(response){
  	$scope.slipCheckGetSuccess=response.data;
  	console.log($scope.slipcheckSuccess);
  })
  
  $scope.slipCheckId=localStorage.getItem("id");
  
  $scope.slipcheck={ "id":null,"checklist_name":"","description":""}

  $scope.slip_form=function(){

  	console.log($scope.slipCheckId)
  var slipcheck={ "preventive_main_transaction":{"list_to_check":$scope.slipcheck.checklist_name,"description":$scope.slipcheck.description,"preventive_maintenance_id":$scope.slipCheckId}}
if ($scope.slipcheck.id== null && $scope.slipcheck.checklist_name.length!=0 && $scope.slipcheck.description.length!=0){
  $http({
  	method:'post',
  	url: $rootScope.api_url+'preventive_main_transaction_create',
  	data: slipcheck
  }).then(function(response){
  	   $scope.slipcheckSuccess=response.data
  	   $scope.slipcheck="";	
  	   $scope.slipinit();
  	   alert("Slip checklist created");	
  })
}else{
	alert("Slip checklist created failed");   
}

  }

  $scope.slipinit=function(){
  $http({
  	method:'get',
  	url: $rootScope.api_url+'preventive_main_transaction',
  }).then(function(response){
  	$scope.slipCheckGetSuccess=response.data;
  })
  }

  

  $scope.delete=function(id){
  	console.log(id)
  if ($window.confirm("Please confirm?")) {
  $http.delete($rootScope.api_url+'preventive_main_transaction_delete?id='+id).success(function(data) {
        
  if(data){

       // $state.go('/company_registration');
  alert("Deleted Successfully");
      //$window.location.reload();
      $scope.slipinit();
        }else{      
        alert('Delete Failed');   
        }
      });
 }
 }

 $scope.edit=function(id){
 	$scope.updateId=id;
 	console.log($scope.updateId)
 	var i;
   for(i in $scope.slipCheckGetSuccess) {

            if($scope.slipCheckGetSuccess[i].id == id) {
              
               
               $scope.editSlipModelCheck={
                                   "list_to_check":$scope.slipCheckGetSuccess[i].list_to_check,
                                   "description": $scope.slipCheckGetSuccess[i].description
                                  };
              console.log($scope.editSlipModelCheck); 
    }
 }
 }	

 $scope.updateSlipModelCheck=function(id){
  var editSlipModelCheck={ 
                       "preventive_main_transaction":{ "list_to_check":$scope.editSlipModelCheck.list_to_check,
                                                       "description": $scope.editSlipModelCheck.description
                                                     }                        
                    };

  $http({
        method: 'put',
        url: $rootScope.api_url+'preventive_main_transaction_update?id='+id,
        data: editSlipModelCheck  
      })
      
    .success(function(data) {
        
    if(data){
    console.log(data);
    alert("Updated Successfully");
    $scope.slipinit();
    }else{      
        alert('Updation Failed');   
        }
    });
 }	

}]);