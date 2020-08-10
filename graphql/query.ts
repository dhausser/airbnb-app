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
        // const post = await ctx.prisma.post.findOne({
        //   where: { id: Number(id) },
        //   include: { author: true },
        // })
        // return new Promise((resolve) => {
        //   resolve(post)
        // })
        // if (post) {
        //   return post
        // }
        // return new Promise((resolve) =>
        //   resolve({
        //     __typename: 'Post',
        //     id: 0,
        //     title: 'Hello world',
        //     content: 'Hello content world',
        //     author: {
        //       email: 'alice@prisma.io',
        //     },
        //     published: false,
        //   })
        // )
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
