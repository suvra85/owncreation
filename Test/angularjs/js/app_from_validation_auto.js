var app=angular.module("minmax",['jcs-autoValidate']);
app.run([
        'bootstrap3ElementModifier','defaultErrorMessageResolver',
        function (bootstrap3ElementModifier,defaultErrorMessageResolver) {
              bootstrap3ElementModifier.enableValidationStateIcons(true);
            
             defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          errorMessages['NameRequired'] = 'Please enter your name';
        });
            
            
       }]);
app.controller("MinMaxCtrl",["$scope","$http",function($scope,$http){
    $scope.formModel={};
    $scope.onSubmit=function(){
        console.log("I am submitted");
        console.log($scope.formModel);
        $http.post("api/add_info.php",$scope.formModel)
        .success(function(data){
                   console.log(":-)");
            
        })
        .error(function(data){
               
                      console.log(":-(");

        });  
            
       
      
    };
    
}]);