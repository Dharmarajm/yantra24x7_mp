'use strict';

angular.module('preventive_maintenance_checklist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_checklist', {
    templateUrl: 'preventive_maintenance_checklist/preventive_maintenance_checklist.html',
    controller: 'preventiveMaintenanceChecklistCtrl'
  });
}])

.controller('preventiveMaintenanceChecklistCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);