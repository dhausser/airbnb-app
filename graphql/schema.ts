import { makeSchema } from '@nexus/schema'
import path from 'path'

import { Query } from './query'
import { Mutation } from './mutation'
import { User } from './user'
import { Post } from './post'
import { Profile } from './profile'

export const schema = makeSchema({
  types: [Query, Mutation, User, Post, Profile],
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  prettierConfig: path.join(process.cwd(), 'package.json'),
})
