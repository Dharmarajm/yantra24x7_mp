'use strict';

angular.module('section', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sections', {
    templateUrl: 'section/section.html',
    controller: 'SectionCtrl'
  });
}])

.controller('SectionCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 
 //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };

 $scope.sectionregistration = {id: null,
  name:"",
  detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
  unit_id: null};


$scope.sectionForm= function(){  


        var sectionregistration = {
          name:$scope.sectionregistration.name,
  detail:$scope.sectionregistration.detail,
  email:$scope.sectionregistration.email,
  phone_one:$scope.sectionregistration.phone_one,
  phone_two:$scope.sectionregistration.phone_two,
  
   unit_id: $scope.sectionregistration.unit_id
 };
  if ($scope.sectionregistration.id== null){
   // alert($scope.sectionregistration.role_id);
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'sections',
        data: sectionregistration  
      })
      
      .success(function(data) {
        
        if(data){
          //alert("hi");
$scope.sectionregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    //$window.location.reload();
     $scope.sectioninit();
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
        url: $rootScope.api_url+'sections/'+$scope.sectionregistration.id,
        data: sectionregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.sectioninit();
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }





$scope.sectioninit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_unit?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $rootScope.units = response.data; 
   $rootScope.count = $rootScope.units.count
    })
  $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_section?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $rootScope.sections = response.data; 
   
    })
}

  $scope.cleandata=function(){


 $scope.sectionregistration = {id: null,
  name:"",
  detail:"",
  email:"",
  phone_one:"",
  phone_two:"",
   website: "",
  unit_id:null};
$scope.sectionregistration = angular.copy($scope.cleardata);
  }

/*$scope.showdetails = function(id){

         var i=0;
    var len=$rootScope.count;
    
    for (; i<len; i++) {
      if ($rootScope.units[i].id == id) {
      
       return $rootScope.units[i].role_name;
      
      }
    }
         
     }*/


    $scope.edit = function(id) {
var i;
   for(i in $rootScope.sections) {
   
for(var j in $rootScope.sections[i].sections){
   //alert($rootScope.sections[i].sections[j].id);
            if($rootScope.sections[i].sections[j].id == id) {

               var section_id=$rootScope.sections[i].sections[j];
               $scope.sectionregistration = angular.copy(section_id);
            }
           }
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'sections/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      $scope.sectioninit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}
}]);