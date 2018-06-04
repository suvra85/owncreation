app = app || {};

app.views.Person = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item person ',

    render: function() {
        this.template = _.template($('#person-template').html());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'mouseover .list-header': 'toggleDetails',
        'mouseleave .list-header': 'toggleDetails',

    },
    toggleDetails: function() {

        this.$(".details").toggleClass('hidden')
    }
});

app.views.People = Backbone.View.extend({
    el: '#wrapper',

    initialize: function(data) {

        this.collection = new app.collections.People(data);
        this.render();
        this.generateFilters();
		this.on('change:filterType', this.filterByType, this);

    },

    events: {
        'keypress  #searchBox': 'filterData',
        'change #searchBox': 'filterData',
        'keyup  #searchBox': 'filterData',
        'paste  #searchBox': 'filterData',
        'input  #searchBox': 'filterData',
        'click #filters a':'filterByType'


    },
    filterData: function() {

        var current = $("#searchBox").val();
        var self = this;


        setTimeout(function() {
            if (current != "") {
                self.renderFiled(current.trim());
            } else {
                self.render();
            }

        }, 10)
    },
    renderFiled: function(search) {


        var filterdata = _.filter(this.collection.models, function(val, key) {
            var attrval = val.attributes;
            if ((attrval.firstname).indexOf(search) !== -1 || (attrval.lastname).indexOf(search) !== -1)
                return val.attributes;
        });

        if (filterdata.length > 0) {
            $("#listing").empty();
            $("#count").empty();
            _.each(filterdata, function(person) {
                $("#listing").append((new app.views.Person({ model: person })).render().$el);
            });

            this.totalfilter(filterdata.length);

        }

    },
    render: function() {

        var self = this;
        $("#listing").empty();
        _.each(this.collection.models, function(person) {

            $("#listing").append((new app.views.Person({ model: person })).render().$el);
        });

        $("#count").html('');

    },
    generateFilters: function() {
        var self = this;

        self.filtertypes = _.uniq(this.collection.pluck('type'));


        self.$el.find("#filters").append("<a href='javascript:void(0)' data-type='all'>ALL</a>&nbsp;");

        _.each(self.filtertypes, function(res) {

            self.$el.find("#filters").append("<a href='javascript:void(0)' data-type='"+res+"'>" + res.toUpperCase() + "</a>&nbsp;");

        });
    },
    filterByType:function(){

    	
    },
    totalfilter: function(total) {

        $("#count").html("Total no of items :" + total);

    }

});
