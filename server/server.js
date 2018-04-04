const Hapi = require('hapi')

const server = Hapi.server({ 
  port: 5000,
  host: 'localhost'
})

// add routes
server.route([
  {
    method: 'GET',
    path: '/',
    handler: (request, response) => ({status: 'Ok', message: 'Welcome to the toDo Api!'})
  }
])

async function start() {
  try {
    await server.start()
    console.log('Server listening on port: 5000')
  } catch(error){
    console.log(error)
    throw error
  }
}

start()
