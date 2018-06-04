requirejs.config({
   // baseUrl:'scripts',
    paths: {
        "jquery": "libs/jquery",
        "backbone": "libs/backbone",
        "underscore": "libs/underscore",
        "mustache":"libs/mustache",
        "text":"libs/text"

    }

});


require(['my/module'], function(APPVIEW) {
    //new APPVIEW();
})