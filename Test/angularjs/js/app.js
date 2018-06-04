angular.module('CrudApp', [])
      .controller("CrudController",function($scope,$http,$window){
        $scope.users={};
        $scope.master={};
        $scope.currentview="tpl/lists.html";
        $scope.addeditview="";



        $http.get('api/users.php').success(function(data) {
          $scope.users = data;
        });

        $scope.sortColumn="username";
        $scope.reverseColumn=false;
        $scope.sortData=function(column)
        {
          $scope.reverseColumn=($scope.sortColumn==column)? !$scope.reverseColumn:false;
          $scope.sortColumn=column;
        }

        $scope.addUser=function(newuser) {
        $scope.addeditview="tpl/add-new.html";
        };
        $scope.saveNew=function(newuser) {
          var userid=(newuser.id);
          if(typeof userid == "undefined")
          {
           $http({
                method  : 'POST',
                url     : 'api/adduser.php',
                data    : newuser, //forms user object
               })
              .success(function(data) {
                if (data.errors) {
                  // Showing errors.
                  $scope.message = data.errors;
                } else {
                  $scope.message = data.message;
                }
              });
                $scope.users.push(newuser);
            }
            else
            {
           $http({
                method  : 'POST',
                url     : 'api/edituser.php',
                data    : newuser, //forms user object
               })
              .success(function(data) {
                if (data.errors) {
                  $scope.message = data.errors;
                } else {
                  $scope.message = data.message;
                }
              });
            }
        $scope.cancelData();
        };
    $scope.updateUser=function(userdata,index) {
       $scope.addeditview="tpl/add-new.html";
       $scope.newuser=userdata;
    };
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
    $scope.cancelData=function(){
      $scope.newuser = angular.copy($scope.master);
      $scope.addeditview="";
    };
});
