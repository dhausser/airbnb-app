import { objectType } from '@nexus/schema'

export const Post = objectType({
  name: 'Post',
  definition: (t) => {
    t.id('id')
    t.string('title')
    t.string('content', { nullable: true })
    t.field('author', {
      type: 'User',
      nullable: true,
      resolve(post, _args, ctx) {
        return ctx.prisma.user.findOne({
          where: { id: post.authorId },
        })
      },
    })
    t.boolean('published')
  },
})

// export const Post = objectType({
//   name: 'Post',
//   definition: (t) => {
//     t.model.id()
//     t.model.title()
//     t.model.content()
//     t.model.author()
//     t.model.published()
//     t.model.createdAt()
//   }
// });
