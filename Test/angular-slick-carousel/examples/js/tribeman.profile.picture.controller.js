var app = angular.module('tribeModule');
/*app.controller('tribemanPictureController', ['$scope', '$modal', '$rootScope', 'tribeService', '$stateParams','$state','growl', function($scope, $modal, $rootScope, tribeService, $stateParams,$state,growl) {

  Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
  };

    $rootScope.shwLoad = true;
    // $scope.loggedInTribeman = JSON.parse(localStorage.getItem("loggedInTribeman")); //$stateParams;
    $scope.picChooseError = false;
    $scope.duplicateError="";
    $scope.loggedInTribeman = $stateParams;
    $rootScope.albumPictures=false;
    $scope.loggedInTribemanDetails = JSON.parse(localStorage.getItem('loggedInTribeman'));
    $scope.isLoggedin = ($scope.loggedInTribeman.tribemanId === $scope.loggedInTribemanDetails.tribemanId) ? true : false;

    $rootScope.totalAlbum=0;
    $rootScope.totalAlbumPics=0;
    $scope.album="";
    $scope.loadingPictureAlbum=false;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $rootScope.isAddDelete=false;
    $scope.loadingAlbum=false;

    $scope.$watch(function() {
        return tribeService.getPictureRefresh();
    }, function(newValue, oldValue) {
        if($rootScope.totalAlbumPics==0)
          {  $rootScope.albumPictures=false;}

        if(!$rootScope.albumPictures)
           {
              //$rootScope.tribemanPictureList();
              if($rootScope.isAddDelete)
              {
                //$state.reload();
                $rootScope.isAddDelete=false;
              }
                
           }    
        else
            {
                  $rootScope.AlbumDetails($scope.album,0)
            }
    });
    $scope.closeImg = function() {
        angular.element('.tribeImgDiv img').attr('src', '');
        angular.element('.tribeImgDiv').css('display', 'none');
    };

    $scope.getStyle=function(nm){

      if(nm.length>3)
      {
        return {'right':'-80px'};
      }
      else if(nm.length>1)
      {
        return {'right':'-103px'};
      }
      else
      {
        return {'right':'-120px'};
      }

    }  
    // Show Albums
    $scope.allAlbums=function(){
        $rootScope.albumPictures=false;
    }
    // Delete Album
    $scope.deleteAlbum=function(object,nm){
        console.log(nm)
       tribeService.getTribemanAlbumPictureCDN($scope.loggedInTribeman.tribemanId,nm).success(function(res) {
           if (res.length==0||res.length==1) {
               var modalInstance = $modal.open({
                 templateUrl: 'js/app/tribe/common/templates/delete.modal.view.html',
                 controller: 'deletePictureModalController',
                 windowClass: 'tribeCreate-modal-window',
                 resolve: {
                     tribemanId: function() {
                             return $scope.loggedInTribeman.tribemanId;
                     },
                     pictureObject:function() {
                             return object;
                     },
                     isAlbum:function(){
                         return true;
                     }
                 }

             });
              
           }
           else
           {
              growl.error("Album "+object.album+" contains some pictures.Delete pictures before deleting album", {
                  ttl: 5000
              });
           }
            
        });

        // tribeService.deleteTribemanAlbumCDN($scope.loggedInTribeman.tribemanId,object.album).success(function(res) {
        //     $scope.tribemanPictureList()
        // });

    }
    // Pictures of an album

    $scope.currentAlnum=-1;
   
    $rootScope.AlbumDetails=function(album,index){
        $scope.currentAlnum=index
        console.log(index)
        $scope.loadingPictureAlbum=true;
        $rootScope.albumPictures=true;
        $scope.album=album;
        // This is using CDN--First Parameter is tribenameId and second is albumname
        tribeService.getTribemanAlbumPictureCDN($scope.loggedInTribeman.tribemanId,album).success(function(res) {
            if (res && res.length > 0) {
                $scope.tribemanPicutures = res;
                angular.forEach($scope.tribemanPicutures, function(value, key) {
                      $scope.tribemanPicutures[key]['picture']=value.picturePath;
                    });
                $rootScope.shwLoad = false;
                $rootScope.totalAlbumPics=$scope.tribemanPicutures.length;
                 $scope.loadingPictureAlbum=false;
                //$rootScope.tribemanPictureCount=res.length;
                //$scope.albumPictures=true;
            }
            else if(res.length==0)
            {
                //$rootScope.tribemanPictureCount=0;
                $scope.tribemanPicutures=[];
            }
        });

    }
    $scope.AlbumDetailsNew=function(album){


        // This is using CDN--First Parameter is tribenameId and second is albumname
        tribeService.getTribemanAlbumPictureCDN($scope.loggedInTribeman.tribemanId,album).success(function(res) {
            if (res && res.length > 0) {
                $scope.tribemanPicutures = res;
                angular.forEach($scope.tribemanPicutures, function(value, key) {
                      $scope.tribemanPicutures[key]['picture']=value.picturePath;
                    });
               
            }
            if(res.length>0)
            {
                  var modalInstance = $modal.open({
                    templateUrl: 'js/app/tribe/common/templates/tribemanPicutures.modal.view.html',
                    controller: 'albumPictureSliderController',
                    windowClass: 'tribeCreate-modal-window',
                    resolve: {
                        tribemanId: function() {
                                return $scope.loggedInTribeman.tribemanId;
                        },
                        pictureObject:function() {
                                return  $scope.tribemanPicutures;
                        },
                        album:function(){
                            return album;
                        },
                        parentInstance:function(){
                            return modalInstance;
                        },
                    }
                    
                });  

            }
        });

    }


    $rootScope.tribemanPictureList = function() {
        // tribeService.getTribemanPicture(20, $scope.loggedInTribeman.tribemanId).success(function(res) {
        //     if (res && res.list && res.list.length > 0) {
        //         $scope.tribemanPicutures = res.list;
        //         $rootScope.shwLoad = false;
        //         $rootScope.tribemanPictureCount=(res.list).length;
        //     }
        //     else if(res.list.length==0)
        //     {
        //         $rootScope.tribemanPictureCount=0;
        //     }
        // });
        // Get all albums--First Parameter is tribenameId 
        $scope.loadingAlbum=true;

        
        tribeService.getTribemanAlbumCDN($scope.loggedInTribeman.tribemanId).success(function(res) {
            if (res && res.length > 0) {
                // $rootScope.tribemanAlbumPicutures =_.map(res,function(r){ console.log(typeof r.album,r.album); if(!_.isNull(r.album)||!_.isUndefined(r.album)||r.album!=""){ return r;}});

                var data=[];

                angular.forEach(res, function(v,r){
                    if(!_.isNull(v.album))
                    {
                        data.push(v)
                    }
                })
                $rootScope.tribemanAlbumPicutures =_.orderBy(data, ['createdAt'], ['asc']);
                $rootScope.shwLoad = false;
                var sumPictures=_.map(res,'count').reduce(function(a,b){return a+b}, 0);
                $rootScope.tribemanPictureCount=sumPictures;
                //console.log(sumPictures)
                $rootScope.allAlbums=$rootScope.tribemanAlbumPicutures;

                $rootScope.totalAlbum=sumPictures;
                //console.log($rootScope.tribemanAlbumPicutures)
                     
            }
            else if(res.length==0)
            {
                $rootScope.tribemanPictureCount=0;
                $rootScope.totalAlbum=0;
                $rootScope.tribemanAlbumPicutures=[];
                //$scope.tribemanPicutures=[];
            }
            $scope.loadingAlbum=false;
        });


    };
    $rootScope.tribemanPictureList();



    $scope.deleteTribemanPicture = function(pictureObject) {
        // tribeService.deleteTribemanPicture(picId).success(function(res) {
        //     $scope.tribemanPictureList();
        // });

        //Delete Album picture using CDN
           // tribeService.deleteTribemanAlbumPictureCDN($scope.loggedInTribeman.tribemanId,pictureObject.tribemanPictureId,pictureObject.album).success(function(res) {
           //     //$scope.tribemanPictureList();
           //     tribeService.setPictureRefresh({ 'tribePicture': true });
           // });  


             var modalInstance = $modal.open({
               templateUrl: 'js/app/tribe/common/templates/delete.modal.view.html',
               controller: 'deletePictureModalController',
               windowClass: 'tribeCreate-modal-window',
               resolve: {
                   tribemanId: function() {
                           return $scope.loggedInTribeman.tribemanId;
                   },
                   pictureObject:function() {
                           return pictureObject;
                   },
                   isAlbum:function(){
                       return false;
                   }
               }
               
           });   
    };

    

    $scope.pictureDetails = function(pictureId) {
        var modalInstance = $modal.open({
            templateUrl: 'js/app/tribe/templates/clan/categories/clan.photos.details.modal.view.html',
            controller: 'tribemanPictureDetailsController',
            windowClass: 'tribeCreate-modal-window',
            resolve: {
                pictureId: function() {
                    return tribeService.getTribemanPictureDetails(pictureId).then(function(res) {
                        // This link is needed for new CDN API
                        res.data['picture']=res.data['picturePath']
                        return res.data;
                    });
                },
                tribemanPicturesList: function() {
                    return $scope.tribemanPicutures;
                },
                loggedInTribeman: function() {
                    return $scope.loggedInTribemanDetails;
                }
            }
        });
        modalInstance.result.then(function(registerModel) {}, function() {});
    };
    $scope.addPictureOpen = function(type) {
        var modalInstance = $modal.open({
            templateUrl: 'js/app/tribe/templates/profile/categories/tribeman.picture.add.html',
            controller: function($scope, $modalInstance,$rootScope,albumOrPicture,albumNm) {
                $scope.albumOrPicture=albumOrPicture;

                $scope.albumNm=albumNm;
                //console.log($scope.albumOrPicture)
                $scope.loggedInTribeman = $stateParams;
                $scope.loggedInTribemanDetails = JSON.parse(localStorage.getItem('loggedInTribeman'));
                $scope.isLoggedin = ($scope.loggedInTribeman.tribemanId === $scope.loggedInTribemanDetails.tribemanId) ? true : false;
                $scope.pictureData = {};

                $scope.isBase64='img/tribeImgs/picture_p.png';
                $scope.changeFile=function(){
                    if(angular.isUndefined($scope.pictureData.picture))
                    {
                       $scope.isBase64='img/tribeImgs/picture_p.png';
                    }
                    else
                    {
                        var typePic=$scope.pictureData.picture.filetype;
                        $scope.isBase64="data:"+typePic+";base64,"+$scope.pictureData.picture.base64;    
                    }
                }

                $scope.availableAlbums= _.map($rootScope.allAlbums,'album');


                $scope.addPicture = function(pictureFormData) {

                    if (pictureFormData.picture.data !== null) {
                        $scope.picChooseError = false;
                        $rootScope.shwLoad = true;
                        var pictureData = {},typePic=pictureFormData.picture.filetype,extentionValue=typePic.split("/");
                        pictureData.tribemanId = $scope.loggedInTribeman.tribemanId;
                        //pictureData.picture = pictureFormData.picture.data;

                        pictureData.picture = "data:"+typePic+";base64,"+pictureFormData.picture.base64;
                        pictureData.imageTitle = pictureFormData.imageTitle;
                        pictureData.description = pictureFormData.description;
                        if($scope.albumOrPicture=='image')
                       {
                         // var albumnm = (pictureFormData.album)?pictureFormData.album[0]:'';
                         // pictureData.album=albumnm.trim();
                         //pictureData.album=(pictureFormData.album).trim();

                         pictureData.album=($scope.albumNm).trim();

                        }
                        else
                        {
                            pictureData.album=(pictureFormData.album).trim();
                        }
                        pictureData.longitude = '';
                        pictureData.picturePath = '';
                        pictureData.hashtags = '';
                        pictureData.location = '';
                        pictureData.latitude = '';
                        pictureData.fileExtension=extentionValue[1],
                        pictureData.privacyRule="ONLY_ME",

                        console.log(pictureData)
                        // tribeService.addTribemanPicture(pictureData).success(function(res) {
                        //     // $scope.pictureData = {};
                        //      $scope.close();
                        //     // $scope.closeImg();
                        //     tribeService.setPictureRefresh({ 'tribePicture': true });
                        //     $rootScope.shwLoad = false;
                        //     $rootScope.tribemanPictureCount=parseInt($rootScope.tribemanPictureCount)+1;
                        // });
                        var obj=[];
                        obj[0]=pictureData;
                        var duplicateIndex=_.findIndex($scope.availableAlbums, function(o) { return o.toLowerCase() ==(pictureData.album).toLowerCase(); });

                        console.log(duplicateIndex);

                        if(($scope.albumOrPicture=='album' && (duplicateIndex==-1))||$scope.albumOrPicture=='image'){


                        //console.log(obj);
                        tribeService.addTribemanPictureCDN(obj).success(function(res) {
                            // $scope.pictureData = {};
                             $scope.close();
                            // $scope.closeImg();
                            //tribeService.setPictureRefresh({ 'tribePicture': true });
                            $rootScope.shwLoad = false;
                            $rootScope.tribemanPictureCount=parseInt($rootScope.tribemanPictureCount)+1;

                            //$rootScope.totalAlbum=$rootScope.tribemanPictureCount;
                            $rootScope.totalAlbumPics=$rootScope.tribemanPictureCount;
                            $rootScope.isAddDelete=true;
                            if($rootScope.albumPictures)
                              {

                                tribeService.setPictureRefresh({ 'tribePicture': $rootScope.totalAlbumPics });
                                //$rootScope.AlbumDetails(response['album']);
                                  $rootScope.AlbumDetails(pictureData.album,0);

                              }
                             else
                              {
                                $rootScope.tribemanPictureCount+=1;
                               //tribeService.setTribeProfileTab("pictures"+$rootScope.tribemanPictureCount);

                                var albums=_.map($rootScope.tribemanAlbumPicutures,'album');
                                //console.log(_.indexOf(albums,pictureData.album))

                                if(_.indexOf(albums,pictureData.album)==-1)
                                {
                                    $rootScope.tribemanPictureCount+=1;
                                    var response=res.result.result[0],obj={"promoPic":response['picturePath'],"count":1,"album":response['album']};

                                    console.log(obj)
                                    $rootScope.tribemanAlbumPicutures.push(obj);
                                    $rootScope.totalAlbum=$rootScope.tribemanPictureCount;
                                   // tribeService.setPictureRefresh({ 'tribePicture': $rootScope.totalAlbum });
                                }

                               }

                        });

                      }
                      else
                      {
                        growl.error("Album "+pictureData.album+" is already in use.", {
                            ttl: 5000
                        });
                        $scope.duplicateError = "Album "+pictureData.album+" is already in use.";
                      }
                    } else {
                        $scope.picChooseError = true;
                    }

                };
                $scope.close = function() {
                    $modalInstance.dismiss('cancel');
                };
            },
            windowClass: 'md',
            resolve: {
                albumOrPicture: function() {
                        return type;
                },
                albumNm: function() {
                        return $scope.album;
                }
            }
        });
        modalInstance.result.then(function(registerModel) {}, function() {});
    };


    // On About Tab Click
    $scope.$watch(function() {
        return tribeService.getTribeProfileTab();
    }, function(newValue, oldValue) {
        if (newValue=='pictures') {
            $rootScope.tribemanPictureList();
        }
        else if(!angular.isUndefined(newValue) && newValue.indexOf("deletepictures")!=-1)
        {
          $rootScope.albumPictures=false;
        }
        else
        {

        }
    });

}]);
app.controller('tribemanPictureDetailsController', ['$scope', 'pictureId', 'tribemanPicturesList', '$modalInstance', 'loggedInTribeman', function($scope, pictureId, tribemanPicturesList, $modalInstance, loggedInTribeman) {
    $scope.loggedInTribemanDetails = loggedInTribeman;
    $scope.tribemanPicturesList = tribemanPicturesList;
    $scope.picDetails = pictureId;

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.chageImg=function(data)
    {
        $scope.picDetails=data;
    }
}]);

app.controller('deletePictureModalController', ['$scope', 'tribemanId', 'pictureObject', '$modalInstance', 'isAlbum','tribeService','$rootScope', function($scope, tribemanId, pictureObject, $modalInstance, isAlbum,tribeService,$rootScope) {
    $scope.title=pictureObject.album;
    if(isAlbum)
    {$scope.info="album";}
    else
    {$scope.info="picture";}

    $scope.ok=function(){
        if(isAlbum)
        {
            //Delete Album using CDN
         tribeService.deleteTribemanAlbumCDN(tribemanId,encodeURI(pictureObject.album)).success(function(res) {
             //$rootScope.tribemanPictureList();
             $rootScope.totalAlbum=$rootScope.totalAlbum-1
             //tribeService.setPictureRefresh({ 'tribePicture': $rootScope.totalAlbum });

             var index=_.findIndex($rootScope.tribemanAlbumPicutures, function(o) { return o.album == pictureObject.album; });


             $rootScope.tribemanAlbumPicutures.splice(index,1);

             $rootScope.isAddDelete=true;

             tribeService.setTribeProfileTab("deletepictures"+$rootScope.totalAlbum);

         });   
        }
        else
        {
            //Delete Album picture using CDN
               tribeService.deleteTribemanAlbumPictureCDN(tribemanId,pictureObject.tribemanPictureId,encodeURI(pictureObject.album)).success(function(res) {
                    $rootScope.albumPictures=true;
                    $rootScope.totalAlbumPics=$rootScope.totalAlbumPics-1
                    tribeService.setPictureRefresh({ 'tribePicture': $rootScope.totalAlbumPics });

                    $rootScope.AlbumDetails(pictureObject.album,0);
                   
               }); 
        }
        $modalInstance.dismiss('cancel');

    }
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };


}]);

app.controller('albumPictureSliderController', ['$scope', 'tribemanId', 'pictureObject', '$modalInstance', 'album','tribeService','$rootScope','$modal', function($scope, tribemanId, pictureObject, $modalInstance, album,tribeService,$rootScope,$modal) {
    $scope.title=album;
    $scope.info="";
    $scope.tribemanPicutures=pictureObject;
    var parentInstance=$modalInstance;
 

    $scope.deleteTribemanPicture=function(obj){
          var modalInstance = $modal.open({
            templateUrl: 'js/app/tribe/common/templates/delete.modal.view.html',
            controller: function(tribemanId,pictureObject,isAlbum,parentInstance,$scope,tribeService,$rootScope,$modalInstance,parentInstance){
                $scope.ok=function(){
                    tribeService.deleteTribemanAlbumPictureCDN(tribemanId,pictureObject.tribemanPictureId,encodeURI(pictureObject.album)).success(function(res) {
                         
                          $modalInstance.dismiss('cancel');
                          parentInstance.dismiss('cancel');
                    }); 
                }

                $scope.close = function() {
                    $modalInstance.dismiss('cancel');
                };

            },
            windowClass: 'tribeCreate-modal-window',
            resolve: {
                tribemanId: function() {
                        return tribemanId;
                },
                pictureObject:function() {
                        return obj;
                },
                isAlbum:function(){
                    return false;
                },
                parentInstance:function(){
                    return parentInstance;
                },
            }
            
        });  
    }
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };


}]);*/

app.controller('tribemanPictureController', ['$scope', '$modal', '$rootScope', 'tribeService', '$stateParams','$state','growl', function($scope, $modal, $rootScope, tribeService, $stateParams,$state,growl) {


    $scope.tribesman = $stateParams;
    $scope.loggedUser=localStorage.getItem('loggedInTribeman');
    $scope.loggedInTribemanDetails = JSON.parse(localStorage.getItem('loggedInTribeman'));

    $scope.isLoggedUser=false;
    $scope.loadingAlbum=false;
    if($scope.loggedUser!=""||$scope.loggedUser!="none")
    {
        if($scope.loggedInTribemanDetails.tribemanId==$scope.tribesman.tribemanId)
        {
           $scope.isLoggedUser=true;

        }
    }

    $scope.slickCurrentIndex = 0;
    $rootScope.slickConfig1Loaded = true;

    $rootScope.slickConfig = {
      enable:true,
      autoplay: false,
      infinite: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      method: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('before change', Math.floor((Math.random() * 10) + 100));
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          $scope.slickCurrentIndex = currentSlide;
        },
        rm:function(event, slick, currentSlide, nextSlide){
          
        }
      }
    };



    $scope.addPictureOpen = function(type) {
        var modalInstance = $modal.open({
            templateUrl: 'js/app/tribe/templates/profile/categories/tribeman.picture.add.html',
            controller: function($scope, $modalInstance,$rootScope,albumOrPicture,albumNm) {
                $scope.albumOrPicture=albumOrPicture;

                $scope.albumNm=albumNm;
                //console.log($scope.albumOrPicture)
                $scope.loggedInTribeman = $stateParams;
                $scope.loggedInTribemanDetails = JSON.parse(localStorage.getItem('loggedInTribeman'));
                $scope.isLoggedin = ($scope.loggedInTribeman.tribemanId === $scope.loggedInTribemanDetails.tribemanId) ? true : false;
                $scope.pictureData = {};

                $scope.isBase64='img/tribeImgs/picture_p.png';
                $scope.changeFile=function(){
                    if(angular.isUndefined($scope.pictureData.picture))
                    {
                       $scope.isBase64='img/tribeImgs/picture_p.png';
                    }
                    else
                    {
                        var typePic=$scope.pictureData.picture.filetype;
                        $scope.isBase64="data:"+typePic+";base64,"+$scope.pictureData.picture.base64;    
                    }
                }

                $scope.availableAlbums= _.map($rootScope.allAlbums,'album');


                $scope.addPicture = function(pictureFormData) {

                    if (pictureFormData.picture.data !== null) {
                        $scope.picChooseError = false;
                        $rootScope.shwLoad = true;
                        var pictureData = {},typePic=pictureFormData.picture.filetype,extentionValue=typePic.split("/");
                        pictureData.tribemanId = $scope.loggedInTribeman.tribemanId;
                        //pictureData.picture = pictureFormData.picture.data;

                        pictureData.picture = "data:"+typePic+";base64,"+pictureFormData.picture.base64;
                        pictureData.imageTitle = pictureFormData.imageTitle;
                        pictureData.description = pictureFormData.description;
                        if($scope.albumOrPicture=='image')
                       {
                         // var albumnm = (pictureFormData.album)?pictureFormData.album[0]:'';
                         // pictureData.album=albumnm.trim();
                         //pictureData.album=(pictureFormData.album).trim();

                         pictureData.album=($scope.albumNm).trim();

                        }
                        else
                        {
                            pictureData.album=(pictureFormData.album).trim();
                        }
                        pictureData.longitude = '';
                        pictureData.picturePath = '';
                        pictureData.hashtags = '';
                        pictureData.location = '';
                        pictureData.latitude = '';
                        pictureData.fileExtension=extentionValue[1],
                        pictureData.privacyRule="ONLY_ME";

                        
                        var obj=[];
                        obj[0]=pictureData;
                        var duplicateIndex=_.findIndex($scope.availableAlbums, function(o) { return o.toLowerCase() ==(pictureData.album).toLowerCase(); });


                        if(($scope.albumOrPicture=='album' && (duplicateIndex==-1))||$scope.albumOrPicture=='image'){


                        //console.log(obj);
                        tribeService.addTribemanPictureCDN(obj).success(function(res) {
                             $scope.close();
                           
                            $rootScope.shwLoad = false;
                            $rootScope.tribemanPictureCount=parseInt($rootScope.tribemanPictureCount)+1;

                            
                            $rootScope.totalAlbumPics=$rootScope.tribemanPictureCount;
                            $rootScope.isAddDelete=true;
                            if($rootScope.albumPictures)
                              {

                                tribeService.setPictureRefresh({ 'tribePicture': $rootScope.totalAlbumPics });
                                  $rootScope.AlbumDetails(pictureData.album,0);

                              }
                             else
                              {
                                $rootScope.tribemanPictureCount+=1;
                               //tribeService.setTribeProfileTab("pictures"+$rootScope.tribemanPictureCount);

                                var albums=_.map($rootScope.tribemanAlbumPicutures,'album');
                                //console.log(_.indexOf(albums,pictureData.album))

                                if(_.indexOf(albums,pictureData.album)==-1)
                                {
                                    $rootScope.tribemanPictureCount+=1;
                                    var response=res.result.result[0],obj={"promoPic":response['picturePath'],"count":1,"album":response['album']};

                                    $rootScope.tribemanAlbumPicutures.push(obj);
                                    $rootScope.totalAlbum=$rootScope.tribemanPictureCount;


                                    //$scope.slickConfig.events.reInit();
                                }

                               }

                        });

                      }
                      else
                      {
                        growl.error("Album "+pictureData.album+" is already in use.", {
                            ttl: 5000
                        });
                        $scope.duplicateError = "Album "+pictureData.album+" is already in use.";
                      }
                    } else {
                        $scope.picChooseError = true;
                    }

                };
                $scope.close = function() {
                    $modalInstance.dismiss('cancel');
                };
            },
            windowClass: 'md',
            resolve: {
                albumOrPicture: function() {
                        return type;
                },
                albumNm: function() {
                        return $scope.album;
                }
            }
        });
        modalInstance.result.then(function(registerModel) {}, function() {});
    };
    $rootScope.tribemanPictureList = function() {
        
        $scope.loadingAlbum=true;

        
        tribeService.getTribemanAlbumCDN($scope.tribesman.tribemanId).success(function(res) {
            if (res && res.length > 0) {
             

                var data=[];

                angular.forEach(res, function(v,r){
                    if(!_.isNull(v.album))
                    {
                        data.push(v)
                    }
                })
                $rootScope.tribemanAlbumPicutures =_.orderBy(data, ['createdAt'], ['asc']);
                $rootScope.shwLoad = false;
                var sumPictures=_.map(res,'count').reduce(function(a,b){return a+b}, 0);
                $rootScope.tribemanPictureCount=sumPictures;
                $rootScope.allAlbums=$rootScope.tribemanAlbumPicutures;
                $rootScope.totalAlbum=sumPictures;
                     
            }
            else if(res.length==0)
            {
                $rootScope.tribemanPictureCount=0;
                $rootScope.totalAlbum=0;
                $rootScope.tribemanAlbumPicutures=[];
            }
            $scope.loadingAlbum=false;
        });


    };
    $rootScope.tribemanPictureList();



    $scope.currentAlnum=-1;
    
    $rootScope.AlbumDetails=function(album,index){
        $scope.currentAlnum=index
        $scope.loadingPictureAlbum=true;
        $rootScope.albumPictures=true;
        $scope.album=album;
        // This is using CDN--First Parameter is tribenameId and second is albumname
        tribeService.getTribemanAlbumPictureCDN($scope.tribesman.tribemanId,album).success(function(res) {
            if (res && res.length > 0) {
                $scope.tribemanPicutures = res;
                angular.forEach($scope.tribemanPicutures, function(value, key) {
                      $scope.tribemanPicutures[key]['picture']=value.picturePath;
                    });
                $rootScope.shwLoad = false;
                $rootScope.totalAlbumPics=$scope.tribemanPicutures.length;
                 $scope.loadingPictureAlbum=false;
            }
            else if(res.length==0)
            {
                $scope.tribemanPicutures=[];
            }
        });

    }



    // Delete Album
    $scope.deleteAlbum=function(object,nm){
        console.log(nm)
       tribeService.getTribemanAlbumPictureCDN($scope.tribesman.tribemanId,nm).success(function(res) {
           if (res.length==0||res.length==1) {
               var modalInstance = $modal.open({
                 templateUrl: 'js/app/tribe/common/templates/delete.modal.view.html',
                 controller: 'deletePictureModalController',
                 windowClass: 'tribeCreate-modal-window',
                 resolve: {
                     tribemanId: function() {
                             return $scope.tribesman.tribemanId;
                     },
                     pictureObject:function() {
                             return object;
                     },
                     isAlbum:function(){
                         return true;
                     }
                 }

             });
              
           }
           else
           {
              growl.error("Album "+object.album+" contains some pictures.Delete pictures before deleting album", {
                  ttl: 5000
              });
           }
            
        });



    }

    }]); 



 app.controller('deletePictureModalController', ['$scope', 'tribemanId', 'pictureObject', '$modalInstance', 'isAlbum','tribeService','$rootScope', function($scope, tribemanId, pictureObject, $modalInstance, isAlbum,tribeService,$rootScope) {
    $scope.title=pictureObject.album;
    if(isAlbum)
    {$scope.info="album";}
    else
    {$scope.info="picture";}

    $scope.ok=function(){
        if(isAlbum)
        {
            //Delete Album using CDN
         tribeService.deleteTribemanAlbumCDN(tribemanId,encodeURI(pictureObject.album)).success(function(res) {
             $rootScope.totalAlbum=$rootScope.totalAlbum-1
            
             var index=_.findIndex($rootScope.tribemanAlbumPicutures, function(o) { return o.album == pictureObject.album; });


             $rootScope.tribemanAlbumPicutures.splice(index,1);

             $rootScope.isAddDelete=true;

             tribeService.setTribeProfileTab("deletepictures"+$rootScope.totalAlbum);

         });   
        }
        else
        {
            //Delete Album picture using CDN
               tribeService.deleteTribemanAlbumPictureCDN(tribemanId,pictureObject.tribemanPictureId,encodeURI(pictureObject.album)).success(function(res) {
                    $rootScope.albumPictures=true;
                    $rootScope.totalAlbumPics=$rootScope.totalAlbumPics-1
                    tribeService.setPictureRefresh({ 'tribePicture': $rootScope.totalAlbumPics });

                    $rootScope.AlbumDetails(pictureObject.album,0);
                   
               }); 
        }
        $modalInstance.dismiss('cancel');

    }
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };


}]); 