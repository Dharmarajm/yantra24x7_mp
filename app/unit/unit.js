'use strict';

angular.module('units', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/units', {
    templateUrl: 'unit/unit.html',
    controller: 'UnitCtrl'
  });
}])

.controller('UnitCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 

 //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };


 $scope.unitregistration = {id: null,
  name:"",
  detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
   website: "",
   address_one: "",
   address_two: "",
   pin_code:"",
   city:"",
   state:"",
   country:"",
   tenant_id: $scope.tenant_id};


$scope.unitForm= function(){  


        var unitregistration = {
          name:$scope.unitregistration.name,
  detail:$scope.unitregistration.detail,
  email:$scope.unitregistration.email,
  phone_one:$scope.unitregistration.phone_one,
  phone_two:$scope.unitregistration.phone_two,
   website: $scope.unitregistration.website,
   address_one: $scope.unitregistration.address_one,
   address_two: $scope.unitregistration.address_two,
   pin_code:$scope.unitregistration.pin_code,
   city:$scope.unitregistration.city,
   state:$scope.unitregistration.state,
   country:$scope.unitregistration.country,
   tenant_id: $scope.tenant_id
 };
  if ($scope.unitregistration.id== null){
   // alert($scope.unitregistration.role_id);
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'units',
        data: unitregistration  
      })
      
      .success(function(data) {
        
        if(data){
          //alert("hi");
          console.log(data);
$scope.unitregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    //$window.location.reload();
     $scope.unitinit();
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
        url: $rootScope.api_url+'units/'+$scope.unitregistration.id,
        data: unitregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.unitinit();
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }




$scope.unitinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $rootScope.units = response.data; 
   console.log($rootScope.units.id);
    })
}

  $scope.cleandata=function(){


 $scope.unitregistration = {id: null,
  name:"",
  detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
   website: "",
   address_one: "",
   address_two: "",
   pin_code:"",
   city:"",
   state:"",
   country:"",
   tenant_id: $scope.tenant_id};
$scope.unitregistration = angular.copy($scope.cleardata);
  }




    $scope.edit = function(id) {
var i;
console.log(id);
   for(i in $rootScope.units) {

            if($rootScope.units[i].id == id) {
               var unit_id=$rootScope.units[i];
               $scope.unitregistration = angular.copy(unit_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'units/'+id).success(function(data) {
        
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