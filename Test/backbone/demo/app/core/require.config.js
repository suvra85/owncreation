requirejs.config({

    paths: {

        "jquery": "vendor/jquery/dist/jquery.min",
        "underscore": "vendor/underscore-amd/underscore-min",
        "backbone": "vendor/backbone-amd/backbone-min"
    },
    shim:{
    	"backbone":{

    		deps:[
    			'jquery',
    			'underscore'
    			],
    		exportAs:'Backbone'
    	}


    }

});