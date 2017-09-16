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

  
 $scope.amc_detail_id=localStorage.getItem("id");

 $scope.amcTransact={"amc_detail_id": $scope.amc_detail_id, "visit_number": "", "maintenance_date": "", "reason_for_change": "", "spare_changed": "", "spare_cost": "", "amount_paid": ""};


//Post Method for creating anual maintenance

$scope.amcTransactTable=function(){
	console.log($scope.amc_detail_id);
	var amcTransact={ 
                   "amc_transaction":{
                    "visit_number": $scope.amcTransact.visit_number,
                   "maintenance_date": $scope.amcTransact.maintenance_date, 
                   "reason_for_change": $scope.amcTransact.reason_for_change, 
                   "spare_changed": $scope.amcTransact.spare_changed, 
                   "spare_cost": $scope.amcTransact.spare_cost, 
                   "amount_paid": $scope.amcTransact.amount_paid,
                   "amc_detail_id": $scope.amc_detail_id
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
        $location.path('/anual_maintenance_list');
        
      })                           
}

}]);