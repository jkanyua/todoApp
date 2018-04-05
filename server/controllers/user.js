const jwt = require('jsonwebtoken')
const UserModel = require('../models').User
const Boom = require('boom')
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = class User {
  static async login (request, reply) {
    try {
      const user = await UserModel.findOne({ where: {
        email: request.payload.email
      }})
      if (!user) {
        return Boom.unauthorized()
      }
      const isValidPassword = await bcrypt.compare(request.payload.password, user.password)

      if (!isValidPassword) {
        return Boom.unauthorized()
      }

      const payload = { email: user.email, id: user.id }
      const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '10h'})
      return {
        status: 'OK',
        message: 'Authentication Successful',
        token
      }
    } catch (e) {
      console.log(e)
      return Boom.badRequest(e.message)
    }
  }
  static async create (request, reply) {
    try {
      // hash password, this can also be done on a presave hook on DB
      const password = await bcrypt.hash(request.payload.password, saltRounds)

      await UserModel.create({
        email: request.payload.email,
        password
      })
      return {
        status: 'OK',
        message: 'User Created',
        email: request.payload.user
      }
    } catch (e) {
      console.log(e)
      return Boom.badRequest(e.message)
    }
  }
  static async validate (decoded, request) {
    const user = await UserModel.findOne({ where: {
      id: decoded.id
    }})
    if (!user) {
      return { isValid: false }
    }
    return { isValid: true }
  }
}
