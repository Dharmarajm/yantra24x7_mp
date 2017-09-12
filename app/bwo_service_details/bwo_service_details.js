'use strict';

angular.module('bwo_service_details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_service_details', {
    templateUrl: 'bwo_service_details/bwo_service_details.html',
    controller: 'bwoServiceDetailsCtrl'
  });
}])

.controller('bwoServiceDetailsCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
 
    
    $scope.insertServiceRow=function(tableID){
                var table=document.getElementById("bwoService");
                var rowCount = table.rows.length;
                console.log(rowCount);         
                var count = rowCount;
                var row=table.insertRow(rowCount);
                var cell1=row.insertCell(0);
                cell1.innerHTML = count;
                var cell2=row.insertCell(1);
                var t2=document.createElement("select");
                    /*for (var i = 0; i < arraylist.length; i++) {
                       var option = document.createElement("option");
                       option.value = arraylist[i];
                       option.text = arraylist[i];
                       t2.appendChild(option);
                    }*/
                    cell2.appendChild(t2);
                var cell3=row.insertCell(2);
                var t3=document.createElement("input");
                    t3.id = "hours";
                    cell3.appendChild(t3);
          

    }
}]);