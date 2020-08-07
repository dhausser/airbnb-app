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
              connect: { email: args.authorEmail as string },
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

    t.field('createProfile', {
      type: 'Profile',
      args: {
        bio: stringArg(),
        userEmail: stringArg(),
      },
      resolve(_parent, { bio, userEmail }, ctx) {
        return ctx.prisma.profile.create({
          data: {
            bio,
            user: {
              connect: { email: userEmail as string },
            },
          },
        })
      },
    })

    t.field('deletePosts', {
      type: 'Int',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.prisma.post.deleteMany({})
        return count
      },
    })
  },
})
