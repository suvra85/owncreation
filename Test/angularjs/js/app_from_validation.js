var app=angular.module("minmax",[]);
app.controller("MinMaxCtrl",["$scope","$http",function($scope,$http){
    $scope.formModel={};
    $scope.onSubmit=function(valid){
        if(valid){
           console.log("I am submitted");
        console.log($scope.formModel);
        $http.post("api/add_info.php",$scope.formModel)
        .success(function(data){
                   console.log(":-)");
            
        })
        .error(function(data){
               
                      console.log(":-(");

        });  
            
        }
        else
            {
                
                         console.log("error");
  
            }
      
    };
    
}]);