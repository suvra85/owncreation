$(document).ready(function(){
    
    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:0,
        nav:true,
        dots:false,
        //navContainer:false,
        navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
        responsive:{
            0:{
                items:1,
                slideBy:5
            },
            600:{
                items:5,
                slideBy:5
            },
            1000:{
                items:7,
                slideBy:7
            }
        }
    })
});
