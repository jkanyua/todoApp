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
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async create (request, reply) {
    try {
      const {auth: { credentials: { id } }} = request
      const todo = await TodoModel.create({
        title: request.payload.title,
        completed: false,
        duration_to_completion: request.payload.complete_on,
        user_id: id
      })

      const result = {
        title: todo.title,
        complete: todo.completed,
        duration_to_completion: todo.duration_to_completion
      }
      return reply.response(result).code(201)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async update (request, reply) {
    try {
      const now = new Date()
      const options = {
        where: {
          id: request.params.todoId
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
      throw error
    }
  }
  static async delete (request, reply) {
    try {
      const options = {
        where: {
          id: request.params.todoId
        }
      }

      const deleted = await TodoModel.destroy(options)
      if (deleted < 1) {
        return Boom.notFound('Todo was not found.')
      }
      return reply.response().code(204)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
