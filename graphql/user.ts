import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.id('id')
    t.string('email')
    t.string('name', { nullable: true })
    t.list.field('posts', { type: 'Post' })
    t.field('profile', {
      type: 'Profile',
      nullable: true,
    })
  },
})
