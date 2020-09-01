import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.id('id')
    t.string('email')
    t.string('name', { nullable: true })
    t.list.field('posts', {
      type: 'Post',
      async resolve(root, _args, ctx) {
        const result = await ctx.prisma.user
          .findOne({
            where: { id: root.id },
          })
          .posts()
        if (result === null) {
          throw new Error(`No user with id:${root.id}`)
        }
        return result
      },
    })
    t.field('profile', {
      type: 'Profile',
      nullable: true,
    })
  },
})
