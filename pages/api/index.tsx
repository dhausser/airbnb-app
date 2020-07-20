import { makeSchema } from '@nexus/schema'
import { createContext } from './context'
import { ApolloServer } from 'apollo-server-micro'
import * as types from './schema'
import * as path from 'path'

export const schema = makeSchema({
  types,
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
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
