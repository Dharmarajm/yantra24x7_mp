'use strict';

angular.module('anualMaintenanceCreation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/anual_maintenance_creation', {
    templateUrl: 'anual_maintenance_creation/anual_maintenance_creation.html',
    controller: 'anualMaintenanceCreationCtrl'
  });
}])

.controller('anualMaintenanceCreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);