var app=angular.module("mainApp",["ngRoute"]);

app.config(function($routeProvider){

 $routeProvider
   .when('/',{
   		templateUrl:"login.html",
   		controller:"LoginCtrl"

   })
    .when('/dashboard',{
    	resolve:{
    		check:function($rootScope,$location)
    		      {
		    		if(!$rootScope.isLogin)
		    			{
						 $location.path("/");
		    			}
    		      }
    	},
      	templateUrl:"dashboard.html",
      	controller:"PagesCtrl"

   })
   .otherwise({

        redirectTo:'/'
   });

});


app.controller("LoginCtrl",function($scope,$location,$rootScope){

  $scope.submit=function(){

    if($scope.username=="admin" && $scope.password=="admin" )
    {
        $rootScope.isLogin=true;
    	$location.path("/dashboard");
    }
    else
    {
        $scope.errorMes="Invalid Login Details";
    	$location.path("/");
    }
  };

});

app.controller("PagesCtrl",function($scope,$location){


});
