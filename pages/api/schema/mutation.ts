import { mutationType, stringArg } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: { email: 'alice@prisma.io' },
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
      resolve(_parent, { email, name }, ctx) {
        return ctx.prisma.user.create({
          data: { email, name },
        })
      },
    })
  },
})
