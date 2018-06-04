define(['jquery', 'backbone', 'mustache','text!views/friendlist.tmpl','text!views/friend.tmpl'], function($, Backbone, mustache,listtemp,friendtemp) {

    var friendlist = Backbone.View.extend({

        el:$('#container'),

        initialize: function() {

            this.data ={"friends": [
                { name: "Sinki",id:1},
                { name: "Niharika",id: 2},
                { name: "Joydeep",id: 3},
                { name: "Rima",id: 4},
                { name: "Nazia",id: 5}

            ]};

           
        },
        allfriends:function()
        {

             var htmldata =mustache.to_html(listtemp,this.data);


            this.$el.html(htmldata);
        },
        getFriend:function(id)
        {
           var friend=this.data.friends.find(function(res){

                    return res.id==id;

               });

             var htmldata =mustache.to_html(friendtemp,friend);


            this.$el.html(htmldata);

        }


    });

    return friendlist;

})
