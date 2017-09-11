'use strict';

angular.module('bwo_list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_list', {
    templateUrl: 'bwo_list/bwo_list.html',
    controller: 'bwoListCtrl'
  });
}])

.controller('bwoListCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

}]);