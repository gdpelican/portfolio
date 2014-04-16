(function() {
  var App, fetchPosts;

  App = Ember.Application.create();

  App.Post = DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    snippet: DS.attr('string'),
    date: DS.attr('date')
  });

  App.Project = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('text'),
    pictureUrl: DS.attr('string'),
    date: DS.attr('datetime'),
    techs: DS.hasMany('tech', {
      async: true
    })
  });

  App.Project.FIXTURES = [
    {
      id: 1,
      name: 'Test 1',
      description: 'description 1',
      pictureUrl: 'wark.jpg',
      date: 'Mon, 26 Aug 2013 20:20:20 GMT'
    }, {
      id: 2,
      name: 'Test 2',
      description: 'description 2',
      pictureUrl: 'wark2.jpg',
      date: 'Mon, 29 Aug 2013 20:20:20 GMT'
    }
  ];

  App.Tech = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('text'),
    icon: DS.attr('string')
  });

  App.Tech.FIXTURES = [
    {
      id: 1,
      name: 'Design',
      description: 'Wee!',
      icon: 'wark.jpg'
    }, {
      id: 2,
      name: 'Development',
      description: 'Wark',
      icon: 'wark2.jpg'
    }, {
      id: 3,
      name: 'Work',
      description: 'Places I\'ve worked',
      icon: 'wark3.jpg'
    }
  ];

  App.Router.map(function() {
    this.route('about');
    this.resource('projects');
    this.resource('project', {
      path: '/projects/:project_id'
    });
    this.route('posts');
    this.route('post', {
      path: '/posts/:post_id'
    });
    return this.route('contact');
  });

  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      return this.transitionTo('post', 1);
    }
  });

  App.PostsRoute = Ember.Route.extend({
    model: function() {
      return fetchPosts((function(_this) {
        return function() {
          return _this.store.findAll('post');
        };
      })(this));
    }
  });

  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return fetchPosts((function(_this) {
        return function() {
          return _this.store.find('post', params.post_id);
        };
      })(this));
    }
  });

  fetchPosts = function(callback) {
    if (App.Post.FIXTURES) {
      return callback();
    } else {
      return $.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?' + 'v=1.0&num=50&q=http://gdpelican.blogspot.com/feeds/posts/default?' + 'output=rss&callback=?').then(function(data) {
        var post_id;
        post_id = 1;
        App.Post.FIXTURES = data.responseData.feed.entries.map(function(entry) {
          var post;
          post = {};
          post.id = post_id++;
          post.title = entry.title;
          post.body = entry.content;
          post.snippet = entry.contentSnippet;
          post.date = entry.publishedDate;
          return post;
        });
        return callback();
      });
    }
  };

  App.ProjectsRoute = Ember.Route.extend({
    model: function() {
      return this.store.findAll('project');
    }
  });

  App.ProjectRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('project', params.project_id);
    }
  });

  App.ApplicationAdapter = DS.FixtureAdapter.extend();

}).call(this);
