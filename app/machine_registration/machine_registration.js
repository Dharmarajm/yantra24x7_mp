'use strict';

angular.module('machine_reg', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/machine_registration', {
    templateUrl: 'machine_registration/machine_registration.html',
    controller: 'Machine_registrationCtrl'
  });
}])

.controller('Machine_registrationCtrl', ['$scope', '$http','$location','$rootScope','$window',
  function($scope, $http,$location,$rootScope,$window,DTOptionsBuilder) {
//$scope.myUrl = $location.absUrl();

$scope.machineregistration = {id: null,
 
name: "", 
  machine_id: "", 
  type: "",
  controller_name: "", 
  controller_model:"", 
  serial_number: "", 
  ip: "", 
  manufacture_year: "", 
  manufacture_name: "", 
  section_id: null};




 $scope.newmachine = function(){  
  
        var machineregistration = {

"name": $scope.machineregistration.name, 
  "machine_id": $scope.machineregistration.machine_id, 
  "machine_type":$scope.machineregistration.type,
  "controller_name":$scope.machineregistration.controller_name, 
  "controller_model":$scope.machineregistration.controller_model, 
  "serial_number": $scope.machineregistration.serial_number, 
  "ip":$scope.machineregistration.ip, 
  "manufacture_year": $scope.machineregistration.manufacture_year, 
  "manufacture_name": $scope.machineregistration.manufacture_name, 
  "section_id": $scope.machineregistration.section_id};


     
      if ($scope.machineregistration.id== null){
       // alert(machineregistration.machine_ip);
      $http({
        method: 'post',
        url: $rootScope.api_url+'machines',
        data: machineregistration  
      })
      
      .success(function(data) {    
        if(data){
       
      alert("Registration completed");
      //$window.location.reload();
      $scope.machineinit();
      $(document).ready(function () {
   $('#machine').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }
    else
    {
     
$http({
        method: 'put',
        url: $rootScope.api_url+'machines/'+$scope.machineregistration.id,
        data: machineregistration  
      })
      
      .success(function(data) {  
        if(data){    
        alert("Updated Successfully");
       // $window.location.reload();
       $scope.machineinit();
       $(document).ready(function () {
   $('#machine').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });
    }
    }


/*app.js end*/
$scope.machineinit=function(){
$http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $rootScope.machines = response.data;
   
  
    })


    $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_section?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    $scope.sections_details=[]
   $rootScope.section_for_machine= response.data; 

   for(var i in $rootScope.section_for_machine){

    for(var j in $rootScope.section_for_machine[i].sections){
       var temp={id:$rootScope.section_for_machine[i].sections[j].id,
        name:$rootScope.section_for_machine[i].name+"-"+$rootScope.section_for_machine[i].sections[j].name};
 $scope.sections_details.push(temp);

    }

   }

   
    })

}
$scope.cleandata= function(id) {
  $scope.machineregist = {id: null,machine_name:"",machine_model:"",machine_serial_no:"",machine_type:"",machine_ip:"",tenant_id: null};
 $scope.machineregistration = angular.copy($scope.machineregist);

    }


  //tableedit 
    $scope.edit = function(id) {
   var i;
   for(i in $rootScope.machines) {

            if($rootScope.machines[i].id == id) {
               var machine_id=$rootScope.machines[i];
               $scope.machineregistration = angular.copy(machine_id);
            }
           
        }
    }//editend
/*$scope.newQuote=function(){


alert("hi");
}*/
//delete table
$scope.delete = function(id) {

$http.delete($rootScope.api_url+'machines/'+id).success(function(data) {
        
        if(data){

      alert("Deleted Successfully");
      //$window.location.reload();
      $scope.machineinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}//end

}]);