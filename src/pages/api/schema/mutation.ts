import { mutationType, objectType, stringArg } from '@nexus/schema'

// export const Mutation = mutationType({
//   definition(t) {
//     t.crud.createOnePost()
//     t.crud.createOneProfile()
//     t.crud.createOneUser()
//     t.crud.deleteManyPost()
//     t.crud.deleteManyProfile()
//     t.crud.deleteManyUser()
//     t.crud.deleteOnePost()
//     t.crud.deleteOneProfile()
//     t.crud.deleteOneUser()
//     t.crud.updateManyPost()
//     t.crud.updateManyProfile()
//     t.crud.updateManyUser()
//     t.crud.updateOnePost()
//     t.crud.deleteOneProfile()
//     t.crud.deleteOneUser()
//     t.crud.upsertOnePost()
//     t.crud.upsertOneProfile()
//     t.crud.upsertOneUser()
//   },
// })

export const Mutation = mutationType({
  definition(t) {
    t.field('createPost', {
      type: 'CreatePostResponse',
      args: {
        title: stringArg({ required: true }),
        content: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const post = await ctx.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            author: {
              connect: { email: 'alice@prisma.io' },
            },
          },
        })
        return { success: !!post, message: post.title, post }
      },
    })
    t.field('createUser', {
      type: 'CreateUserResponse',
      args: {
        email: stringArg({ required: true }),
        name: stringArg({ required: false }),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.prisma.user.create({
          data: {
            email: args.email,
            name: args.name,
          },
        })
        return { success: !!user, message: `${user.email} created`, user }
      },
    })
  },
})

export const CreatePostResponse = objectType({
  name: 'CreatePostResponse',
  definition(t) {
    t.boolean('success')
    t.string('message', { nullable: true })
    t.field('posts', { type: 'Post', nullable: true, list: true })
  },
})

export const CreateUserResponse = objectType({
  name: 'CreateUserResponse',
  definition(t) {
    t.boolean('success')
    t.string('message', { nullable: true })
    t.field('users', { type: 'User', nullable: true, list: true })
  },
})
