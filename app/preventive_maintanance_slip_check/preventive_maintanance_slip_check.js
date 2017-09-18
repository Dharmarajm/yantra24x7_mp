'use strict';

angular.module('preventive_maintanance_slip_check', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintanance_slip_check', {
    templateUrl: 'preventive_maintanance_slip_check/preventive_maintanance_slip_check.html',
    controller: 'preventiveMaintenanceSlipChecklistCtrl'
  });
}])

.controller('preventiveMaintenanceSlipChecklistCtrl', ['$scope', '$http','$location','$window','$rootScope',
function($scope, $http,$location,$window,$rootScope) {

}]);