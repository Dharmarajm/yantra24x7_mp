'use strict';

angular.module('preventive_maintenance_checklist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_checklist', {
    templateUrl: 'preventive_maintenance_checklist/preventive_maintenance_checklist.html',
    controller: 'preventiveMaintenanceChecklistCtrl'
  });
}])

.controller('preventiveMaintenanceChecklistCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 $scope.preventCheckType={ "checklist_type":[
                                           {"value":"Daily"},   
                                           {"value":"Weekly"},
                                           {"value":"Monthly"}
                                           
                                          ]
                             }; 

$scope.preventive_checklist={
                             "machine_id": "",
                             "checklist_type": "",
                             "duration_from": "",
                             "duration_to": "",
                             "image_path":"" 
                            }



//Post Method for Checklist Creation

$scope.preventiveCheckCretion=function(){
	
	var preventCreate={ 
                             "machine_id":$scope.preventive_checklist.machine_id,
                             "checklist_type":$scope.preventive_checklist.checklist_type.value,
                             "duration_from":$scope.preventive_checklist.duration_from,
                             "duration_to":$scope.preventive_checklist.duration_to,
                             "image_path":$scope.preventive_checklist.image_path                               
                            };
console.log(preventCreate);
 $http({
       method:'POST',
       url: $rootScope.api_url+'preventive_maintenance_checklists',
       data: preventCreate 
      }).then(function(response){
      	$scope.preventCheckSuccess=response.data;
        $scope.userinit();
        $scope.preventive_checklist="";
      	alert("Checklist Created")
        console.log($scope.preventCheckSuccess);
      })                           
}


//Machine Name getting functions
$http({
        method: 'GET',
        url: $rootScope.api_url+'machines'
      }).then(function(response){
      	$scope.preventCheckMachines=response.data;
      }) 


//Get method for display the Checkliat data

$scope.userinit=function(){

 $http({
        method: 'GET',
        url: $rootScope.api_url+'preventive_maintenance_checklists'
      }).then(function(response){
      	$scope.preventChecklists=response.data;
      	console.log($scope.preventChecklists);
        
      })
}

 $http({
        method: 'GET',
        url: $rootScope.api_url+'preventive_maintenance_checklists'
      }).then(function(response){
        $scope.preventChecklists=response.data;
        console.log($scope.preventChecklists);
        
      })

//Edit Method for Preventive Checklist

$scope.edit = function(id) {
   
   $scope.updateCheck=id;
    
   var i;

   for(i in $scope.preventChecklists) {

            if($scope.preventChecklists[i].id == id) {
               var role_id=$scope.preventChecklists[i];
               
               
               $scope.preventiveCheckEdit ={ 
                                             "machine_id": $scope.preventChecklists[i].machine.name,
                                             "checklist_type": $scope.preventChecklists[i].checklist_type,
                                             "duration_from": $scope.preventChecklists[i].duration_from,
                                             "duration_to": $scope.preventChecklists[i].duration_to,
                                             "image_path": $scope.preventChecklists[i].image_path
                                             
                                            }
                 console.log($scope.preventiveCheckEdit);                      
               }

        }

    }

//Update functions for Checklist

$scope.preventChecklistUpdate=function(id){
  
  var preventiveCheckEdit={ 
                             "machine_id":$scope.preventiveCheckEdit.machine_id,
                             "checklist_type":$scope.preventiveCheckEdit.checklist_type,
                             "duration_from":$scope.preventiveCheckEdit.duration_from,
                             "duration_to":$scope.preventiveCheckEdit.duration_to,
                             "image_path":$scope.preventiveCheckEdit.image_path                               
                            };

  $http({
        method: 'put',
        url: $rootScope.api_url+'preventive_maintenance_checklists/'+id,
        data: preventiveCheckEdit  
      })
      
      .success(function(data) {
        
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


//Delete Method for Checklist

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'preventive_maintenance_checklists/'+id).success(function(data) {
        
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