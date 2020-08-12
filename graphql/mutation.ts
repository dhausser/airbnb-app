import { mutationType, stringArg, idArg } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
      },
      resolve(_root, { email, name }, ctx) {
        return ctx.prisma.user.create({
          data: { email, name },
        })
      },
    })

    t.field('createProfile', {
      type: 'Profile',
      args: {
        bio: stringArg(),
        userEmail: stringArg({ nullable: false }),
      },
      resolve(_root, { bio, userEmail }, ctx) {
        return ctx.prisma.profile.create({
          include: { user: true },
          data: {
            bio,
            user: {
              connect: { email: userEmail },
            },
          },
        })
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg({ nullable: false }),
      },
      resolve(_root, { title, content, authorEmail }, ctx) {
        return ctx.prisma.post.create({
          include: { author: true },
          data: {
            title: title,
            content: content,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.field('updateDraft', {
      type: 'Post',
      args: {
        id: idArg({ nullable: false }),
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      async resolve(_root, { id, title, content }, ctx) {
        const result = await ctx.prisma.post.update({
          where: { id: Number(id) },
          include: { author: true },
          data: {
            title,
            content,
          },
        })
        if (result === null) {
          throw new Error(`No post with id of "${id}"`)
        }
        return result
      },
    })

    t.field('deletePost', {
      type: 'Post',
      args: {
        id: idArg(),
      },
      async resolve(_root, { id }, ctx) {
        const result = await ctx.prisma.post.delete({
          where: { id: Number(id) },
          include: { author: true },
        })
        if (result === null) {
          throw new Error(`No post with id "${id}"`)
        }
        return result
      },
    })

    t.field('deletePosts', {
      type: 'Int',
      async resolve(_root, _args, ctx) {
        const { count } = await ctx.prisma.post.deleteMany({})
        return count
      },
    })
  },
})
