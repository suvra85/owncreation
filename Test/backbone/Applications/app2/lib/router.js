app = {
	
	models: {},
	views: {},
	collections: {},
	routers: {},
	init: function() {
		 directory = new app.views.People(directoryData);
		 // var router=new app.routers.Router();
		 // Backbone.history.start();
		
	}
	
}



// app.routers.Router = Backbone.Router.extend({
//         routes: {
//             "": "index",
//             "*actions": "defaultRoute"

//         },
//         index: function() {

//         },
//         defaultRoute: function(type) {
// 			directory.filterType = type;

//         	directory.trigger('change:filtertype');
//         }

//     });