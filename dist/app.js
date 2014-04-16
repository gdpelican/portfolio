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
;Ember.TEMPLATES["about"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Hi, I'm James</h1>");
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("About");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Projects");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Blog");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("Contact");
  }

  data.buffer.push("<nav>\n	");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "link-to", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "projects", options) : helperMissing.call(depth0, "link-to", "projects", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "posts", options) : helperMissing.call(depth0, "link-to", "posts", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "contact", options) : helperMissing.call(depth0, "link-to", "contact", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</nav>\n\n<main class=\"content\">\n	");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</main>\n");
  return buffer;
  
});

Ember.TEMPLATES["contact"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Call me, and call me your own</h1>\n<div>james.kiesel@gmail.com</div>\n<div>http://github.com/gdpelican</div>\n<div>http://www.linkedin.com/profile/view?id=335781157</div>");
  
});

Ember.TEMPLATES["post"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<h1>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n<article>\n	");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "body", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n</article>\n");
  return buffer;
  
});

Ember.TEMPLATES["posts"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n	<li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "post", "", options) : helperMissing.call(depth0, "link-to", "post", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

  data.buffer.push("<h1>Some Thoughts</h1>\n");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["project"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<h3>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\n<div>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n<div>");
  stack1 = helpers._triageMustache.call(depth0, "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  return buffer;
  
});

Ember.TEMPLATES["projects"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <li>\n  	<h3>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\n  	<div>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>	\n  </li>\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>");
  return buffer;
  
});