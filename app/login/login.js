'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
 
   $scope.email = {
        text: 'me@example.com'
      };
    $scope.login = {email_id :"", password :""};  

    $scope.signin = function(){ 
        
      var login=
      {
        "email":$scope.login.email_id,
        "password":$scope.login.password
      }
            
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'users/login',
        data: login  
      })
      
      .success(function(data) {
        if(data){
           
  alert('Welcome your login was successful'); 
      
       // $state.go('/company_registration');
       localStorage.setItem("tenant_id",data.tenant_id);
       localStorage.setItem("userid",data.id)
       localStorage.setItem("username",data.first_name);
       localStorage.setItem("role_id",data.role_id);
       //alert( localStorage.getItem("tenant_id"));
       $scope.const();
         $window.location='/#!/dashboard'; 
        }else{      
           
        alert('The username or password is incorrect');   
        }
      });
    

    }
/*start registration*/
   
  
}])