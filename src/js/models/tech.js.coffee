
App.Tech = DS.Model.extend(
  name        : DS.attr 'string'
  description : DS.attr 'text'
  icon        : DS.attr 'string'
)

App.Tech.FIXTURES = [{ 
  id: 1
  name: 'Design'
  description: 'Wee!'
  icon: 'wark.jpg' }
{ 
  id: 2
  name: 'Development'
  description: 'Wark'
  icon: 'wark2.jpg' }
{
  id: 3
  name: 'Work',
  description: 'Places I\'ve worked', 
  icon: 'wark3.jpg' }
]