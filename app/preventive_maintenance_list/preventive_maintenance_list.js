'use strict';

angular.module('preventive_maintenance_list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_list', {
    templateUrl: 'preventive_maintenance_list/preventive_maintenance_list.html',
    controller: 'preventiveMaintenanceList'
  });
}])

.controller('preventiveMaintenanceList', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);