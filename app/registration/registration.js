'use strict';

angular.module('registrations', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'RegistrationCtrl'
  });
}])

.controller('RegistrationCtrl', ['$scope', '$http', '$location', '$window', '$rootScope',
  function($scope,$http,$location,$window,$rootScope) {

$scope.registration = {"first_name": '',"last_name": '',"email": '',"password": '',"phone_one": '',"phone_two": '',"tenant_name": '', "website": '',"brand_name": '' ,"about_company": '',"address_one": '',"address_two": '',"city": '',"state": '',"country":'',"pincode": '',"approval_status":'active'};
$scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
$scope.signup = function(){  
  
  console.log($scope.registration);
  var registerSign = {   "user":{     
            "first_name":$scope.registration.first_name,
            "last_name":$scope.registration.last_name,
            "email":$scope.registration.email,
            "password":$scope.registration.password,
            "phone_one":$scope.registration.phone_one,
            "phone_two":$scope.registration.phone_two, 
            "address_one": $scope.registration.address_one,
            "address_two": $scope.registration.address_two,
            "city": $scope.registration.city,
            "state": $scope.registration.state, 
            "country":$scope.registration.country,
            "pincode": $scope.registration.pincode,
            "approval_status":$scope.registration.approval_status
                      },
             "tenant": {      
                      "tenant_name": $scope.registration.tenant_name,
                      "brand_name":$scope.registration.brand_name,
                      "about_company":$scope.registration.about_company,
                      "phone_one":$scope.registration.phone_one,
                      "phone_two":$scope.registration.phone_two,
                      "email":$scope.registration.email,
                      "website": $scope.registration.website,
                      "address_one": $scope.registration.address_one,
                      "address_two": $scope.registration.address_two,
                      "city": $scope.registration.city,
                      "state": $scope.registration.state, 
                      "country":$scope.registration.country,
                      "pin_code": $scope.registration.pincode
                      }
                     
           };    
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'tenants',
        data: registerSign 
      }).success(function(response) {
        if(response){
          console.log(response.data);

        alert("Thank you for registering with Yantra24X7");
        $window.location='/#!/login';
        }else{      
        alert('Registration Failed');   
        }
      });
    }

 /*$scope.emailvalidate=function(){
   //alert($scope.registration.email_id);
   $scope.errormsg="";
 $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/users/email_validation?email_id='+$scope.registration.email_id
  })
  .then(function(response){
    
   if(response.data==true){
$scope.errormsg="Email already exist!"
   } 
   
    })
}   */
}]);