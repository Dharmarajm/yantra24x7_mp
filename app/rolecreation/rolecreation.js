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
 
$scope.roleregistration = {id: null,name:"",role_type_id: "",reference_id:null,tenant_id: $scope.tenant_id};

if($scope.role_type_name == 'Tenant'){
$scope.role_type_id_for_list=1;

}
else{
$scope.role_type_id_for_list=2;  
}
$scope.roleForm= function(){


        var roleregistration = {"name":$scope.roleregistration.name,
        "role_type_id":$scope.roleregistration.role_type_id.id,
        "reference_id":$scope.roleregistration.reference_id,
        "tenant_id": $scope.roleregistration.tenant_id};
  if ($scope.roleregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'roles',
        data: roleregistration
      })

      .success(function(data) {

        if(data){
$scope.roleregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
     
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


if($scope.role_type_name == 'Tenant'){
$http({

    method:'GET',
    url:$rootScope.api_url+'roles_tenant?tenant_id='+$scope.tenant_id+'&&role_type_id='+1
  })
  .then(function(response){
   $scope.roles = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })
}else{

$http({

      method:'GET',
      url:$rootScope.api_url+'role_type_base_roles?tenant_id='+$scope.tenant_id+'&&role_type_id=2&&reference_id='+$scope.reference_id
     })
    .then(function(response){
    $scope.roles = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })

}




  //tenant_roles_display?tenant_id=
  $http({

    method:'GET',
    url:$rootScope.api_url+'roletype_selection?type_name='+$scope.role_type_name
  })
  .then(function(response){
   $scope.role_types= response.data;

    })

/*unit api*/


$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $rootScope.units = response.data; 
      })
/*sections api*/
}


$scope.dropdown_open1=function(type){
  if(type == 2){
    $scope.section_show_unit=false;
$http({

      method:'GET',
      url:$rootScope.api_url+'role_type_base_roles?tenant_id='+$scope.tenant_id+'&&role_type_id=2&&reference_id='+$scope.reference_id
     })
    .then(function(response){
    $scope.roles = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })

  }else{

$http({

    method:'GET',
    url:$rootScope.api_url+'unit_section?unit_id='+units
  })
  .then(function(response){
    
   $scope.section_for_user = response.data; 
      })
  $scope.section_show_unit=true;


  }
}




$scope.dropdown_roletype=function(type){

if(type == 1){
  $scope.unit_show_role=false;
  $scope.section_show_role=false;
$http({

    method:'GET',
    url:$rootScope.api_url+'roles_tenant?tenant_id='+$scope.tenant_id+'&&role_type_id='+1
  })
  .then(function(response){
   $scope.roles = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })

}else if(type == 2){

 $scope.unit_show_role=true;
  $scope.section_show_role=false;
   $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.units_for_user = response.data; 
      })

}else{
 $scope.unit_show_role=true;
  $scope.section_show_role=false;

}



}

$scope.select_unit_user=function(units){

  if($scope.role_type_id_for_list == 2){
  $http({

      method:'GET',
      url:$rootScope.api_url+'role_type_base_roles?tenant_id='+$scope.tenant_id+'&&role_type_id=2&&reference_id='+units
     })
    .then(function(response){
    $scope.roles = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })

  }else{

    
$http({

    method:'GET',
    url:$rootScope.api_url+'unit_section?unit_id='+units
  })
  .then(function(response){
    
   $scope.section_for_user = response.data; 
      })
   $scope.section_show_role=true;
  }
}




$scope.select_section=function(section_for_list){
$http({

      method:'GET',
      url:$rootScope.api_url+'role_type_base_roles?tenant_id='+$scope.tenant_id+'&&role_type_id=3&&reference_id='+section_for_list
     })
    .then(function(response){
    $scope.roles = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })


}






$scope.unit_drop_method=function(type){

if($scope.role_type_name == "Tenant"){

if(type.type_name == 'Unit')
{
  $scope.levels=true;
  $scope.section_show=true;
   $scope.section_show=false;
 }else if(type.type_name =='Section'){
  $scope.levels=true;
  $scope.section_show=true;
}else
{
  $scope.roleregistration.reference_id=$scope.reference_id;

  $scope.levels=false;
  $scope.section_show=false;
}
}else{
if(type.type_name == 'Unit'){
$scope.roleregistration.reference_id=$scope.reference_id;

}else{
$scope.select_unit($scope.reference_id);
$scope.section_show=true;
}

}




}



$scope.select_unit=function(reference_id){


var i;
   for(i in $scope.units) {

            if($scope.units[i].id == reference_id) {
               
               $scope.sections_value = $scope.units[i].sections;
            }

        }

}

  $scope.cleandata=function(){

$scope.cleardata= {id: null,name:"",role_type_id: "",reference_id:$scope.reference_id,tenant_id: $scope.tenant_id};

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
