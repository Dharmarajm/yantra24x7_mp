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
  
  $scope.preCreation=["Weekly","Monthly","Quarterly","Half Yearly","Yearly"]; 




$scope.slipinit=function(){
  
  $scope.SelectedEvent=null;
 var isFirstTime=true;

 $scope.events=[];
 $scope.evenSources=[$scope.events];

 localStorage.removeItem("id");
 localStorage.removeItem("name");
 localStorage.removeItem("date");
 localStorage.removeItem("from_date");
 localStorage.removeItem("to_date");
 localStorage.removeItem("machine_idName");

 /*localStorage.clear();*/

//Config Calendar

   if($scope.role_type_name=='Tenant'){

   $http.get($rootScope.api_url+'tenant_preventive_maintenances_calendar?tenant_id='+$scope.tenant_id,{
   cache: true,
   params: {}
   }).then(function(data){
   console.log(data.data);
   $scope.events.slice(0,$scope.events.length);
  for(var k in data.data){
   angular.forEach(data.data[k],function(value,key){
  
     $scope.events.push({
          "title":value,
          "start": (new Date(key)).toISOString().slice(0,10),
          "end": (new Date(key)).toISOString().slice(0,10),
          "allDay" :true,
          "editable": true,
     });

    console.log($scope.events);
  });

 }
});

 $http({
           method: 'GET',
           url: $rootScope.api_url+'tenant_preventive_maintenance_previous_date?tenant_id='+$scope.tenant_id
         }).then(function(response){
           $scope.preventList=response.data;
           console.log($scope.preventList);
         })  

}
else{

$http.get($rootScope.api_url+'unit_preventive_maintenances_calendar?unit_id='+$scope.reference_id,{
  cache: true,
  params: {}
}).then(function(data){
  console.log(data.data);
  $scope.events.slice(0,$scope.events.length);
  for(var k in data.data){
   angular.forEach(data.data[k],function(value,key){
  
     $scope.events.push({
          "title":value,
          "start": (new Date(key)).toISOString().slice(0,10),
          "end": (new Date(key)).toISOString().slice(0,10),
          "allDay" :true,
          "editable": true,
     });

    
  });

 }
});

$http({
           method: 'GET',
           url: $rootScope.api_url+'unit_preventive_maintenance_previous_date?unit_id='+$scope.reference_id
         }).then(function(response){
           $scope.preventList=response.data;
           console.log($scope.preventList);
         })

}


 $scope.uiConfig={
      calendar:{
        height:550,
        editable: true,
        displayEventTime:false,
        events: $scope.events,
        header: {
          left:'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(event){
          localStorage.setItem("date",event.start._i);
          $location.path('/preventive_maintenance_slip');
        },
        eventAfterAllRender: function(event,element, view){
          //console.log(event);
          //if($scope.events.length > 0 && isFirstTime){
            /*uiCalendarConfig.calendars.mycalendar.fullCalendar('gotoDate',$scope.events[0].start);*/
            /*var currentday = moment(event.start).format("YYYY-MM-DD");
            if (event.totalhrs > 0) {
            var prev = $("#dailytotal-"+currentday).text() || 0;
            $("#dailytotal-"+currentday).text(+prev + +event.totalhrs);
            }
            var ele = $('.fc-day'+ date +''),count=$('.' + result).length;*/
            /*console.log($("#dailytotal-"+currentday).text(+prev + +event.totalhrs));*/
            
          //}
          console.log(event);
        },
        dayClick: function(date,event){
          console.log(date);
        },
        eventDrop: function(){
         console.log('data')
        },
        eventResize: function(){
         console.log('data');
        }
      }
    } 
           
}

$scope.edit=function(id){
  $scope.updateId=id;
  console.log(id);
  var i;
  for(i in $scope.preventList){
     if($scope.preventList[i].id == id){
       $scope.slippageMainList={
                                "reason_for_slippage":$scope.preventList[i].reason_for_slippage, 
                                "status":$scope.preventList[i].status,
                                "cause":$scope.preventList[i].cause
                               }
     }
    console.log($scope.slippageMainList); 
  }
}

$scope.view=function(id){
 console.log(id);
 $http({
        method: 'GET',
        url: $rootScope.api_url+'preventive_to_transaction?preventive_maintenance_id='+id
      }).then(function(response){
        $scope.viewCheck=response.data;
        
      })
}

$scope.addcheckslip=function(id){
  console.log(id);
  $scope.addslip=id;
  localStorage.setItem("addCheckSlip",$scope.addslip);
  $location.path('/preventive_maintanance_slipchecklist');
}

$scope.status=["Completed","Inprogress"];

$scope.updateCalendarList=function(id){
console.log(id);
var slippageMainList={
                      "reason_for_slippage":$scope.slippageMainList.reason_for_slippage, 
                      "status":$scope.slippageMainList.status,
                      "cause":$scope.slippageMainList.cause
                     }

$http({
        method: 'put',
        url: $rootScope.api_url+'preventive_maintenances/'+id,
        data: slippageMainList  
      })
.success(function(data) {
 if(data){
  console.log(data);
  alert("Updated Successfully");
  $scope.slipinit();
  }else{      
        alert('Updation Failed');   
 }
});
}

$scope.delete=function(id){
if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'preventive_maintenances/'+id).success(function(data) {
if(data){
alert("Deleted Successfully");
$scope.slipinit();
}else{      
      alert('Delete Failed');   
     }
});
}
}   

}]);