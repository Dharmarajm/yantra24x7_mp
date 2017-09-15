'use strict';

angular.module('anualMaintenanceList', ['ngRoute','ui.calendar','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/anual_maintenance_list', {
    templateUrl: 'anual_maintenance_list/anual_maintenance_list.html',
    controller: 'anualMaintenanceListCtrl'
  });
}])

.controller('anualMaintenanceListCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 
 $scope.anualmaintain={ "maintenance_type":[
                                           {"value":"AMC"},   
                                           {"value":"NO AMC"},
                                           {"value":"WARRANTY"}
                                           
                                          ]
                      };
//Get Method for getting machines                      
$http({
        method: 'GET',
        url: $rootScope.api_url+'machines'
      }).then(function(response){
        $scope.anualCheckMachines=response.data;
      })                       


//Anual Maintenance list getting functions
$http({
        method: 'GET',
        url: $rootScope.api_url+'amc_details'
      }).then(function(response){
      	$scope.anualmainlist=response.data;
      })

$scope.allocationinit=function(){

$http({
        method: 'GET',
        url: $rootScope.api_url+'amc_details'
      }).then(function(response){
        $scope.anualmainlist=response.data;
      })

}      

//Edit functions for AMC list

$scope.edit = function(id) {
  var i;
 $scope.updateId=id;
   for(i in $scope.anualmainlist) {

            if($scope.anualmainlist[i].id == id) {
               var user_id=$scope.anualmainlist[i];
               
               $scope.editAmcList={
                                   "machine_id": $scope.anualmainlist[i].machine.name,
                                   "maintenance_type": $scope.anualmainlist[i].maintenance_type,
                                   "duration_from": $scope.anualmainlist[i].duration_from,
                                   "duration_to": $scope.anualmainlist[i].duration_to,
                                   "renewal_started_date": $scope.anualmainlist[i].renewal_started_date,
                                   "amount_paid": $scope.anualmainlist[i].amount_paid,
                                   "visit_per_annum": $scope.anualmainlist[i].visit_per_annum,
                                   "visit_completed": $scope.anualmainlist[i].visit_completed
                                  };
              console.log($scope.editAmcList); 
    }
 }
}

//update function for AMC

$scope.editAnuallist=function(id){
  
  var editAmcList={ 
                      "machine_id": $scope.editAmcList.machine.name,
                      "maintenance_type": $scope.editAmcList.maintenance_type,
                      "duration_from": $scope.editAmcList.duration_from,
                      "duration_to": $scope.editAmcList.duration_to,
                      "renewal_started_date": $scope.editAmcList.renewal_started_date,
                      "amount_paid": $scope.editAmcList.amount_paid,
                      "visit_per_annum": $scope.editAmcList.visit_per_annum,
                      "visit_completed": $scope.editAmcList.visit_completed                               
                    };

  $http({
        method: 'put',
        url: $rootScope.api_url+'amc_details/'+id,
        data: editAmcList  
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


//Delete functions for AMC list

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'amc_details/'+id).success(function(data) {
        
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