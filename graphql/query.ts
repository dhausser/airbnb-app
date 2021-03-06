import { queryType, idArg } from '@nexus/schema'

export const Query = queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        id: idArg(),
      },
      async resolve(_root, args, ctx) {
        const result = await ctx.prisma.post.findOne({
          where: { id: Number(args.id) },
          include: { author: true },
        })
        if (result === null) {
          throw new Error(`No post with id of "${args.id}"`)
        }
        return result
      },
    })

    t.list.field('posts', {
      type: 'Post',
      resolve(_root, _args, ctx) {
        return ctx.prisma.post.findMany({
          orderBy: { id: 'asc' },
          include: { author: true },
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany({
          include: {
            posts: true,
            profile: true,
          },
        })
      },
    })

    t.list.field('profiles', {
      type: 'Profile',
      resolve(_root, _args, ctx) {
        return ctx.prisma.profile.findMany({
          include: {
            user: true,
          },
        })
      },
    })
  },
})
