define(["backbone", "views/friendlist"], function(Backbone, friendlist) {
    var run = function() {
        bkrouter();
    };

    var bkrouter = function() {

        var self = this;

        var list = new friendlist();

        var navlist = $("#navlist li");

        var AppRouter = Backbone.Router.extend({
            routes: {
                "": "index",
                'about': "about",
                "friends/:id": "getFriend",
                "*actions": "defaultRoute"

            },
            index: function() {
                list.allfriends();

                navlist.removeClass('active');
                navlist.eq(0).addClass('active');

            },
            about: function() {
                $("#container").html('This is about page');
                navlist.removeClass('active');
                navlist.eq(1).addClass('active');

            },
            getFriend: function(id) {
                list.getFriend(id);
                navlist.removeClass('active');

            },
            defaultRoute: function() {
                $("#container").html('404 Page');

                navlist.removeClass('active');
            }

        });

        var app = new AppRouter;
        Backbone.history.start();

    };

    return {
        run: run
    };

});
