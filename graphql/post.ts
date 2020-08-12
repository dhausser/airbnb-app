import { objectType } from '@nexus/schema'
export const Post = objectType({
  name: 'Post',
  definition: (t) => {
    t.id('id')
    t.string('title')
    t.string('content', { nullable: true })
    t.field('author', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const result = await ctx.prisma.user.findOne({
          where: { id: root.authorId },
        })
        if (result === null) {
          throw new Error(`No post with id:${root.id}`)
        }
        return result
      },
    })
    t.boolean('published')
  },
})
