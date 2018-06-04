requirejs.config({

    paths: {

        "jquery": "vendor/jquery/dist/jquery.min",
        "underscore": "vendor/underscore-amd/underscore-min",
        "backbone": "vendor/backbone-amd/backbone-min",
        "mustache": "vendor/mustache",
        "text": "vendor/text",


    }

});

require(['views/app'], function(APPVIEW) {
    new APPVIEW();
})
