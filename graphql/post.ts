import { objectType } from '@nexus/schema'
export const Post = objectType({
  name: 'Post',
  definition: (t) => {
    t.id('id')
    t.string('title')
    t.string('content', { nullable: true })
    t.field('author', { type: 'User' })
    t.boolean('published')
  },
})
