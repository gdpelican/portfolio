
App.Post = DS.Model.extend(
  title       : DS.attr 'string'
  body        : DS.attr 'string'
  snippet     : DS.attr 'string'
  date        : DS.attr 'date'
)
