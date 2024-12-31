const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')

const express = require('express')
const cors = require('cors')
const http = require('http')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const { makeExecutableSchema } = require('@graphql-tools/schema')

require('dotenv').config()

require('./mongodb').connectDb()

const { typeDefs, resolvers } = require('./schema')


const setContext = require('./context').setContext


const start = async () => {

  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use('/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: setContext
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start()