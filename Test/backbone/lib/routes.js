app = {
	
	models: {},
	views: {},
	collections: {},
	routers: {},
	init: function() {
		directory = new app.views.People(directoryData);
		
		appRouter = new app.routers.Router();
		Backbone.history.start();
	}
	
}