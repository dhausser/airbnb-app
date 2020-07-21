import { objectType } from '@nexus/schema'

export const Viewer = objectType({
  name: 'Viewer',
  definition: (t) => {
    t.id('id')
    t.string('name')
    t.string('status')
  },
})
