requirejs.config({

    paths: {

        "jquery": "vendor/jquery/dist/jquery.min",
        "underscore": "vendor/underscore-amd/underscore-min",
        "backbone": "vendor/backbone-amd/backbone-min",
        "ejs": "vendor/ejs.min",
        "text": "vendor/text",

    }

});

require(['views/router'], function(APPROUTE) {
   APPROUTE.run();
})
