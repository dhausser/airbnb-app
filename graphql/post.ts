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
        const result = await ctx.prisma.post.findOne({
          where: { id: root.id },
          include: { author: true },
        })
        if (result === null) {
          throw new Error(`No post with id:${root.id}`)
        }
        return result.author
      },
    })
    t.boolean('published')
  },
})
