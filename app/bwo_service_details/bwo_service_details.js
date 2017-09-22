'use strict';

angular.module('bwo_service_details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_service_details', {
    templateUrl: 'bwo_service_details/bwo_service_details.html',
    controller: 'bwoServiceDetailsCtrl'
  });
}])

.controller('bwoServiceDetailsCtrl', ['$scope', '$http','$location','$window','$rootScope','$filter',
  function($scope, $http,$location,$window,$rootScope,$filter) {
 $scope.bwo_id=localStorage.getItem("bwo_id");
   
$scope.inhouseregistration = {id: null,
  service_engineer_id:"",
  hours:"",dummy_hours:"",
 breakdown_work_order_id: $scope.bwo_id};



$scope.inhouse_form=function(){

   $scope.work = $filter('date')($scope.inhouseregistration.dummy_hours, "HH:mm:ss");
   var inhouseregistration ={"inhouse_service_engineer": {"service_engineer_id":$scope.inhouseregistration.service_engineer_id,
        "hours":$scope.work,
        "dummy_hours":$scope.inhouseregistration.dummy_hours,
        "breakdown_work_order_id":$scope.bwo_id
       }};
  if ($scope.inhouseregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'inhouse_service_engineer_create',
        data: inhouseregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.inhouseregistration="";
$scope.inhouseinit();
       // $state.go('/company_registration');
    

      
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'inhouse_service_engineer_update/'+$scope.inhouseregistration.id,
        data: inhouseregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.inhouseinit();
       
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });

    }




}

if($scope.bwo_id == null){
$scope.vendorregistration = {id: null,
  service_provider_id:"",
  name:"",
  attended_date:"",
  attended_duration:"",
  start_time:"",
  end_time:"",
  attended_duration_dummy:"",
  starttime_dummy:"",
  endtime_dummy:"",
  break_down_status:"",
  type_of_visit:"",
  amount:"",
  breakdown_work_order_id: $scope.bwo_id};
}else{
 $http({

    method:'GET',
    url:$rootScope.api_url+'/breakdown_work_order_to_vendor_service_engineer?breakdown_work_order_id='+$scope.bwo_id
  })
  .then(function(response){
    
  $scope.vendorregistration= response.data; 
  
    })


}


$scope.vendor_form=function(){
   $scope.start_time= $filter('date')($scope.vendorregistration.starttime_dummy, "HH:mma");
    $scope.end_time= $filter('date')($scope.vendorregistration.endtime_dummy, "HH:mma");
  $scope.attended_time= $filter('date')($scope.vendorregistration.attended_duration_dummy, "HH:mm:ss");
   var vendorregistration ={"vendor_service_engineer":{
  service_provider_id:$scope.vendorregistration.service_provider_id,
  name:$scope.vendorregistration.name,
  attended_date:$scope.vendorregistration.attended_date,
  attended_duration: $scope.attended_time,
  start_time:$scope.start_time,
  end_time:$scope.end_time,
  attended_duration_dummy: $scope.vendorregistration.attended_duration_dummy,
  starttime_dummy:$scope.vendorregistration.starttime_dummy,
  endtime_dummy:$scope.vendorregistration.endtime_dummy,
  break_down_status:$scope.vendorregistration.break_down_status,
  type_of_visit:$scope.vendorregistration.type_of_visit,
  amount:$scope.vendorregistration.amount,
  breakdown_work_order_id:$scope.bwo_id}};


  if ($scope.vendorregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'vendor_service_engineer_create',
        data: vendorregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.vendorregistration="";
       // $state.go('/company_registration');
  
$scope.inhouseinit();
      
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'vendor_service_engineer_update/'+$scope.vendorregistration,
        data: vendorregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.inhouseinit();
       
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });

    }





}


















$scope.inhouseinit=function(){



if($scope.role_type_name == 'Tenant'){
  $http({

    method:'GET',
    url:$rootScope.api_url+'tenant_service_engineers?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.service_engineer_list= response.data; 
  
    })

$http({

    method:'GET',
    url:$rootScope.api_url+'tenant_service_providers?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    
   $scope.service_provider_list= response.data; 
  
    })
}else{

  $http({

    method:'GET',
    url:$rootScope.api_url+'unit_service_engineers?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
   $scope.service_engineer_list = response.data; 
  
    })

  $http({

    method:'GET',
    url:$rootScope.api_url+'unit_service_providers?unit_id='+$scope.reference_id
  })
  .then(function(response){
    
   $scope.service_provider_list = response.data; 
  
    })
}


  $http({

    method:'GET',
    url:$rootScope.api_url+'breakdown_to_inhouse_service_engineer?breakdown_work_order_id='+ $scope.bwo_id
  })
  .then(function(response){
    
   $scope.inhouse_list = response.data; 
  console.log($scope.inhouse_list);
    })

}


 $scope.edit = function(id) {
var i;
   for(i in $scope.inhouse_list) {

            if($scope.inhouse_list[i].id == id) {
               //var operator_id=$scope.operators[0].operators[i];
               $scope.inhouseregistration =  angular.copy($scope.inhouse_list[i]); 


             }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'inhouse_service_engineer_delete?id='+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.inhouseinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}


}]);