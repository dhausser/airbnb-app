import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        id: schema.idArg(),
      },
      resolve(_parent, { id }, ctx) {
        return ctx.db.post.findOne({
          where: { id: Number(id) },
          include: { author: true },
        })
      },
    })

    t.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        return ctx.db.post.findMany({
          include: { author: true },
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany({
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
        return ctx.db.profile.findMany({
          include: {
            user: true,
          },
        })
      },
    })
  },
})
