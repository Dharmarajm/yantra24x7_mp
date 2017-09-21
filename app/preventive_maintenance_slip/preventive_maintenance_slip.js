'use strict';

angular.module('preventive_maintenance_slip', ['ngRoute','ui.calendar','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_slip', {
    templateUrl: 'preventive_maintenance_slip/preventive_maintenance_slip.html',
    controller: 'preventiveMaintenanceSlip'
  });
}])

.controller('preventiveMaintenanceSlip', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 $scope.to_date=localStorage.getItem("date");
 $scope.from_date=localStorage.getItem("date");
 /*$scope.machine_name=localStorage.getItem("name");
 console.log($scope.machine_name);*/

$scope.userget=function(){

//Get Method for getting machines

 if($scope.role_type_name=='Tenant'){

 $http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.slippageMachines = response.data;
    for(var i in $scope.slippageMachines){
          if($scope.slippageMachines[i].name==$scope.machine_name){
              $scope.name=$scope.slippageMachines[i]
              localStorage.setItem("Machine_idName",$scope.name.id)
              console.log(localStorage.getItem("Machine_idName"));
          }
    }
  
  })
 }
 else{

 $http({
    method:'GET',
    url:$rootScope.api_url+'unit_machine?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
 $scope.slippageMachines = response.data;
   for(var i in $scope.slippageMachines){
          if($scope.slippageMachines[i].name==$scope.machine_name){
              $scope.name=$scope.slippageMachines[i]
              localStorage.setItem("Machine_idName",$scope.name.id)
              console.log(localStorage.getItem("Machine_idName"));
          }
        }
  
    })

 }
  
$scope.name=localStorage.getItem("Machine_idName");
console.log($scope.name);
  $http({
         method: 'GET',
         url: $rootScope.api_url+'preventive_to_lists?from_date='+$scope.from_date+'&&to_date='+$scope.to_date+'&&machine_id='+$scope.name
       }).then(function(response){
         $scope.getSpecific=response.data;
      }) 

}
 
 $scope.status=["Completed","Inprogress"];
 
 $scope.eventCheckView=function(id){
   console.log(id);
   $http({
        method: 'GET',
        url: $rootScope.api_url+'preventive_to_transaction?preventive_maintenance_id='+id
      }).then(function(response){
        $scope.dataSlip=response.data;
        console.log($scope.dataSlip);
      })
 }
 
 $scope.click=function(from_date,to_date,machine_idName){ 
  $scope.fromId=localStorage.getItem("from_date");
  $scope.toId=localStorage.getItem("to_date");
  $scope.machine=localStorage.getItem("machine_idName");
  console.log($scope.machine);
  $http({
         method: 'GET',
         url: $rootScope.api_url+'preventive_to_lists?from_date='+$scope.fromId+'&&to_date='+$scope.toId+'&&machine_id='+$scope.machine
       }).then(function(response){
         $scope.getSpecific=response.data;
      }) 
 }

 $scope.addeventCheck=function(id){
   $scope.addslip=id;
   localStorage.setItem("addCheckSlip",$scope.addslip);
   $location.path('/preventive_maintanance_slipchecklist'); 
 }

 $scope.Eventedit=function(id){
  $scope.updateId=id;
  console.log(id);
  var i;
  for(i in $scope.getSpecific){
     if($scope.getSpecific[i].id == id){
       $scope.MainStatus={                             
                                "status":$scope.getSpecific[i].status,
                                "cause":$scope.getSpecific[i].cause
                               }
     }
    console.log($scope.MainStatus); 
  }
 }

 $scope.UpdateStatusMain=function(id){

 console.log(id);
 var MainStatus={
                 "status":$scope.MainStatus.status,
                 "cause":$scope.MainStatus.cause
                }

 $http({
        method: 'put',
        url: $rootScope.api_url+'preventive_maintenances/'+id,
        data: MainStatus  
      })
 .success(function(data) {
 if(data){
  console.log(data);
  alert("Updated Successfully");
  $scope.userget();
  }else{      
      alert('Updation Failed');   
  }
  });
 }

 $scope.eventdelete=function(id){
  console.log(id);
  if ($window.confirm("Please confirm?")) {
     $http.delete($rootScope.api_url+'preventive_maintenances/'+id).success(function(data) {
     if(data){
     alert("Deleted Successfully");
     $scope.userget();
     }else{      
           alert('Delete Failed');   
          }
     });
     }
 }


 $scope.data=function(from_date,to_date,machine_idName){
  localStorage.setItem("from_date",$scope.from_date);
  localStorage.setItem("to_date",$scope.to_date);
  localStorage.setItem("machine_idName",$scope.name.id);
  console.log(localStorage.getItem("machine_idName"));
 }

}]);