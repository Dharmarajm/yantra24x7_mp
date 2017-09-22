'use strict';

angular.module('service_provider', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/service_provider', {
    templateUrl: 'service_provider/service_provider.html',
    controller: 'service_providerCtrl'
  });
}])

.controller('service_providerCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
if($scope.role_type_name == 'Tenant'){
$scope.serviceproviderregistration = {id: null,
  vendor_name:"",
  vendor_detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
  website:"",
  address_one:"",
  address_two:"",
  city:"",
  state:"",
  country:"",
  unit_id:null};
}
  else{
$scope.serviceproviderregistration = {id: null,
  vendor_name:"",
  vendor_detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
  website:"",
  address_one:"",
  address_two:"",
  city:"",
  state:"",
  country:"",
  unit_id:$scope.reference_id};
}

  
$scope.seForm= function(){  
 


var serviceproviderregistration = {  "vendor_name":$scope.serviceproviderregistration.vendor_name,
  "vendor_detail":$scope.serviceproviderregistration.vendor_detail,
  "email":$scope.serviceproviderregistration.email,
  "phone_one":$scope.serviceproviderregistration.phone_one,
  "phone_two":$scope.serviceproviderregistration.phone_two,
  "website":$scope.serviceproviderregistration.website,
  "address_one":$scope.serviceproviderregistration.address_one,
  "address_two":$scope.serviceproviderregistration.address_two,
  "city":$scope.serviceproviderregistration.city,
  "state":$scope.serviceproviderregistration.state,
  "country":$scope.serviceproviderregistration.country,
  "unit_id":$scope.serviceproviderregistration.unit_id
};


  if ($scope.serviceproviderregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'service_providers',
        data: $scope.serviceproviderregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.serviceproviderregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
$scope.sp_init();
      
       $(document).ready(function () {
   $('#serviceprovider').modal('hide');
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
        url: $rootScope.api_url+'service_providers/'+$scope.serviceproviderregistration.id,
        data: $scope.serviceproviderregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.sp_init();
       
       $(document).ready(function () {
   $('#serviceprovider').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }

$scope.sp_init=function(){
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
  console.log($scope.service_provider_list);
    })}


}

  $scope.cleandata=function(){

$scope.cleardata={id: null,
  vendor_name:"",
  vendor_detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
  website:"",
  address_one:"",
  address_two:"",
  city:"",
  state:"",
  country:"",
  unit_id:$scope.reference_id};

$scope.serviceproviderregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
var i;
   for(i in $scope.service_provider_list) {

            if($scope.service_provider_list[i].id == id) {
               //var operator_id=$scope.operators[0].operators[i];
               $scope.serviceproviderregistration =  angular.copy($scope.service_provider_list[i]); 


             }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'service_providers/'+id).success(function(data) {
        
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