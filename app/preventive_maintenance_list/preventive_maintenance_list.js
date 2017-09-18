'use strict';

angular.module('preventive_maintenance_list', ['ngRoute','ui.calendar','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preventive_maintenance_list', {
    templateUrl: 'preventive_maintenance_list/preventive_maintenance_list.html',
    controller: 'preventiveMaintenanceList'
  });
}])

.controller('preventiveMaintenanceList', ['$scope', '$http','$location','$window','$rootScope','uiCalendarConfig',
  function($scope, $http,$location,$window,$rootScope,uiCalendarConfig) {

$scope.SelectedEvent=null;
var isFirstTime=true;

$scope.events=[];
$scope.evenSources=[$scope.events];

//Load Events from Server

$http.get($rootScope.api_url+'preventive_maintenances',{
	cache: true,
	params: {}
}).then(function(data){
  console.log(data.data);
	$scope.events.slice(0,$scope.events.length);
  angular.forEach(data.data,function(value){
    console.log(value);
     $scope.events.push({
          title:value.area,
          description: value.reason_for_preventive,
          start:new Date(value.maintenance_date),
          end:new Date(value.maintenance_date),
          allDay :true,
          editable: true
     });
     console.log($scope.events)
  });
});




//Config Calendar

  	$scope.uiConfig={
  		calendar:{
  			height:550,
  			editable: true,
  			displayEventTime:false,
        events: $scope.events,
  			header: {
  				left:'month basicWeek basicDay agendaWeek agendaDay',
  				center: 'title',
  				right: 'today prev,next'
  			},
  			eventClick: function(event){
  				$scope.SelectedEvent=event;
  				console.log($scope.SelectedEvent);
  			},
  			eventAfterAllRender: function(){
  				if($scope.events.length > 0 && isFirstTime){
  					uiCalendarConfig.calendars.mycalendar.fullCalendar('gotoDate',$scope.events[0].start);
  				}
  			},
        dayClick: function(date,event){
          console.log('hai');
        },
        eventDrop: function(){
         console.log('data')
        },
        eventResize: function(){
         console.log('data');
        }
  		}
  	}

    

}]);