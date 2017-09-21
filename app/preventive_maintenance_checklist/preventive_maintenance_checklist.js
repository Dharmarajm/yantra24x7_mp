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

 $scope.preventCheckType=["Daily","Weekly","Monthly"]; 

$scope.preventive_checklist={
                             "machine_id": "",
                             "checklist_type": "",
                             "duration_from": "",
                             "duration_to": ""
                            }



console.log($scope.file_path);
//Post Method for Checklist Creation

$scope.preventiveCheckCretion=function(){
	
	var preventCreate={ 
                             "machine_id":$scope.preventive_checklist.machine_id,
                             "checklist_type":$scope.preventive_checklist.checklist_type,
                             "duration_from":$scope.preventive_checklist.duration_from,
                             "duration_to":$scope.preventive_checklist.duration_to,
                             "image":{"image_path":$scope.file_path }                              
                            };
console.log(preventCreate);
 $http({
       method:'POST',
       url: $rootScope.api_url+'preventive_maintenance_checklists',
       data: preventCreate 
      }).then(function(response){
      	$scope.preventCheckSuccess=response.data;
        $scope.userinit();
        $scope.preventive_checklist="";
      	alert("Checklist Created")
        console.log($scope.preventCheckSuccess);
      })                           
}




//Get method for display the Checkliat data

$scope.userinit=function(){

//Machine Name getting functions
if($scope.role_type_name=='Tenant'){

$http({
    method:'GET',
    url:$rootScope.api_url+'tenant_machine?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.preventCheckMachines = response.data;
   
  
    })
  $http({
        method: 'GET',
        url: $rootScope.api_url+'tenant_preventive_maintenance_checklist?tenant_id='+$scope.tenant_id
      }).then(function(response){
        $scope.preventChecklists=response.data;
        console.log($scope.preventChecklists);
        
      })
}//if block end
else{

$http({
    method:'GET',
    url:$rootScope.api_url+'unit_machine?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
$scope.preventCheckMachines = response.data;
   
  
    })
$http({
        method: 'GET',
        url: $rootScope.api_url+'unit_preventive_maintenance_checklist?unit_id='+$scope.reference_id
      }).then(function(response){
        $scope.preventChecklists=response.data;
        console.log($scope.preventChecklists);
        
      })

}
}



//Edit Method for Preventive Checklist

$scope.edit = function(id) {
   
   $scope.updateCheck=id;
    
   var i;

   for(i in $scope.preventChecklists) {

            if($scope.preventChecklists[i].id == id) {
               var role_id=$scope.preventChecklists[i];
               
               
               $scope.preventiveCheckEdit ={ 
                                             "machine_id": $scope.preventChecklists[i].machine.id,
                                             "checklist_type": $scope.preventChecklists[i].checklist_type,
                                             "duration_from": $scope.preventChecklists[i].duration_from,
                                             "duration_to": $scope.preventChecklists[i].duration_to,
                                             "image_path": $scope.preventChecklists[i].image_id
                                             
                                            }
                 console.log($scope.preventiveCheckEdit);                      
               }

        }

    }

//Update functions for Checklist

$scope.preventChecklistUpdate=function(id){
  
  var preventiveCheckEdit={ 
                             "machine_id":$scope.preventiveCheckEdit.machine_id,
                             "checklist_type":$scope.preventiveCheckEdit.checklist_type,
                             "duration_from":$scope.preventiveCheckEdit.duration_from,
                             "duration_to":$scope.preventiveCheckEdit.duration_to,
                             "image_path":$scope.preventiveCheckEdit.image_path                               
                            };

  $http({
        method: 'put',
        url: $rootScope.api_url+'preventive_maintenance_checklists/'+id,
        data: preventiveCheckEdit  
      })
      
      .success(function(data) {
        
        if(data){
    console.log(data);
       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.userinit();
        }else{      
        alert('Updation Failed');   
        }
      });
}


//Delete Method for Checklist

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'preventive_maintenance_checklists/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      $scope.userinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

function encodeImageFileAsURL(cb) {
    return function(){
        var file = this.files[0];
        console.log(file);
        console.log($scope.preventiveCheckEdit.image_path);
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

}])
.directive('fileModel', ['$parse', function ($parse) {
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
}])
.service('fileUpload', ['$http', function ($http) {
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

 $scope.data=function(id){
  console.log(id);
 }   
}]);