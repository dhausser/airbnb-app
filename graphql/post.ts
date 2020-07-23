import { schema } from 'nexus'

schema.objectType({
  name: 'Post',
  definition: (t) => {
    t.id('id')
    t.string('title')
    t.string('content', { nullable: true })
    t.field('author', {
      type: 'User',
      nullable: true,
      resolve(parent, _args, ctx) {
        return ctx.db.post
          .findOne({
            where: { id: parent.id },
          })
          .author()
      },
    })
    t.boolean('published')
  },
})
