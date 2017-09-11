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

}]);