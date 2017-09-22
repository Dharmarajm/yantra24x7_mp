'use strict';

angular.module('operator_master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/operator_masters', {
    templateUrl: 'operator_master/operator_master.html',
    controller: 'OperatormasterCtrl'
  });
}])

.controller('OperatormasterCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

$scope.operatorregistration = {id: null,
  name:"",
  operator_id:"",
  section_id:null};
$scope.operatorForm= function(){  
 
 
        var operatorregistration = {"name":$scope.operatorregistration.name,
        "operator_id":$scope.operatorregistration.operator_id,
        "section_id": $scope.operatorregistration.section_id};
  if ($scope.operatorregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'operators',
        data: operatorregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.operatorregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
$scope.operatorinit();
      
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
        url: $rootScope.api_url+'operators/'+$scope.operatorregistration.id,
        data: operatorregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.operatorinit();
       
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }

$scope.operatorinit=function(){

if($scope.role_type_name == 'Tenant'){

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_operators?tenant_id='+$scope.tenant_id
  })
  .then(function(response){

   $scope.operators = response.data; 
   
    })
}else{

$http({

    method:'GET',
    url:$rootScope.api_url+'unit_operators?unit_id='+$scope.unit_id
  })
  .then(function(response){

   $scope.operators = response.data; 
   
    })

}
if($scope.role_type_name == 'Tenant'){

 $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_section?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    $scope.sections_details=[]
   $rootScope.section_for_machine= response.data; 

   for(var i in $rootScope.section_for_machine){

    for(var j in $rootScope.section_for_machine[i].sections){
       var temp={id:$rootScope.section_for_machine[i].sections[j].id,
        name:$rootScope.section_for_machine[i].name+"-"+$rootScope.section_for_machine[i].sections[j].name};
 $scope.sections_details.push(temp);

    }

   }

   
    })
}else{


 $http({

    method:'GET',
    url:$rootScope.api_url+'unit_section?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
   $scope.sections_details = response.data; 
      })

}







}

  $scope.cleandata=function(){

$scope.cleardata=   {id: null,
  name:"",
  operator_id:"",
  section_id:null};
$scope.operatorregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
var i;
   for(i in $scope.operators) {

            if($scope.operators[i].id == id) {
               //var operator_id=$scope.operators[0].operators[i];
               $scope.operatorregistration =  {id: $scope.operators[i].id,
  name:$scope.operators[i].name,
  operator_id:$scope.operators[i].operator_id,
  section_id:$scope.operators[i].section.id};            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'operators/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.operatorinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

	

}]);