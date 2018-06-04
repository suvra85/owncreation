define(['jquery', 'backbone', 'mustache','text!views/app.tmpl'], function($, Backbone, mustache,tempalte) {

    var APP = Backbone.View.extend({

        initialize: function() {

            this.data ={"products": [
                { name: "Apples", price: 1.29, unit: 'lb' },
                { name: "Oranges", price: 1.49, unit: 'lb' },
                { name: "Kiwis", price: 0.33, unit: 'each' }
            ]};


            var htmldata =mustache.to_html(tempalte,this.data);


            $('body').html(htmldata);
        }

    });

    return APP;

})
