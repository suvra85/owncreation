'use strict';

angular.module('slickExampleApp', ['slickCarousel', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/other', {
        templateUrl: 'views/home.html',
        controller: 'SlickController'
      })
      .when('/', {
        templateUrl: 'views/other.html',
        controller: 'SlickControllerTest'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])
.controller('SlickControllerTest', function ($scope, $timeout) {
$scope.products=[
        {
            id: 1,
            name: 'The Square Pair',
            price: 100.00,
            description: 'Bold & solid.',
            image: 'https://snipcart.com/media/10171/glasses1.jpeg'
        },
        {
            id: 2,
            name: 'The Hip Pair',
            price: 110.00,
            description: 'Stylish & fancy.',
            image: 'https://snipcart.com/media/10172/glasses2.jpeg'
        },
        {
            id: 3,
            name: 'The Science Pair',
            price: 30,
            description: 'Discreet & lightweight.',
            image: 'https://snipcart.com/media/10173/glasses3.jpeg'
        }
    ];

    $scope.slickConfig1Loaded = true;
    $scope.updateNumber1 = function () {
      $scope.slickConfig1Loaded = false;
      var last_id=parseInt($scope.products[($scope.products.length)-1]['id'])+1;
      var obj = {
            id: last_id,
            name: 'The Square Pair',
            price: 100.00,
            description: 'Bold & solid.',
            image: 'https://snipcart.com/media/10171/glasses1.jpeg'
        };

      $scope.products.push(obj);
      $timeout(function () {
        $scope.slickConfig1Loaded = true;
        
      }, 5);



    };
    $scope.slickCurrentIndex = 0;
   
    $scope.slickConfig = {
      enable:true,
      autoplay: true,
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

          console.log($scope.slickCurrentIndex)
        },
        breakpoint: function (event, slick, breakpoint) {
          console.log('breakpoint');
        },
        destroy: function (event, slick) {
          console.log('destroy');
        },
        edge: function (event, slick, direction) {
          console.log('edge');
        },
        reInit: function (event, slick) {
          console.log('re-init');
        },
        init: function (event, slick) {
          console.log('init');
        },
        setPosition: function (evnet, slick) {
          console.log('setPosition');
        },
        swipe: function (event, slick, direction) {
          console.log('swipe');
        },
        rm:function(event, slick, currentSlide, nextSlide){
          //console.log(event,($scope.products.length)-1)
          $scope.slickConfig.method.slickRemove(event);
          $scope.products.splice(event,1);
        // if($scope.products>3)
        // {
        //   $scope.slickConfig.method.slickRemove(event);
        //   $scope.products.splice(event,1);
        // }
        // else
        // {
        //   $scope.products.splice(event,1);
        //   $scope.slickConfig.method.slickRemove(event);

        // }


          if($scope.products.length < 4)
          {
            $scope.slickConfig.enable=false;
            if($scope.products.length==0)
            {
               $scope.slickConfig.method.slickRemove(0);
            }
            else
            {
              // $scope.slickConfig.enable=false;
              // var current=$scope.products[event];
              // var last=$scope.products[($scope.products.length)-1];
              // $scope.products[event]=last;
              // $scope.products[($scope.products.length)-1]=current;
              // $scope.slickConfig.method.slickRemove(event);

              if(event!=(($scope.products.length)-1))
              {

              }
              else
              {

                 $scope.slickConfig.method.slickRemove(event);
                  console.log("if else")
              }


            }



          }
          else
          {
            $scope.slickConfig.method.slickRemove(event);


          }

        }
      }
    };


})
  .controller('SlickController', function ($scope, $timeout) {
    //====================================
    // Slick 1
    //====================================
    $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.slickConfig1Loaded = true;
    $scope.updateNumber1 = function () {
      $scope.slickConfig1Loaded = false;
      $scope.number1[2] = '123';
      $scope.number1.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig1Loaded = true;
      }, 5);
    };
    $scope.slickCurrentIndex = 0;
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      initialSlide: 3,
      infinite: true,
      autoplaySpeed: 1000,
      method: {},
      event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('before change', Math.floor((Math.random() * 10) + 100));
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          $scope.slickCurrentIndex = currentSlide;
        },
        breakpoint: function (event, slick, breakpoint) {
          console.log('breakpoint');
        },
        destroy: function (event, slick) {
          console.log('destroy');
        },
        edge: function (event, slick, direction) {
          console.log('edge');
        },
        reInit: function (event, slick) {
          console.log('re-init');
        },
        init: function (event, slick) {
          console.log('init');
        },
        setPosition: function (evnet, slick) {
          console.log('setPosition');
        },
        swipe: function (event, slick, direction) {
          console.log('swipe');
        }
      }
    };

    //====================================
    // Slick 2
    //====================================
    $scope.number2 = [{label: 1, otherLabel: 1}, {label: 2, otherLabel: 2}, {label: 3, otherLabel: 3}, {
      label: 4,
      otherLabel: 4
    }, {label: 5, otherLabel: 5}, {label: 6, otherLabel: 6}, {label: 7, otherLabel: 7}, {label: 8, otherLabel: 8}];
    $scope.slickConfig2Loaded = true;
    $scope.updateNumber2 = function () {
      $scope.slickConfig2Loaded = false;
      $scope.number2[2] = 'ggg';
      $scope.number2.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig2Loaded = true;
      });
    };

    $scope.slickConfig2 = {
      autoplay: true,
      infinite: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      method: {}
    };

    //====================================
    // Slick 3
    //====================================
    $scope.number3 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
    $scope.slickConfig3Loaded = true;
    $scope.slickConfig3 = {
      method: {},
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    //====================================
    // Slick 4
    //====================================
    $scope.number4 = [{label: 225}, {label: 125}, {label: 200}, {label: 175}, {label: 150}, {label: 180}, {label: 300}, {label: 400}];
    $scope.slickConfig4Loaded = true;
    $scope.updateNumber4 = function () {
      $scope.slickConfig4Loaded = false;
      $scope.number4[2].label = 123;
      $scope.number4.push({label: Math.floor((Math.random() * 10) + 100)});
      $timeout(function () {
        $scope.slickConfig4Loaded = true;
      });
    };
    $scope.slickConfig4 = {
      method: {},
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    };


  });

