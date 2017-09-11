'use strict';

angular.module('operator_allocation_master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/operator_allocation', {
    templateUrl: 'operator_allocation/operator_allocation.html',
    controller: 'OperatorallocationmasterCtrl'
  });
}])

.controller('OperatorallocationmasterCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
$scope.operatorassignregistration = {
                                      "id": null,
                                      "operator_id":null,
                                      "machine_id":null,
                                      "shift_id": null,
                                      "description":"",
                                    };

$scope.operatorForm= function(){  
         var operatorassignregistration ={ 
                                          "operator_allocation":{
                                                "operator_id":$scope.operatorassignregistration.operator_id,
                                                "machine_id":$scope.operatorassignregistration.machine_id,
                                                "shift_id": $scope.operatorassignregistration.shift_id,
                                                "description":$scope.operatorassignregistration.description
                                                
                                           }
                                         }; 
  if ($scope.operatorassignregistration.id== null){
    console.log($scope.operatorassignregistration.id);
      $http({
        method: 'post',
        url: $rootScope.api_url+'operator_allocations_create',
        data: operatorassignregistration  
      })
      
      .success(function(data) {
        
        if(data){
          console.log(data);
$scope.operatorassignregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    
$scope.allocationinit();
      
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }
 }

$scope.operatorUpdateForm=function(id){
  var operatorassignregistration ={ 
                                   "operator_allocation":{
                                                "operator_id":$scope.operatorassignregistration.operator_id,
                                                "machine_id":$scope.operatorassignregistration.machine_id,
                                                "shift_id": $scope.operatorassignregistration.shift_id,
                                                "description":$scope.operatorassignregistration.description
                                                
                                    }
                                  }; 
console.log(operatorassignregistration);
  $http({
        method: 'put',
        url: $rootScope.api_url+'operator_allocations_update?id='+id,
        data: operatorassignregistration  
      })
      
      .success(function(data) {
        console.log(data);
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.allocationinit();
      
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });
}


$scope.allocationinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'unit_sections_machine_and_operators?unit_id='+3
  })
  .then(function(response){
    
   $scope.operator_alls = response.data; 
   console.log($scope.operator_alls);
   
    })
$http({

    method:'GET',
    url:$rootScope.api_url+'operator_allocations'
  })
  .then(function(response){
    
   $scope.operator_alllist = response.data; 
   console.log($scope.operator_alllist);
   
    })

  
}



  $scope.cleandata=function(){

$scope.cleardata=  {
                    "id": null,
                    "operator_id":null,
                    "machine_id":null,
                    "shift_id": null,
                    "description":"",
                   };
$scope.operatorassignregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
   $scope.updateId=id;
   var i;
   for(i in $scope.operator_alllist) {
              
            if($scope.operator_alllist[i].id == id) {
              
               var operator_id= {                                   
                                  "operator_id":$scope.operator_alllist[i].operator.id,
                                  "machine_id":$scope.operator_alllist[i].machine.id,
                                  "shift_id": $scope.operator_alllist[i].shift.id,
                                  "description":$scope.operator_alllist[i].description 
                                    
                                };  

               $scope.operatorassignregistration = angular.copy(operator_id);
               
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'operator_allocations_delete?id='+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.allocationinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}


}]);