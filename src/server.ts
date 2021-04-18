import http from 'http'
import { ApolloServer, PubSub } from 'apollo-server-express'
import express from 'express'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

export const server = (): void => {

 const PORT: string | number = process.env.PORT || 5000
 const app: express.Application = express();
 const pubsub: PubSub = new PubSub()

 const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
   return {
    req,
    pubsub
   }
  },
 })

 server.applyMiddleware({ app: app })

 const httpServer: http.Server = http.createServer(app);
 server.installSubscriptionHandlers(httpServer);

 httpServer.listen({ port: PORT }, (): void => {

  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)

  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
 })
}