const Joi = require('joi')
const Models = require('../controllers')

module.exports = [
  // user routes
  {
    method: 'POST',
    path: '/user',
    handler: Models.User.create,
    config: {
      description: 'Create/Register a new user',
      notes: 'Returns the email of the created user',
      tags: ['api'],
      validate: {
        payload: {
          password: Joi.string().required(),
          email: Joi.string().required()
        }
      },
      auth: false

    }
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: Models.User.login,
    config: {
      description: 'Authenticate existing user',
      notes: 'Returns JSON Web Token',
      tags: ['api'],
      validate: {
        payload: {
          password: Joi.string().required(),
          email: Joi.string().required()
        }
      },
      auth: false
    }
  },
  // Todo routes
  {
    method: 'GET',
    path: '/todos',
    handler: Models.Todo.list,
    config: {
      auth: 'jwt',
      description: 'Get todos',
      notes: 'Returns users todo items',
      tags: ['api'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }

    }
  },
  {
    method: 'POST',
    path: '/todos',
    handler: Models.Todo.create,
    config: {
      auth: 'jwt',
      description: 'Create a todo item',
      notes: 'Returns the created tofo item',
      tags: ['api'],
      validate: {
        payload: {
          title: Joi.string().required(),
          complete_on: Joi.date().required()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    method: 'PUT',
    path: '/todos/{todoId}',
    handler: Models.Todo.update,
    config: {
      auth: 'jwt',
      description: 'Update a todo item',
      notes: 'Return updated todo Item',
      tags: ['api'],
      validate: {
        payload: {
          completed: Joi.boolean().required()
        },
        params: {
          todoId: Joi.number().required()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    method: 'DELETE',
    path: '/todos/{todoId}',
    handler: Models.Todo.delete,
    config: {
      auth: 'jwt',
      description: 'Delete a todo',
      notes: 'Delete a created todo',
      tags: ['api'],
      validate: {
        params: {
          todoId: Joi.number().required()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
]
