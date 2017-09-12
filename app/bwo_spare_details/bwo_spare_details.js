'use strict';

angular.module('bwo_spare_details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_spare_details', {
    templateUrl: 'bwo_spare_details/bwo_spare_details.html',
    controller: 'bwoSpareDetailsCtrl'
  });
}])

.controller('bwoSpareDetailsCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
  
 $scope.insertSparesRow=function(){
                var table=document.getElementById("spares");
                var rowCount = table.rows.length;
                console.log(rowCount);         
                var count = rowCount;
                var row=table.insertRow(rowCount);
                var cell1=row.insertCell(0);
                cell1.innerHTML = count;
                var cell2=row.insertCell(1);
                var t2=document.createElement("input");
                    t2.id="spareId";
                    cell2.appendChild(t2);
                var cell3=row.insertCell(2);
                var t3=document.createElement("input");
                    t3.id = "spareDescription";
                    cell3.appendChild(t3);
                var cell4=row.insertCell(3);
                var t4=document.createElement("input");
                    t4.id = "oty";
                    cell4.appendChild(t4);   
                var cell5=row.insertCell(4);
                var t5=document.createElement("input");
                    t5.id="spareCost";
                    cell5.appendChild(t5); 
                var cell6=row.insertCell(5);
                var t6=document.createElement("input");
                    t6.id="reason";
                    cell6.appendChild(t6);     
 }

}]);