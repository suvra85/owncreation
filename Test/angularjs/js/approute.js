var app=angular.module("CrudApp",['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/',{
		 controller:'listController',
		 templateUrl:"tpl/users.html"        

	})
	.when('/viewData/:uid',{
         controller:'viewController',
         templateUrl:"tpl/user.html"

	})
	.when('/addUser',{
         controller:'addController',
         templateUrl:"tpl/adduser.html"

	})
	.when('/editUser/:uid',{
         controller:'addController',
         templateUrl:"tpl/adduser.html"

	})
	.otherwise({
         controller:'viewController',
         templateUrl:"tpl/user.html"

	});
});

app.controller("listController",function($scope,$http){

        $scope.users ={};
         $http.get('api/users.php').success(function(data) {
          $scope.users = data;
        });

       $scope.deleteUser=function(userdata,index) {
      if($window.confirm("Do you want to delete this user?"))
      {
      $http({
                method  : 'POST',
                url     : 'api/deleteuser.php',
                data    : userdata, //forms user object
               })
              .success(function(data) {
                if (data.errors) {
                  $scope.message = data.errors;
                } else {
                  $scope.message = data.message;
                }
              });
         $scope.users.splice(index, 1);
       }
    };

});


app.controller("viewController",function($scope,$http,$routeParams){
        $scope.newuser ={};
        $http({
                method  : 'POST',
                url     : 'api/getUser.php',
                data    : {"id":$routeParams.uid}, //forms user object
               })
              .success(function(data) {
                $scope.newuser =data;
                $scope.fullname =data.first_name+" "+data.last_name;
              });

       

});
app.controller("addController",function($scope,$http,$location,$routeParams){

  $scope.createuser ={};

    /*-- Populate Data For Edit User--*/
  if(typeof $routeParams.uid !=="undefined"){

        $http({
                method  : 'POST',
                url     : 'api/getUser.php',
                data    : {"id":$routeParams.uid}, //forms user object
               })
              .success(function(data) {
                $scope.createuser =data;
              });

          }

   $scope.saveNew=function(createuser){

   		var userid=(createuser.id); // Get User Id
          if(typeof userid == "undefined")  // If user id not defind then perform insert function
          {
           $http({
                method  : 'POST',
                url     : 'api/adduser.php',
                data    : createuser, //forms user object
               })
              .success(function(data) {
                $location.path('/');
              });
            }
            else // otherwise update insert function 
            {
           $http({
                method  : 'POST',
                url     : 'api/edituser.php',
                data    : createuser, //forms user object
               })
              .success(function(data) {
                $location.path('/'); 
              });
            }

    };

    $scope.cancelData=function(){
                $location.path('/'); // redirect to root

    };
       
});





