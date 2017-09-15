'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.calendar',
  'ui.bootstrap',
  'login',
  'registrations',
  'dashboard',
  'user',
  'role',
  'operator',
  'operator_allocation_master',
  'section',
  'units',
  'bwo_creation',
  'bwo_list',
  'preventive_maintenance_creation',
  'preventive_maintenance_list',
  'anualMaintenanceCreation',
  'anualMaintenanceList',
  'preventive_maintenance_checklist',
  'bwo_service_details',
  'bwo_spare_details',
  'bwo_analysis',
  'preventive_maintenance_slip',
  'myApp.view2',
  'amc_transaction'
  /*,
  'alarms',
  'client',
  
  'Maintanances', 
  'ngPercentDisplay',
  'machines',
  'report',
  'role',
  'jobpage',
  'job',
  'moment-picker',
  'shift',
  'breaktime',
  
  'operation',
  'comp',
  
  
  'rolesetting',
  
  'myApp.version'*/
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

 $routeProvider.otherwise({redirectTo: '/login'});
}])


.controller('appctrl', ['$scope', '$http','$location','$rootScope','$window',
  function($scope, $http,$location,$rootScope,$window) {


    
   

   $rootScope.api_url="http://192.168.1.52:4005/";
   //$rootScope.api_url="http://115.111.129.98:3003/";
    if (localStorage.getItem("tenant_id") !=null){
         
      $scope.CurrentDate = new Date();

       $scope.tenant_id=localStorage.getItem("tenant_id");
       $scope.tenant_name=localStorage.getItem("tenant_name");
       $scope.user_id=localStorage.getItem("userid")
       $scope.user_name=localStorage.getItem("username");
       $scope.role_id=localStorage.getItem("role_id");
       $scope.role_type_id=localStorage.getItem("role_type_id");
       $scope.role_type_name=localStorage.getItem("roletype_name");
        $scope.reference_id=localStorage.getItem("reference_id");
    }
    $scope.const=function(){
      
       $scope.tenant_id=localStorage.getItem("tenant_id");
       $scope.tenant_name=localStorage.getItem("tenant_name");
       $scope.user_id=localStorage.getItem("userid");
       $scope.user_name=localStorage.getItem("username");
       $scope.role_id=localStorage.getItem("role_id");
       $scope.role_type_id=localStorage.getItem("role_type_id");
       $scope.role_type_name=localStorage.getItem("roletype_name");
       $scope.reference_id=localStorage.getItem("reference_id");
    }

 $scope.signout = function(){  
 // alert("hi");
localStorage.clear();
alert("Logout Successfully");
 $window.location="/#!/login";
  }

$scope.pageverification=function(url){
 $window.location="/#!/rolecreation";
}



/*
$scope.useredit= function(){  
  
$scope.profile_edit=angular.copy($rootScope.userbyid);
}
$scope.profile_edit = {id: null,first_name:"",last_name:"",email_id:"",password:"",phone_number:"", remarks: "",usertype_id: 1,approval_id: 1,role_id:null,tenant_id: $scope.tenant_id};
$scope.usrid=$scope.useridforedit;
$scope.usereditForm= function(){  
 
 
        var profile_edit = {first_name:$scope.profile_edit.first_name,last_name:$scope.profile_edit.last_name,email_id:$scope.profile_edit.email_id,password:$scope.profile_edit.password,phone_number:$scope.profile_edit.phone_number, remarks: $scope.profile_edit.remarks,usertype_id:$scope.profile_edit.usertype_id,approval_id:$scope.profile_edit.approval_id,role_id:$scope.profile_edit.role_id,tenant_id: $scope.tenant_id};
  
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/users/'+$scope.profile_edit.id,
        data: profile_edit  
      })
      
      .success(function(data) {
        
        if(data){
localStorage.setItem("username",data.first_name);
$scope.username=data.first_name;
       // $state.go('/company_registration');
alert("Updated Successfully");
      $window.location.reload();
        }else{      
        alert('Updation Failed');   
        }

      });

}*/
}])

.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick;// || "Are you sure?";
                   var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]);



