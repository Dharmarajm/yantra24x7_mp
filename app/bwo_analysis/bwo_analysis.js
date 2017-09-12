'use strict';

angular.module('bwo_analysis', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_analysis', {
    templateUrl: 'bwo_analysis/bwo_analysis.html',
    controller: 'bwoAnalysisCtrl'
  });
}])

.controller('bwoAnalysisCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

  $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/fileUpload";
               fileUpload.uploadFileToUrl(file, uploadUrl);
  };


  $scope.insertAnalysisRow=function(){
                var table=document.getElementById("analysis");
                var rowCount = table.rows.length;
                console.log(rowCount);         
                var count = rowCount;
                var row=table.insertRow(rowCount);
                var cell1=row.insertCell(0);
                var t1=document.createElement("input");
                    t1.id="why"
                    cell1.appendChild(t1);
                /*cell1.innerHTML = count;*/
                var cell2=row.insertCell(1);
                var t2=document.createElement("input");
                    t2.id="dueto";
                    cell2.appendChild(t2);
                var cell3=row.insertCell(2);
                var t3=document.createElement("input");
                    t3.id = "action";
                    cell3.appendChild(t3);
 }

}]);