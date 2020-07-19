import { makeSchema } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
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
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    schema: path.join(process.cwd(), 'src', 'pages', 'api', 'schema.graphql'),
    typegen: path.join(process.cwd(), 'src', 'pages', 'api', 'nexusTypes.ts'),
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
