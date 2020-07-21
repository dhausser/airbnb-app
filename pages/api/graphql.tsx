import { makeSchema } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-micro'
import * as types from '../../apollo/schema'
import * as path from 'path'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  value: string
}

export function createContext(): Context {
  return { prisma, value: 'Hello world!' }
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
