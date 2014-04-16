
App.Project = DS.Model.extend(
  name        : DS.attr 'string'
  description : DS.attr 'text'
  pictureUrl  : DS.attr 'string'
  date        : DS.attr 'datetime'
  techs       : DS.hasMany 'tech', { async: true }
)

App.Project.FIXTURES = [{ 
  id: 1
  name: 'Test 1'
  description: 'description 1'
  pictureUrl: 'wark.jpg'
  date: 'Mon, 26 Aug 2013 20:20:20 GMT' }
{ 
  id: 2
  name: 'Test 2'
  description: 'description 2'
  pictureUrl: 'wark2.jpg'
  date: 'Mon, 29 Aug 2013 20:20:20 GMT' }] 