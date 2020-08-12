import { objectType } from '@nexus/schema'

export const Profile = objectType({
  name: 'Profile',
  definition: (t) => {
    t.id('id')
    t.string('bio', { nullable: true })
    t.field('user', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const result = await ctx.prisma.profile.findOne({
          where: { id: root.id },
          include: { user: true },
        })
        if (result === null) {
          throw new Error(`No profile with id:${root.id}`)
        }
        return result.user
      },
    })
  },
})
