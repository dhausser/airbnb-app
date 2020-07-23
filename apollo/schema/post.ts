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
      resolve(parent, _args, ctx) {
        return ctx.prisma.post
          .findOne({
            where: { id: parent.id },
          })
          .author()
      },
    })
    // t.boolean('published')
  },
})
