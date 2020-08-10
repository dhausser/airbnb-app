import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.id('id')
    t.string('email')
    t.string('name', { nullable: true })
    t.list.field('posts', {
      type: 'Post',
      nullable: true,
      resolve(root, _args, ctx) {
        return ctx.prisma.post.findMany({
          where: { authorId: Number(root.id) },
        })
      },
    })
    t.field('profile', {
      type: 'Profile',
      nullable: true,
      resolve(root, _args, ctx) {
        return ctx.prisma.profile.findOne({
          where: { userId: Number(root.id) },
        })
      },
    })
  },
})
