define(['jquery', 'backbone', 'ejs','text!views/friendlist1.ejs','text!views/friend.tmpl'], function($, Backbone, EJS,listtemp,friendtemp) {

    var friendlist = Backbone.View.extend({

        el:$('#container'),

        initialize: function() {

            this.data ={"title":"EJS",
            "friends": [
                { name: "Sinki",id:1},
                { name: "Niharika",id: 2},
                { name: "Joydeep",id: 3},
                { name: "Rima",id: 4},
                { name: "Nazia",id: 5}

            ]};

           
        },
        allfriends:function()
        {

             //var htmldata =mustache.to_html(listtemp,this.data);

            var htmldata = new EJS({url: listtemp}).render(data);

            this.$el.html(htmldata);
        },
        getFriend:function(id)
        {
           var friend=this.data.friends.find(function(res){

                    return res.id==id;

               });

           //  var htmldata =mustache.to_html(friendtemp,friend);


           // this.$el.html(htmldata);

        }


    });

    return friendlist;

})
