'use strict';

angular.module('bwo_spare_details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_spare_details', {
    templateUrl: 'bwo_spare_details/bwo_spare_details.html',
    controller: 'bwoSpareDetailsCtrl'
  });
}])

.controller('bwoSpareDetailsCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);