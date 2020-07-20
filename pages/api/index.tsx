import { makeSchema } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-micro'
import * as types from './schema'
import * as path from 'path'

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient
}

export const createContext = (): Context => ({
  prisma,
})

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(process.cwd(), 'pages', 'api', 'schema.graphql'),
    typegen: path.join(process.cwd(), 'pages', 'api', 'nexusTypes.ts'),
  },
})

const apolloServer = new ApolloServer({
  schema,
  context: createContext(),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api' })
