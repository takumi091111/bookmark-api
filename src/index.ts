import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '~/graphql'
import { resolvers } from '~/resolvers'
import { EXPRESS_PORT } from '~/utils/env'

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(EXPRESS_PORT, () => {
  console.log(`Server started on http://localhost:${EXPRESS_PORT}`)
  console.log(`Playground: http://localhost:${EXPRESS_PORT}/graphql`)
})
