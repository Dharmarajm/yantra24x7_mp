'use strict';

angular.module('anualMaintenanceList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/anual_maintenance_list', {
    templateUrl: 'anual_maintenance_list/anual_maintenance_list.html',
    controller: 'anualMaintenanceListCtrl'
  });
}])

.controller('anualMaintenanceListCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);