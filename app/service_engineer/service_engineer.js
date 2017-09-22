'use strict';

angular.module('service_engineer_master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/service_engineer', {
    templateUrl: 'service_engineer/service_engineer.html',
    controller: 'service_engineerCtrl'
  });
}])

.controller('service_engineerCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
if($scope.role_type_name == 'Tenant'){
$scope.serviceengineerregistration = {id: null,
  name:"",
  engineer_id:"",
  email:"",
  phone_one:"",
  phone_two:"",
  unit_id:null};}
  else{
$scope.serviceengineerregistration = {id: null,
  name:"",
  engineer_id:"",
  email:"",
  phone_one:"",
  phone_two:"",
  unit_id:$scope.reference_id};
}

  
$scope.seForm= function(){  
 
 
        var serviceengineerregistration = {"name":$scope.serviceengineerregistration.name,
        "engineer_id":$scope.serviceengineerregistration.engineer_id,

        "email":$scope.serviceengineerregistration.email,
        "phone_one":$scope.serviceengineerregistration.phone_one,
        "phone_two":$scope.serviceengineerregistration.phone_two,
        "unit_id": $scope.serviceengineerregistration.unit_id};
  if ($scope.serviceengineerregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'service_engineers',
        data: serviceengineerregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.serviceengineerregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
$scope.se_init();
      
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'service_engineers/'+$scope.serviceengineerregistration.id,
        data: serviceengineerregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.se_init();
       
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }

$scope.se_init=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.unit_for_se = response.data; 
  
    })
if($scope.role_type_name == 'Tenant'){
  $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_service_engineers?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.service_engineer_list= response.data; 
  
    })}else{

  $http({

    method:'GET',
    url:$rootScope.api_url+'unit_service_engineers?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
   $scope.service_engineer_list = response.data; 
  
    })}
  if($scope.role_type_name == 'Tenant'){
  $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_service_providers?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.service_provider_list= response.data; 
  
    })}else{

  $http({

    method:'GET',
    url:$rootScope.api_url+'unit_service_providers?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
   $scope.service_provider_list = response.data; 
  
    })}


}

  $scope.cleandata=function(){

$scope.cleardata=  {id: null,
  name:"",
  engineer_id:"",
  email:"",
  phone_one:"",
  phone_two:"",
  unit_id:null};
$scope.serviceengineerregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
var i;
   for(i in $scope.service_engineer_list) {

            if($scope.service_engineer_list[i].id == id) {
               //var operator_id=$scope.operators[0].operators[i];
               $scope.serviceengineerregistration =  angular.copy($scope.service_engineer_list[i]); 


             }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'service_engineers/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.seinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

	

}]);