var app=angular.module("CrudApp",["ngRoute"]);
app.config(["$routeProvider",function($routeProvider){
    
    $routeProvider.when("/",{
       controller:'loginRegisterController',
       templateUrl:'modified_login.html'
    });
    
}]);

app.controller("loginRegisterController",["$scope",function($scope){
    $scope.formactive=true;
    $scope.loginactive='active';

    $scope.callLogin=function(){
        $scope.formactive=true;
        $scope.loginactive='active';
              $scope.registeractive='';

    };
      $scope.callRegister=function(){
        $scope.formactive=false;
              $scope.registeractive='active';
              $scope.loginactive='';

    };  
    
    $scope.login=function(){
        
    };
}]);