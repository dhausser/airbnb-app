import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition: (t) => {
    t.id('id')
    t.string('email')
    t.string('name', { nullable: true })
    t.list.field('posts', {
      type: 'Post',
      nullable: true,
      resolve(parent, _args, ctx) {
        return ctx.db.post.findMany({
          where: { authorId: Number(parent.id) },
        })
      },
    })
    t.field('profile', {
      type: 'Profile',
      nullable: true,
      resolve(parent, _args, ctx) {
        return ctx.db.profile.findOne({
          where: { userId: Number(parent.id) },
        })
      },
    })
  },
})
