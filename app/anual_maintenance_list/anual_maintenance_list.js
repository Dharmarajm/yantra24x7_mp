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

 $scope.model = {
    isDisabled: true
};

 
 $scope.anualmaintain=["AMC","NO AMC","WARRANTY"];
$scope.new_amc=function(){

  $location.path('/anual_maintenance_creation');
}

$scope.allocationinit=function(){

//Get Method for getting machines                      

if($scope.role_type_name=='Tenant'){

$http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.anualCheckMachines = response.data;
   
  
    })
}//if block end
else{

$http({
    method:'GET',
    url:$rootScope.api_url+'unit_machine?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
$scope.anualCheckMachines = response.data;
   
  
    })

}               

if($scope.role_type_name=='Tenant'){

$http({
        method: 'GET',
        url: $rootScope.api_url+'tenant_amc_details?tenant_id='+$scope.tenant_id
      }).then(function(response){
        $scope.anualmainlist=response.data;
        console.log($scope.anualmainlist);
      })

}else{
  $http({
        method: 'GET',
        url: $rootScope.api_url+'unit_amc_details?unit_id='+$scope.reference_id
      }).then(function(response){
        $scope.anualmainlist=response.data;
        console.log($scope.anualmainlist);
      })
}
}
//Edit functions for AMC list

$scope.edit = function(id) {
  var i;
 $scope.updateId=id;
 console.log($scope.updateId);
   for(i in $scope.anualmainlist) {

            if($scope.anualmainlist[i].id == id) {
              
               $scope.editAmcList={
                                   "machine_id": $scope.anualmainlist[i].machine.id,
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

//Add Transaction for AMC

$scope.add=function(id){
 $scope.addTransactId=id;
 localStorage.setItem("addId",$scope.addTransactId);
 $location.path('/amc_transaction');
}

//update function for AMC

$scope.updateAnuallist=function(id){
  
  var editAmcList={ 
                      "machine_id": $scope.editAmcList.machine_id,
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
    $scope.allocationinit();
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
      $scope.allocationinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

}]);