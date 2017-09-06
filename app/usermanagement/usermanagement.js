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
  $scope.emailFormat = '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/';    
$scope.tenant_id=localStorage.getItem('tenant_id');
$rootScope.tenant_id=$scope.tenant_id;
/*$scope.role_type_id=localStorage.getItem("role_type_id");

$scope.reference_id=localStorage.getItem("reference_id");*/

 
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
$scope.username=localStorage.getItem("username");
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
        data: userregistrationform  
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

}    
      
 

$scope.userUpdateForm=function(){
 var userregistration = {
                                 
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
                                   "tenant_id": $scope.tenant_id,
                                   
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
          console.log($scope.userregistration.user_detail);                  
 $http({
        method: 'put',
        url: $rootScope.api_url+'users/'+$scope.userregistration.id,
        data: userregistration  
      })
      
      .success(function(data) {
        console.log($scope.success=data);
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

$http({

    method:'GET',
    url:$rootScope.api_url+'users'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.users = response.data; 
   
    })

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




$scope.edit = function(id,user_id) {
  var i;
  console.log(id,user_id);
  
   for(i in $rootScope.users) {

            if($rootScope.users[i].id == id) {
               var user_id=$rootScope.users[i];
               console.log($rootScope.users[i])
               $scope.userregistration = angular.copy(user_id);
               console.log($rootScope.users[i]);
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