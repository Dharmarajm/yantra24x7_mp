'use strict';

angular.module('bwo_creation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_creation', {
    templateUrl: 'bwo_creation/bwo_creation.html',
    controller: 'bwoCreationCtrl'
  });
}])

.controller('bwoCreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
  
  

}]);