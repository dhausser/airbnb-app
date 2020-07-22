import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-micro'
import { makeSchema } from '@nexus/schema'
import * as types from '../../apollo/schema'
import * as path from 'path'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export function createContext(): Context {
  return { prisma }
}

export const schema = makeSchema({
  types,
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'nexusTypes.ts'),
  },
})

const apolloServer = new ApolloServer({
  schema,
  context: createContext(),
  playground: true,
  introspection: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
