// Backbone Model


var Blog = Backbone.Model.extend({
    default: {
        author: '',
        title: '',
        url: ''
    },
    initialize: function() {
        this.bindEvents();
    },
    validate: function(attributes) {
        var i = 0,
            errors = [];
        if (attributes.author == "") {

            errors.push({ 'attribute': 'author', 'error': 'Please Enter author name' });
            i++;

        }
        if (attributes.title == "") {
            errors.push({ 'attribute': 'title', 'error': 'Please Enter title' });
            i++;

        }
        if (attributes.url == "") {
            errors.push({ 'attribute': 'url', 'error': 'Please Enter url' });
            i++;

        } else if (!this.urltest(attributes.url)) {
            errors.push({ 'attribute': 'url', 'error': 'Please Enter valid url' });
            i++;

        }

        if (i > 0) return errors;
    },
    bindEvents: function() {

        //'invalid':function(){ }

    },
    urltest: function(url) {

        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;

        return pattern.test(url);

    }



});

// Backbone Collection

var Blogs = Backbone.Collection.extend({
    model: Blog,
    sortFiled: function(sortfiled, sorttype) {
        sorted = _.sortBy(this.models, function(model) {
            return model.get(sortfiled);
        });

        if (sorttype === 'desc') {
            sorted = sorted.reverse()
        }

        this.models = sorted;

    }
});

// instantiate two Blogs

var blog1 = new Blog({
    author: 'Michael',
    title: 'Michael\'s Blog',
    url: 'http://michaelsblog.com'
});
var blog2 = new Blog({
    author: 'John',
    title: 'John\'s Blog',
    url: 'http://johnsblog.com'
});

var blog3 = new Blog({
    author: 'John',
    title: 'John\'s Blog 1',
    url: 'http://johnsblog1.com'
});

// instantiate a Collection

var blogs = new Blogs([blog1, blog2, blog3]);

// Backbone View for one blog

var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.blogs-list-template').html());
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel': 'cancel',
        'click .delete-blog': 'delete',

    },
    edit: function() {
        $('.edit-blog').hide();
        $('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author-update update-input" value="' + author + '">');
        this.$('.title').html('<input type="text" class="form-control title-update update-input" value="' + title + '">');
        this.$('.url').html('<input type="text" class="form-control url-update update-input" value="' + url + '">');
    },
    update: function() {



        this.model.set('author', $('.author-update').val(), { validate: true });
        this.model.set('title', $('.title-update').val(), { validate: true });
        this.model.set('url', $('.url-update').val(), { validate: true });

        $('.update-input').next('span').remove();

        _.each(this.model.validationError, function(res) {
            var cls = res.attribute + "-update";
            var error = $('<span class="error"/>').html(res.error);
            $("." + cls).parent().append(error);

        });




    },
    cancel: function() {
        blogsView.render();
    },
    delete: function() {
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Backbone View for all blogs

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);

        self.render();
    },
    render: function() {
        var self = this;
        this.$el.html('');
        var arr = [];
        _.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
        return this;
    },
    blogFiled: function(name) {
        var self = this;
        this.$el.html('');
        var filterdata = this.model.where({ author: name });
        _.each(filterdata, function(blog) {
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
    },
    blogGeneralFiled: function(name) {
        var self = this;
        this.$el.html('');

        var filterdata = _.filter(this.model.models, function(val, key) {
            var attrval = val.attributes;
            var i = 0;
            _.each(attrval, function(v, k) {
                if (v.indexOf(name) !== -1)
                    i = 1;
            });

            if (i == 1)
                return val.attributes;

            // if ((attrval.title).indexOf(name) !== -1 || (attrval.author).indexOf(name) !== -1 || (attrval.url).indexOf(name) !== -1)
            //     return val.attributes;

        });

        if (filterdata.length > 0) {
            _.each(filterdata, function(blog) {
                self.$el.append((new BlogView({ model: blog })).render().$el);
            });

        }


    },
});





// Drop Down

// Each Option
var AuthorView = Backbone.View.extend({
    tagName: 'option',
    initialize: function(res) {
        if (typeof res != 'undefined') {
            this.name = res.nm;
        }
        this.template = _.template($('.blog-filter-template').html());
    },
    render: function() {
        if (typeof this.name != 'undefined') {
            this.$el.html(this.template({ name: this.name }));
            $(this.$el).attr('value', this.name);
        } else {
            this.$el.html(this.template({ name: 'Select Author' }));

        }

        return this;
    },
    events: {
        'change': 'filterValue',

    },
    filterValue: function(res) {

        console.log(res)
    },

});

// Select Box
var AuthorsView = Backbone.View.extend({

    el: $(".author-list"),
    initialize: function(res) {
        var self = this;
        this.authorname = res.authorname;
        self.render();

        this.on('change', this.filter, this);

    },
    render: function() {
        var self = this;
        this.$el.html('');

        self.$el.append((new AuthorView()).render().$el);
        _.each(this.authorname, function(name) {
            self.$el.append((new AuthorView({ nm: name })).render().$el);

        });
        return this;
    },
    events: {
        //'change': 'filterValue',

    },
    filterValue: function() {

        // 	if(this.$el.val()!="Select Author")
        // 	{
        //  bloglist=blogs.where({author:this.$el.val()});
        // $('.blogs-list').html('');
        // _.each(bloglist, function(blog) {
        // 	$('.blogs-list').append((new BlogView({model: blog})).render().$el);
        // });
        // 	}
        // 	else
        // 	{

        // 		$('.blogs-list').html('');
        // _.each(blogs.models, function(blog) {
        // 	$('.blogs-list').append((new BlogView({model: blog})).render().$el);
        // });
        // 	}

    },
    filter: function(res) {
        console.log('filter')

        console.log(res)
    },


});

var blogsView = new BlogsView();

var authorview = new AuthorsView({ authorname: _.uniq(blogs.pluck("author")) });


$(document).ready(function() {
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });
        $('.add-input').next('span').remove();
        if (blog.isValid()) {
            $('.author-input').val('');
            $('.title-input').val('');
            $('.url-input').val('');
            console.log(blog.toJSON());
            blogs.add(blog);
        } else {
            _.each(blog.validationError, function(res) {
                var cls = res.attribute + "-input";
                var error = $('<span class="error"/>').html(res.error);
                $("." + cls).parent().append(error);
            });

        }
    });

    $('.sort-column').on('click', function(e) {
        var sorttype = 'asc',
            sortfiled = $(this).data('sortfiled');
        if ($(this).hasClass('asc')) {
            $(this).removeClass('asc')
            $(this).addClass('desc')

        } else {
            sorttype = 'desc';
            $(this).removeClass('desc')
            $(this).addClass('asc')
        }

        blogs.sortFiled(sortfiled, sorttype);
        blogsView.render();


    });
    $(".author-list").on('change', function() {
        var name = $(this).val();
        if (name != "Select Author") {
            blogsView.blogFiled(name);
        } else {
            blogsView.render();
        }
    });

    $(".filter-input").on('keypress change keyup paste input', function(e) {
        var current = $(this),
            which = e.which;
        setTimeout(function() {
            if (current.val() != "") {
                blogsView.blogGeneralFiled(current.val().trim());
            } else {
                blogsView.render();
            }

        }, 10)
    });


});
