'use strict';

angular.module('amc_transaction', ['ngRoute','ui.calendar','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/amc_transaction', {
    templateUrl: 'amc_transaction_table/amc_transaction.html',
    controller: 'amcTransactCtrl'
  });
}])

.controller('amcTransactCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

  
 $scope.AddTransactId=localStorage.getItem("addId");

 $scope.amcTransact={"amc_detail_id": $scope.AddTransactId, "visit_number": "", "maintenance_date": "", "reason_for_change": "", "spare_changed": "", "spare_cost": "", "amount_paid": ""};


//Post Method for creating anual maintenance

$scope.amcTransactTable=function(){
	console.log($scope.AddTransactId);
	var amcTransact={ 
                   "amc_transaction":{
                    "visit_number": $scope.amcTransact.visit_number,
                   "maintenance_date": $scope.amcTransact.maintenance_date, 
                   "reason_for_change": $scope.amcTransact.reason_for_change, 
                   "spare_changed": $scope.amcTransact.spare_changed, 
                   "spare_cost": $scope.amcTransact.spare_cost, 
                   "amount_paid": $scope.amcTransact.amount_paid,
                   "amc_detail_id": $scope.AddTransactId
                   }                               
                  };
console.log(amcTransact);
 $http({
       method:'POST',
       url: $rootScope.api_url+'amc_transaction_create',
       data: amcTransact 
      }).then(function(response){
      	$scope.amcTransactSuccess=response.data;
      	alert("AMC Transaction Table Created")
        
      })                           
}



$scope.trekinit=function(){

$scope.Id=localStorage.getItem("addId"); 
console.log($scope.Id);

$http({
       method:'GET',
       url: $rootScope.api_url+'amc_detail_to_transaction?amc_detail_id='+$scope.Id 
      }).then(function(response){
        $scope.amcTransactionSuccess=response.data;
      })               
}

$scope.edit = function(id) {
  var i;
 $scope.updateId=id;
 console.log($scope.updateId);
   for(i in $scope.amcTransactionSuccess) {

            if($scope.amcTransactionSuccess[i].id == id) {
              
               $scope.amcTransactdetail={
                                         "visit_number": $scope.amcTransactionSuccess[i].visit_number,
                                         "maintenance_date": $scope.amcTransactionSuccess[i].maintenance_date,
                                         "reason_for_change": $scope.amcTransactionSuccess[i].reason_for_change,
                                         "spare_changed": $scope.amcTransactionSuccess[i].spare_changed,
                                         "spare_cost": $scope.amcTransactionSuccess[i].spare_cost,
                                         "amount_paid": $scope.amcTransactionSuccess[i].amount_paid,
                                         };
              console.log($scope.amcTransactionSuccess); 
    }
 }
}

$scope.transactUpdateDetails=function(id){
  console.log(id);
  var amcTransactdetail={
                        "amc_transaction":{
                                         "visit_number": $scope.amcTransactdetail.visit_number,
                                         "maintenance_date": $scope.amcTransactdetail.maintenance_date,
                                         "reason_for_change": $scope.amcTransactdetail.reason_for_change,
                                         "spare_changed": $scope.amcTransactdetail.spare_changed,
                                         "spare_cost": $scope.amcTransactdetail.spare_cost,
                                         "amount_paid": $scope.amcTransactdetail.amount_paid 
                                        }
                        };
  $http({
        method: 'put',
        url: $rootScope.api_url+'amc_transaction_update?id='+id,
        data: amcTransactdetail  
      })
      
      .success(function(data) {
        
        if(data){
    console.log(data);
       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.trekinit();
        }else{      
        alert('Updation Failed');   
        }
      });
}


//Delete functions for AMC list

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'amc_transaction_delete?id='+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
     alert("Deleted Successfully");
      $scope.trekinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

}]);