import { schema } from 'nexus'

schema.mutationType({
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: schema.stringArg({ nullable: false }),
        content: schema.stringArg(),
        authorEmail: schema.stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.db.post.create({
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
        name: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
      },
      resolve(_parent, { email, name }, ctx) {
        return ctx.db.user.create({
          data: { email, name },
        })
      },
    })

    t.field('createProfile', {
      type: 'Profile',
      args: {
        bio: schema.stringArg(),
        userEmail: schema.stringArg(),
      },
      resolve(_parent, { bio, userEmail }, ctx) {
        return ctx.db.profile.create({
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
        return (await ctx.db.post.deleteMany({})).count
      },
    })
  },
})
