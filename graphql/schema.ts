import { schema, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma())

schema.objectType({
  name: 'Post', // <- Name of your type
  definition(t) {
    t.int('id') // <- Field named `id` of type `Int`
    t.string('title') // <- Field named `title` of type `String`
    t.string('body') // <- Field named `body` of type `String`
    t.boolean('published') // <- Field named `published` of type `Boolean`
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('drafts', {
      type: 'Post',
      list: true,
      resolve() {
        return [{ id: 1, title: 'Nexus', body: '...', published: false }]
      },
    })
  },
})

// schema.objectType({
//   name: 'Post',
//   definition: (t) => {
//     t.id('id')
//     t.string('title')
//     t.string('content', { nullable: true })
//     t.field('author', {
//       type: 'User',
//       nullable: true,
//       resolve(parent, _args, ctx) {
//         return ctx.db.post
//           .findOne({
//             where: { id: parent.id },
//           })
//           .author()
//       },
//     })
//     t.boolean('published')
//   },
// })

// schema.objectType({
//   name: 'User',
//   definition: (t) => {
//     t.id('id')
//     t.string('email')
//     t.string('name', { nullable: true })
//     t.list.field('posts', {
//       type: 'Post',
//       nullable: true,
//       resolve(parent, _args, ctx) {
//         return ctx.db.post.findMany({
//           where: { authorId: Number(parent.id) },
//         })
//       },
//     })
//     t.field('profile', {
//       type: 'Profile',
//       nullable: true,
//       resolve(parent, _args, ctx) {
//         return ctx.db.profile.findOne({
//           where: { userId: Number(parent.id) },
//         })
//       },
//     })
//   },
// })

// schema.objectType({
//   name: 'Profile',
//   definition: (t) => {
//     t.id('id')
//     t.string('bio', { nullable: true })
//     t.field('user', {
//       type: 'User',
//       nullable: true,
//       resolve(parent, _args, ctx) {
//         return ctx.db.profile
//           .findOne({
//             where: { id: parent.id },
//           })
//           .user()
//       },
//     })
//   },
// })

// schema.queryType({
//   definition(t) {
//     t.field('post', {
//       type: 'Post',
//       args: {
//         id: schema.idArg(),
//       },
//       resolve(_parent, { id }, ctx) {
//         return ctx.db.post.findOne({
//           where: { id: Number(id) },
//           include: { author: true },
//         })
//       },
//     })

//     t.list.field('posts', {
//       type: 'Post',
//       resolve(_parent, _args, ctx) {
//         return ctx.db.post.findMany({
//           include: { author: true },
//         })
//       },
//     })

//     t.list.field('users', {
//       type: 'User',
//       resolve(_parent, _args, ctx) {
//         return ctx.db.user.findMany({
//           include: {
//             posts: true,
//             profile: true,
//           },
//         })
//       },
//     })

//     t.list.field('profiles', {
//       type: 'Profile',
//       resolve(_parent, _args, ctx) {
//         return ctx.db.profile.findMany({
//           include: {
//             user: true,
//           },
//         })
//       },
//     })
//   },
// })

// schema.mutationType({
//   definition(t) {
//     t.field('createDraft', {
//       type: 'Post',
//       args: {
//         title: schema.stringArg({ nullable: false }),
//         content: schema.stringArg(),
//         authorEmail: schema.stringArg(),
//       },
//       resolve(_parent, args, ctx) {
//         return ctx.db.post.create({
//           data: {
//             title: args.title,
//             content: args.content,
//             author: {
//               connect: { email: args.authorEmail },
//             },
//           },
//         })
//       },
//     })

//     t.field('signupUser', {
//       type: 'User',
//       args: {
//         name: schema.stringArg(),
//         email: schema.stringArg({ nullable: false }),
//       },
//       resolve(_parent, { email, name }, ctx) {
//         return ctx.db.user.create({
//           data: { email, name },
//         })
//       },
//     })

//     t.field('createProfile', {
//       type: 'Profile',
//       args: {
//         bio: schema.stringArg(),
//         userEmail: schema.stringArg(),
//       },
//       resolve(_parent, { bio, userEmail }, ctx) {
//         return ctx.db.profile.create({
//           data: {
//             bio,
//             user: {
//               connect: { email: userEmail },
//             },
//           },
//         })
//       },
//     })
//   },
// })
