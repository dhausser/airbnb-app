import { mutationType, stringArg } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Mutation = mutationType({
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve(_parent, args, _ctx) {
        return prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: { email: args.authorEmail },
            },
          },
        })
      },
    })

    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
      },
      resolve(_parent, { email, name }, _ctx) {
        return prisma.user.create({
          data: { email, name },
        })
      },
    })
  },
})
