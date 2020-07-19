import { objectType } from '@nexus/schema'

export const Profile = objectType({
  name: 'Profile',
  definition: (t) => {
    t.id('id')
    t.string('bio', { nullable: true })
    t.field('user', {
      type: 'User',
      resolve(profile, _args, ctx) {
        return ctx.prisma.user.findOne({
          where: { id: profile.userId },
        })
      },
    })
  },
})

// export const Profile = objectType({
//   name: 'Profile',
//   definition: (t) => {
//     t.model.id()
//     t.model.bio()
//     t.model.user()
//   }
// });
