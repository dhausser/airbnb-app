import { queryType, idArg } from '@nexus/schema'

export const Query = queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        id: idArg(),
      },
      resolve(_parent, { id }, ctx) {
        return ctx.prisma.post.findOne({
          where: { id: Number(id) },
          include: { author: true },
        })
      },
    })

    t.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany({
          include: { author: true },
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
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
      resolve(_parent, _args, ctx) {
        return ctx.prisma.profile.findMany({
          include: {
            user: true,
          },
        })
      },
    })
  },
})
