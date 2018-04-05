const TodoModel = require('../models').Todo
const Boom = require('boom')

module.exports = class Todo {
  static async list (request, reply) {
    try {
      const {auth: { credentials: { id } }} = request
      const todos = await TodoModel.findAll({
        where: { user_id: id }
      })
      if (todos.length === 0) return Boom.notFound('No Todo Items found.')
      return todos
    } catch (e) {
      console.log(e)
      return Boom.badRequest(e.message)
    }
  }

  static async create (request, reply) {
    try {
      const {auth: { credentials: { id } }} = request
      const todo = await TodoModel.create({
        title: request.payload.title,
        completed: false,
        date_to_complete: request.payload.complete_on,
        user_id: id
      })

      const result = {
        title: todo.title,
        complete: todo.completed,
        date_to_complete: todo.date_to_complete
      }
      return reply.response(result).code(201)
    } catch (e) {
      console.log(e)
      return Boom.badRequest(e.message)
    }
  }

  static async update (request, reply) {
    try {
      const now = new Date()
      const {auth: { credentials: { id } }} = request
      const options = {
        where: {
          id: request.params.todoId,
          user_id: id
        }
      }
      const [affected] = await TodoModel.update({
        completed: request.payload.completed,
        completed_on: request.payload.completed ? now : null
      }, options)
      if (affected < 1) {
        return Boom.notFound('Todo was not found.')
      }
      return await TodoModel.findOne(options)
    } catch (error) {
      console.log(error)
      return Boom.badRequest(error.message)
    }
  }
  static async delete (request, reply) {
    try {
      const {auth: { credentials: { id } }} = request
      const options = {
        where: {
          id: request.params.todoId,
          user_id: id
        }
      }

      const deleted = await TodoModel.destroy(options)
      if (deleted < 1) {
        return Boom.notFound('Todo was not found.')
      }
      return reply.response().code(204)
    } catch (error) {
      console.log(error)
      return Boom.badRequest(error.message)
    }
  }
}
