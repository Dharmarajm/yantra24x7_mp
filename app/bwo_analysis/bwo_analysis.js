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

}]);