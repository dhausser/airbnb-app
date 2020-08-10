import { objectType } from '@nexus/schema'

export const Profile = objectType({
  name: 'Profile',
  definition: (t) => {
    t.id('id')
    t.string('bio', { nullable: true })
    t.field('user', {
      type: 'User',
      nullable: true,
      resolve(root, _args, ctx) {
        return ctx.prisma.profile
          .findOne({
            where: { id: root.id },
          })
          .user()
      },
    })
  },
})
