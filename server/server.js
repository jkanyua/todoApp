const Hapi = require('hapi')
const Routes = require('./routes')
const validate = require('./controllers').User.validate

const server = Hapi.server({
  port: 5000,
  host: 'localhost'
})
require('dotenv-safe').config()

async function start () {
  try {
    await server.register(require('hapi-auth-jwt2'))
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.SECRET,
      validate,
      verifyOptions: {algorithms: ['HS256']}
    })
    server.auth.default('jwt')

    // add routes
    server.route([
      ...Routes,
      {
        method: 'GET',
        config: { auth: 'jwt' },
        path: '/',
        handler: (request, response) => ({status: 'Ok', message: 'Welcome to the toDo Api!'})
      }
    ])

    await server.start()
    console.log('Server listening on port: 5000')
  } catch (error) {
    console.log(error)
    throw error
  }
}

start()
