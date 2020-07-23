import { schema } from 'nexus'

schema.objectType({
  name: 'Profile',
  definition: (t) => {
    t.id('id')
    t.string('bio', { nullable: true })
    t.field('user', {
      type: 'User',
      nullable: true,
      resolve(parent, _args, ctx) {
        return ctx.db.profile
          .findOne({
            where: { id: parent.id },
          })
          .user()
      },
    })
  },
})
