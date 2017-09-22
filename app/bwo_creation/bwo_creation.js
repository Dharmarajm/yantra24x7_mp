'use strict';

angular.module('bwo_creation', ['ngRoute','base64'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_creation', {
    templateUrl: 'bwo_creation/bwo_creation.html',
    controller: 'bwoCreationCtrl'
  });
}])

.controller('bwoCreationCtrl', ['$scope', '$http','$location','$window','$rootScope','fileUpload','$base64','$q','$filter',
  function($scope, $http,$location,$window,$rootScope,fileUpload,$base64,$q,$filter) {
$scope.edit_bwo=localStorage.getItem("bwo_edit");
$scope.checklist={ "require_brain_storming":[{"id":1,"value":true},{"id":0,"value":false}],
                   "need_servicesupport":[{"id":1,"value":true},{"id":0,"value":false}],
                   "psn_notificationmail":[{"id":1,"value":true},{"id":0,"value":false}],
                   "kaizen_status":[{"id":1,"value":true},{"id":0,"value":false}]  
                 };
$scope.file_path;

if($scope.edit_bwo == undefined || $scope.edit_bwo == null){
$scope.bwocreation={"id":"",
                     "machine_id": "",
                     "maintenance_date":"",
                     "maintenance_workorder_number": "", 
                     "start_time": "", 
                     "end_time": "",
                     "starttime_dummy": "", 
                     "endtime_dummy": "",
                     "alarm": "", 
                     "maintainence_workorder_type": "", 
                     "maintenance_workorder_closedby": "",
                     "status": "", 
                     "awaiting": "", 
                     "require_brain_storming": "", 
                     "need_servicesupport": "", 
                     "psn_notificationmail": "", 
                     "kaizen_status": "",
                     "maintenance_type_id":"",
                     "nature_of_breakdown_id": "", 
                     "breakdown_type_id": "",
                     "file_path": ""
                   };
// Post Method for BWO Creation}
}else{


$http({

    method:'GET',
    url: $rootScope.api_url+'breakdown_work_orders/'+$scope.edit_bwo
  })
  .then(function(response){
   $scope.bwoedit = response.data;
  $scope.bwocreation={"id":$scope.bwoedit.id,
                     "machine_id": $scope.bwoedit.machine.id,
                     "maintenance_date":$scope.bwoedit.maintenance_date,
                     "maintenance_workorder_number":$scope.bwoedit.maintenance_workorder_number, 
                     "start_time": $scope.bwoedit.start_time, 
                     "end_time": $scope.bwoedit.end_time,
                     "starttime_dummy": $scope.bwoedit.starttime_dummy, 
                     "endtime_dummy": $scope.bwoedit.endtime_dummy,
                     "alarm": $scope.bwoedit.alarm, 
                     "maintainence_workorder_type": $scope.bwoedit.maintainence_workorder_type, 
                     "maintenance_workorder_closedby": $scope.bwoedit.maintenance_workorder_closedby,
                     "status": $scope.bwoedit.status, 
                     "awaiting": $scope.bwoedit.awaiting, 
                     "require_brain_storming": $scope.bwoedit.require_brain_storming, 
                     "need_servicesupport": $scope.bwoedit.need_servicesupport, 
                     "psn_notificationmail": $scope.bwoedit.psn_notificationmail, 
                     "kaizen_status": $scope.bwoedit.kaizen_status,
                     "maintenance_type_id":$scope.bwoedit.maintenance_type.id,
                     "nature_of_breakdown_id": $scope.bwoedit.nature_of_breakdown.id, 
                     "breakdown_type_id": $scope.bwoedit.breakdown_type.id,
                     "file_path": $scope.bwoedit.image.id
                   };

})










}
//alert(localStorage.getItem("bwo_edit"));


$scope.bwoCreation=function(){
  
 $scope.daystart = $filter('date')($scope.bwocreation.starttime_dummy, "hh:mma");
  $scope.dayend = $filter('date')($scope.bwocreation.endtime_dummy, "hh:mma");
  var bwocreation={
                   "machine_id": $scope.bwocreation.machine_id,
                   "maintenance_date":$scope.bwocreation.maintenance_date,
                   "maintenance_workorder_number": $scope.bwocreation.maintenance_workorder_number, 
                   "start_time": $scope.daystart, 
                   "end_time": $scope.dayend,
                   "starttime_dummy": $scope.bwocreation.starttime_dummy, 
                   "endtime_dummy": $scope.bwocreation.endtime_dummy,
                   "alarm": $scope.bwocreation.alarm, 
                   "maintainence_workorder_type": $scope.bwocreation.maintainence_workorder_type, 
                   "maintenance_workorder_closedby": $scope.bwocreation.maintenance_workorder_closedby,
                   "status": $scope.bwocreation.status, 
                   "awaiting": $scope.bwocreation.awaiting, 
                   "require_brain_storming": $scope.bwocreation.require_brain_storming, 
                   "need_servicesupport": $scope.bwocreation.need_servicesupport, 
                   "psn_notificationmail": $scope.bwocreation.psn_notificationmail, 
                   "kaizen_status": $scope.bwocreation.kaizen_status, 
                   "maintenance_type_id":$scope.bwocreation.maintenance_type_id,
                   "nature_of_breakdown_id": $scope.bwocreation.nature_of_breakdown_id, 
                   "breakdown_type_id": $scope.bwocreation.breakdown_type_id,
                   "image":{"image_path": $scope.file_path}
                  };  
                  if($scope.edit_bwo == null || $scope.edit_bwo == undefined){

$http({
  	method:'post',
  	url: $rootScope.api_url+'breakdown_work_orders',
  	data: bwocreation
  }).then(function(response){
  	/*$scope.bwoCreationSuccess=response.data;
    console.log($scope.bwoCreationSuccess);*/
  	if(response){
      //console.log(response);
       //$scope.bwocreation_id=response.data;
  	 alert('Breakdown work orders Created');
     //alert(response.data.id);
     localStorage.setItem("bwo_id",response.data.id);
      $location.path('/bwo_service_details');	 
  	}else{
      alert('breakdown work orders created failed');

  	}
  })	}




  else{




$http({
    method:'put',
    url: $rootScope.api_url+'breakdown_work_orders/'+$scope.bwocreation.id,
    data: bwocreation
  }).then(function(response){
    /*$scope.bwoCreationSuccess=response.data;
    console.log($scope.bwoCreationSuccess);*/
    if(response){
      //console.log(response);
       //$scope.bwocreation_id=response.data;
     alert('Breakdown work orders Updated');
     //alert(response.data.id);


     localStorage.removeItem("bwo_edit");
      $location.path('/bwo_list');  
    }else{
      alert('breakdown work orders Updation failed');

    }
  })


  }
}


// Sections Data getting functions
$http({

    method:'GET',
    url: $rootScope.api_url+'unit_section?unit_id='+$scope.reference_id
  })
  .then(function(response){
   $scope.bwoSections = response.data;
   console.log($scope.bwoSections);

})

//Maintenance Type getting functions

$http({

    method:'GET',
    url: $rootScope.api_url+'maintenance_type'
  })
  .then(function(response){
   $scope.maintenanceTypeList = response.data;
  // console.log($scope.bwoSections);

})

//Breakdown Type getting functions

$http({

    method:'GET',
    url: $rootScope.api_url+'breakdown_type'
  })
  .then(function(response){
   $scope.breakdownList = response.data;
})

//Nature of Breakdowns Getting functions

$http({

    method:'GET',
    url: $rootScope.api_url+'nature_of_breakdowns'
  })
  .then(function(response){
   $scope.natureBreakdownList = response.data;
})  



function encodeImageFileAsURL(cb) {
    return function(){
        var file = this.files[0];
        var reader  = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
    }
}

$('#inputFileToLoad').change(encodeImageFileAsURL(function(base64Img){
  $scope.file_path=base64Img;
    $('.output')
      .find('textarea')
        .val(base64Img)
        .end()
      .find('a')
        .attr('href', base64Img)
        .text(base64Img)
        .end()
      .find('img')
        .attr('src', base64Img);
}));



//Dynamic DropDown for Machine ID

$scope.change=function(id){
  $scope.sectionId=id;
  console.log($scope.sectionId)
 $http({

    method:'GET',
    url: $rootScope.api_url+'section_machines?section_id='+id
  })
  .then(function(response){
   $scope.bwoMachines = response.data;
   console.log($scope.bwoSections);

 })
}

$scope.create=function(id){
 console.log(id);
}
}]).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

