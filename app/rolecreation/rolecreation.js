'use strict';

angular.module('role', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rolecreation', {
    templateUrl: 'rolecreation/rolecreation.html',
    controller: 'RolecreationCtrl'
  });
}])

.controller('RolecreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
$scope.tenant_id=localStorage.getItem('tenant_id');
$scope.roleregistration = {id: null,"name":"","type_name":"","description":"","tenant_id": $scope.tenant_id,"role_type_id":null,"reference_id":$scope.reference_id};

$scope.roleForm= function(data){

  var roleregistration = {
                             "name":$scope.roleregistration.name,
                             "tenant_id": $scope.roleregistration.tenant_id,
                             "role_type_id":$scope.roleregistration.role_type_id,
                             "reference_id":$scope.reference_id
                         };
  console.log(roleregistration);
  if ($scope.roleregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'roles',
        data: roleregistration
      })

      .success(function(data) {

        if(data){

          $scope.roleName=data;
          console.log($scope.roleName);
$scope.roleregistration="";
       
       // $state.go('/company_registration');
    alert("Registration completed");
     //$window.location.reload();
    
     $scope.rolecreationinit();
        }else{
        alert('Registration Failed');
        }
      });
    }else
    {

 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'roles/'+$scope.roleregistration.id,
        data: roleregistration
      })

      .success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
 $scope.rolecreationinit();
        }else{
        alert('Updation Failed');
        $scope.rolecreationinit();
        }
      });
    }
    }

/*app.js end*/



$scope.rolecreationinit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_roles?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   $scope.roles = response.data;

    })

$http({

    method:'GET',
    url:$rootScope.api_url+'role_types'
  })
  .then(function(response){
   $scope.role_types=response.data;
   console.log($scope.roles)
   

    })
}
  $scope.cleandata=function(){

$scope.roleregistration = {id: null,"name":"","type_name":"","description":"","tenant_id": $scope.tenant_id,"role_type_id":null,"reference_id":$scope.reference_id};
$scope.roleregistration = angular.copy($scope.cleardata);
  }

    

    $scope.edit = function(id) {
   var i;
   for(i in $scope.roles) {

            if($scope.roles[i].id == id) {
               var role_id=$scope.roles[i];
               $scope.roleregistration = angular.copy(role_id);
            }

        }

    }
/*$scope.roleType=function(id){
  console.log(id.id);

}*/

$scope.roleset=function(id){
localStorage.setItem("role_idforsetting",id);
$location.path("/rolesetting");

}

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'roles/'+id).success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
 // $window.location.reload();
     $scope.rolecreationinit();
        }else{
        alert('Delete Failed');
        }
      });
}

}

}]);
