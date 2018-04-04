const Joi = require('joi')
const Models = require('../controllers')
console.log(Models.Todo, 'jj')
module.exports = [
  // user routes
  {
    method: 'POST',
    path: '/user',
    handler: Models.User.create,
    config: {
      validate: {
        payload: {
          password: Joi.string().required(),
          email: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: Models.User.login
  },
  {
    method: 'GET',
    path: '/todos',
    handler: Models.Todo.list,
    config: {
      auth: 'jwt'
    }
  },
  {
    method: 'POST',
    path: '/todos',
    handler: Models.Todo.create,
    config: {
      auth: 'jwt',
      validate: {
        payload: {
          title: Joi.string().required(),
          complete_on: Joi.date().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/todos/{todoId}',
    handler: Models.Todo.update,
    config: {
      auth: 'jwt',
      validate: {
        payload: {
          completed: Joi.boolean().required()
        }
      }
    }
  }
]
