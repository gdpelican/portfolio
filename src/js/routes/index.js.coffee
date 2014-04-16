App.IndexRoute = Ember.Route.extend(
  redirect: -> @transitionTo('post', 1)
)