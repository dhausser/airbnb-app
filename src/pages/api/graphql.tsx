import { ApolloServer } from 'apollo-server-micro'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema } from '@nexus/schema'
import { createContext } from './context'
import * as types from '../../apollo/schema'
import * as path from 'path'

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
    schema: path.resolve(process.cwd(), './__generated__/schema.graphql'),
    typegen: path.resolve(process.cwd(), './__generated__/nexusTypes.ts'),
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

export default apolloServer.createHandler({ path: '/api/graphql' })
