const Models = require('../controllers')

module.exports = [
  {
    method: 'POST',
    path: '/user',
    handler: Models.User.create
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: Models.User.login
  }
]
