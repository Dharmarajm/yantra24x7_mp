'use strict';

angular.module('preventive_maintenance_creation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_creation', {
    templateUrl: 'preventive_maintenance_creation/preventive_maintenance_creation.html',
    controller: 'preventiveMaintenanceCreationCtrl'
  });
}])

.controller('preventiveMaintenanceCreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);