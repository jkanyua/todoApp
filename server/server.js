const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Routes = require('./routes')
const validate = require('./controllers').User.validate
const Pack = require('./package')

require('dotenv-safe').config()

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: true
  }
})

const swaggerOptions = {
  info: {
    title: 'Todo API Documentation',
    version: Pack.version
  }
}
async function start () {
  try {
    await server.register([
      require('hapi-auth-jwt2'),
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        optiojns: swaggerOptions
      }
    ])

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.SECRET,
      validate,
      verifyOptions: {algorithms: ['HS256']}
    })
    server.auth.default('jwt')

    // add routes
    server.route([
      {
        method: 'GET',
        path: '/',
        handler: (request, response) => ({status: 'Ok', message: 'Welcome to the toDo Api!'}),
        config: {
          auth: false
        }
      },
      ...Routes
    ])

    await server.start()
    console.log('Server listening on port: 5000')
  } catch (error) {
    console.log(error)
    throw error
  }
}

start()
