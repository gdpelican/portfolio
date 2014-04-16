App.Router.map ->
  @route 'about'
  @resource 'projects'
  @resource 'project', { path: '/projects/:project_id' }
  @route 'posts'
  @route 'post', { path: '/posts/:post_id' }
  @route 'contact'
