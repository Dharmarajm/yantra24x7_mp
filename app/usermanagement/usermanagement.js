'use strict';

angular.module('user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usermanagement', {
    templateUrl: 'usermanagement/usermanagement.html',
    controller: 'UserCtrl'
  });
}])

.controller('UserCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 
 //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };
  $scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/*$scope.role_type_id=localStorage.getItem("role_type_id");

$scope.reference_id=localStorage.getItem("reference_id");*/

 $scope.user_reference_id;
 $scope.role_type;
$scope.userregistration = {
                          "id":null,
                          "first_name": '',
                          "last_name": '',
                          "email": '',
                          "password": '',
                          "phone_one": '',
                          "phone_two": '',
                          "adhar_card_no": '',
                          "driving_license_no": '',
                          "acc_no": '',
                          "acc_name": '',
                          "bank_name": '',
                          "branch_name": '',
                          "ifsc_code": '',
                          "addtional_detail":'',
                          "address_one": '',
                          "address_two": '',
                          "city": '',
                          "state": '',
                          "country":'',
                          "pin_code": '',
                          "approval_status":'active',
                          "role_id":null,
                          "tenant_id": $scope.tenant_id
                         };
$scope.userForm= function(){  

  var userregistration = {
                              "user":{ 
                                   
                                   "first_name":$scope.userregistration.first_name,
                                   "last_name":$scope.userregistration.last_name,
                                   "email":$scope.userregistration.email,
                                   "password":$scope.userregistration.password,
                                   "phone_one": $scope.userregistration.phone_one,
                                   "phone_two": $scope.userregistration.phone_two,
                                   "addtional_detail":$scope.userregistration.addtional_detail,
                                   "address_one": $scope.userregistration.address_one,
                                   "address_two": $scope.userregistration.address_two,
                                   "city": $scope.userregistration.city,
                                   "state": $scope.userregistration.state,
                                   "country":$scope.userregistration.country,
                                   "pin_code": $scope.userregistration.pin_code, 
                                   "usertype_id":$scope.userregistration.usertype_id,
                                   "approval_status":$scope.userregistration.approval_status,
                                   "role_id":$scope.userregistration.role_id,
                                   "tenant_id": $scope.tenant_id
                                   },

                              "user_detail":{     
                                   "adhar_card_no": $scope.userregistration.adhar_card_no,
                                   "driving_license_no": $scope.userregistration.driving_license_no,
                                   "acc_no": $scope.userregistration.acc_no,
                                   "acc_name": $scope.userregistration.acc_name,
                                   "bank_name": $scope.userregistration.bank_name,
                                   "branch_name": $scope.userregistration.branch_name,
                                   "ifsc_code": $scope.userregistration.ifsc_code,
                                   }
                            };
  
  if ($scope.userregistration.id== null){
   // alert($scope.userregistration.role_id);
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'users',
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){
          //alert("hi");
$scope.userregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    //$window.location.reload();
     $scope.userinit();
     $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
  }
  else{

$http({
        method: 'put',
        url: $rootScope.api_url+'users/'+id,
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){
    console.log(data);
       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.userinit();
        }else{      
        alert('Updation Failed');   
        }
      });


  }

}    
      
 

$scope.userUpdateForm=function(id){
 
 var userregistration = {
                                "user":{ 
                                   "first_name":$scope.userregistration.first_name,
                                   "last_name":$scope.userregistration.last_name,
                                   "email":$scope.userregistration.email,
                                   "password":$scope.userregistration.password,
                                   "phone_one": $scope.userregistration.phone_one,
                                   "phone_two": $scope.userregistration.phone_two,
                                   "addtional_detail":$scope.userregistration.addtional_detail,
                                   "address_one": $scope.userregistration.address_one,
                                   "address_two": $scope.userregistration.address_two,
                                   "city": $scope.userregistration.city,
                                   "state": $scope.userregistration.state,
                                   "country":$scope.userregistration.country,
                                   "pin_code": $scope.userregistration.pin_code, 
                                   "usertype_id":$scope.userregistration.usertype_id,
                                   "approval_status":$scope.userregistration.approval_status,
                                   "role_id":$scope.userregistration.role_id,
                                   "tenant_id": $scope.tenant_id
                                   },
                       "user_detail":{     
                                    "adhar_card_no": $scope.userregistration.adhar_card_no,
                                    "driving_license_no": $scope.userregistration.driving_license_no,
                                    "acc_no": $scope.userregistration.acc_no,
                                    "acc_name": $scope.userregistration.acc_name,
                                    "bank_name": $scope.userregistration.bank_name,
                                    "branch_name": $scope.userregistration.branch_name,
                                    "ifsc_code": $scope.userregistration.ifsc_code
                                   }
                                  
                            };
                        
 $http({
        method: 'put',
        url: $rootScope.api_url+'users/'+id,
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){
    console.log(data);
       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.userinit();
        }else{      
        alert('Updation Failed');   
        }
      });

    
}

$scope.userinit=function(){
  $scope.roletype;

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_users?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $rootScope.users = response.data; 
   
    })



 $http({

    method:'GET',
    url:$rootScope.api_url+'roletype_selection?type_name='+$scope.role_type_name
  })
  .then(function(response){
   $scope.role_types_for_user= response.data;         //role type dispaly based on user login
console.log($scope.role_types_for_user);
    })







/*


$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_roles?tenant_id='+$scope.tenant_id+'&&reference_id='+$scope.reference_id+'&&role_type_id='+$scope.role_type_id
  })
  .then(function(response){
   $rootScope.role_ids = response.data; 
       console.log($rootScope.role_ids);
         $rootScope.count=$rootScope.role_ids.length
    })
}
*/
}

$scope.dropdown_open=function(roletype){

if(roletype == 1){

  $scope.show_role=true;
  $scope.show_unit=false;
  $scope.show_role_unit=false;
  $scope.section_show_user=false;
   $scope.show_role_section=false;

alert(roletype);

$http({

    method:'GET',
    url:$rootScope.api_url+'roles_tenant?tenant_id='+$scope.tenant_id+'&&role_type_id='+roletype
  })
  .then(function(response){
   $scope.role_ids = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })
}//if close
else if(roletype == 2){
  $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.units_for_user = response.data; 
      })

$scope.show_role=false;
$scope.show_unit=true;
$scope.show_role_unit=false;
$scope.section_show_user=false;
 $scope.show_role_section=false;

}
else{
    $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.units_for_user = response.data; 
      })
$scope.show_role=false;
$scope.show_unit=true;
$scope.show_role_unit=false;
$scope.section_show_user=false;
 $scope.show_role_section=false;
}





}


$scope.select_unit_user=function(reference_id){
if($scope.role_type == 2){
    $scope.show_role=false;
    $scope.show_role_unit=true;
    $scope.show_role_section=false;
    $http({

      method:'GET',
      url:$rootScope.api_url+'role_type_base_roles?tenant_id='+$scope.tenant_id+'&&role_type_id=2&&reference_id='+reference_id
     })
    .then(function(response){
    $scope.role_ids = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })}
    else{
    $http({

    method:'GET',
    url:$rootScope.api_url+'unit_section?unit_id='+reference_id
  })
  .then(function(response){
    
   $scope.section_for_user = response.data; 
      })
$scope.section_show_user=true;
 $scope.show_role_section=false;
}
  
}
$scope.select_section=function(reference_id){
   $scope.show_role_section=true;
$http({

      method:'GET',
      url:$rootScope.api_url+'role_type_base_roles?tenant_id='+$scope.tenant_id+'&&role_type_id=3&&reference_id='+reference_id
     })
    .then(function(response){
    $scope.role_ids = response.data; 
       //console.log($rootScope.role_ids);
       //  $rootScope.count=$rootScope.role_ids.length
    })

}







  $scope.cleandata=function(){

$scope.cleardata= {
                          "id":null,
                          "first_name": '',
                          "last_name": '',
                          "email": '',
                          "password": '',
                          "phone_one": '',
                          "phone_two": '',
                          "adhar_card_no": '',
                          "driving_license_no": '',
                          "acc_no": '',
                          "acc_name": '',
                          "bank_name": '',
                          "branch_name": '',
                          "ifsc_code": '',
                          "addtional_detail":'',
                          "address_one": '',
                          "address_two": '',
                          "city": '',
                          "state": '',
                          "country":'',
                          "pin_code": '',
                          "approval_status":'active',
                          "role_id":null,
                          "tenant_id": $scope.tenant_id
                         };
$scope.userregistration = angular.copy($scope.cleardata);
  }




$scope.edit = function(id) {
  var i;
  $scope.updateId=id;
  console.log(id);
   for(i in $rootScope.users) {

            if($rootScope.users[i].id == id) {
               var user_id=$rootScope.users[i];
               
               $scope.userregistration ={ 
"id":$rootScope.users[i].id,
                "first_name":$rootScope.users[i].first_name,
                                          "last_name":$rootScope.users[i].last_name,
                                          "email":$rootScope.users[i].email,
                                          "password":$rootScope.users[i].password,
                                          "phone_one": $rootScope.users[i].phone_one,
                                          "phone_two": $rootScope.users[i].phone_two,
                                          "addtional_detail":$rootScope.users[i].addtional_detail,
                                          "address_one": $rootScope.users[i].address_one,
                                          "address_two": $rootScope.users[i].address_two,
                                          "city": $rootScope.users[i].city,
                                          "state": $rootScope.users[i].state,
                                          "country":$rootScope.users[i].country,
                                          "pin_code": $rootScope.users[i].pin_code,
                                          "role_id":$rootScope.users[i].role_id,                                         
                                          "approval_status":$rootScope.users[i].approval_status,
                                          "tenant_id": $rootScope.users[i].tenant_id,    
                                          "adhar_card_no": $rootScope.users[i].user_detail.adhar_card_no,
                                          "driving_license_no": $rootScope.users[i].user_detail.driving_license_no,
                                          "acc_no": $rootScope.users[i].user_detail.acc_no,
                                          "acc_name": $rootScope.users[i].user_detail.acc_name,
                                          "bank_name": $rootScope.users[i].user_detail.bank_name,
                                          "branch_name": $rootScope.users[i].user_detail.branch_name,
                                          "ifsc_code": $rootScope.users[i].user_detail.ifsc_code
                                         
                                        }
                                        $http({

      method:'GET',
      url:$rootScope.api_url+'user_role_edit?role_id='+$rootScope.users[i].role_id})
    .then(function(response){
    $scope.role_ids = response.data; 
     $scope.role_type=$scope.role_ids[0].role_type_id
    })
           
        }
    }
 }   

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'users/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      $scope.userinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}
}]);