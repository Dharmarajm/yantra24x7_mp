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
$scope.tenant_id=localStorage.getItem('tenant_id');
$rootScope.tenant_id=$scope.tenant_id;
/*$scope.role_type_id=localStorage.getItem("role_type_id");

$scope.reference_id=localStorage.getItem("reference_id");*/

 
$scope.userregistration = {
                          "id": null,
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
                          "pincode": '',
                          "approval_status":'active',
                          "role_id":null,
                          "tenant_id": $scope.tenant_id
                         };
$scope.username=localStorage.getItem("username");
$scope.userForm= function(){  

  var userregistrationform = {
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
                                   "pincode": $scope.userregistration.pincode, 
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
$scope.userregistrationform="";
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
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/users/'+$scope.userregistration.id,
        data: userregistrationform  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.userinit();
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_roles?tenant_id='+$scope.tenant_id+'&&reference_id='+$scope.reference_id+'&&role_type_id='+$scope.role_type_id
  })
  .then(function(response){
   $rootScope.role_ids = response.data; 
       console.log($rootScope.role_ids);
         $rootScope.count=$rootScope.role_ids.length
    })

$scope.userinit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'users'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.users = response.data; 
   
    })
}

  $scope.cleandata=function(){

$scope.cleardata= {id: null,first_name:"",last_name:"",email_id:"",password:"",phone_number:"", remarks: "",usertype_id: 1,approval_id: 1,role_id:null,tenant_id: $scope.tenant_id};
$scope.userregistration = angular.copy($scope.cleardata);
  }




    $scope.edit = function(id) {
var i;
   for(i in $rootScope.users) {

            if($rootScope.users[i].id == id) {
               var user_id=$rootScope.users[i];
               $scope.userregistration = angular.copy(user_id);
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