import { resolve } from 'path'
import { importSchema } from 'graphql-import'

export const typeDefs = importSchema(resolve(__dirname, 'schema.graphql'))
