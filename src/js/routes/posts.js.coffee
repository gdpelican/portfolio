App.PostsRoute = Ember.Route.extend(
  model: -> fetchPosts => @store.findAll 'post', { order: 'date' }
)

App.PostRoute = Ember.Route.extend(
  model: (params) -> fetchPosts => @store.find 'post', params.post_id
)  

fetchPosts = (callback) ->
  if App.Post.FIXTURES
    callback()    
  else
    $.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?' + \
              'v=1.0&num=50&q=https://gdpelican.ghost.io/rss/?' + \
              'output=rss&callback=?') \
      .then (data) ->
        entries = data.responseData.feed.entries
        post_id = entries.length
        App.Post.FIXTURES = entries.map (entry) ->
          post = {}
          post.id = post_id--
          post.title = entry.title
          post.body = entry.content
          post.snippet = entry.contentSnippet
          post.date = entry.publishedDate
          post
        callback()
