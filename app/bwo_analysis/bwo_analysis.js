'use strict';

angular.module('bwo_analysis', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bwo_analysis', {
    templateUrl: 'bwo_analysis/bwo_analysis.html',
    controller: 'bwoAnalysisCtrl'
  });
}])

.controller('bwoAnalysisCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

$scope.bwo_id=localStorage.getItem("bwo_id");

$scope.whywhycreation={
                     id:null,
                     why:"",
                     due_to:"",
                     action:"",
                     breakdown_work_order_id:$scope.bwo_id
                   };



$scope.whywhycreation_form=function(){
  

  var whywhycreation={"why_why_analysis":{
                   "why":$scope.whywhycreation.why,
                   "due_to":$scope.whywhycreation.due_to,
                   "action":$scope.whywhycreation.action,
                   "breakdown_work_order_id":$scope.bwo_id
                   }};  

$http({
  	method:'post',
  	url: $rootScope.api_url+'why_why_analysis_create',
  	data: whywhycreation
  }).then(function(response){
  	
  	if(response){
    $scope.whywhycreation="";
  	 $scope.why_why_analysis();
  	}else{
      alert("Failed");

  	}
  })	

}
$scope.why_why_analysis=function(){

$http({

    method:'GET',
    url: $rootScope.api_url+'breakdown_to_why_analysis?breakdown_work_order_id='+$scope.bwo_id
  })
  .then(function(response){
   $scope.whywhy_list = response.data;
})  
  $http({

    method:'GET',
    url: $rootScope.api_url+'breakdown_to_spares?breakdown_work_order_id='+$scope.bwo_id
  })
  .then(function(response){
   $scope.spare_list = response.data;
})  

}


$scope.sparecreation={

	id: null, 
breakdown_work_order_id: "",
 spare_id: "",
 spare_description: "", 
qty: null, 
spare_cost: null, 
reason_for_change: "", 
achieved_life_time: "", 
expected_change_date: "",

}


$scope.sparecreation_form=function(){

var sparecreation={"spares_used_detail":{

"breakdown_work_order_id":$scope.bwo_id ,
 "spare_id": $scope.sparecreation.spare_id,
 "spare_description": $scope.sparecreation.spare_description, 
"qty": $scope.sparecreation.qty, 
"spare_cost": $scope.sparecreation.spare_cost, 
"reason_for_change": $scope.sparecreation.reason_for_change, 
"achieved_life_time": $scope.sparecreation.achieved_life_time, 
"expected_change_date": $scope.sparecreation.expected_change_date
}};

$http({
  	method:'post',
  	url: $rootScope.api_url+'spares_used_detail_create',
  	data: sparecreation
  }).then(function(response){
  	
  	if(response){
    $scope.sparecreation="";
  	 $scope.why_why_analysis();
  	}else{
      alert("Failed");

  	}
  })	




}



$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'spares_used_detail_delete?id='+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.why_why_analysis();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}


$scope.delete1 = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'why_why_analysis_delete?id='+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.why_why_analysis();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}




}]);