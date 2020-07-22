import { objectType } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Profile = objectType({
  name: 'Profile',
  definition: (t) => {
    t.id('id')
    t.string('bio', { nullable: true })
    t.string('userId', { nullable: true })
    t.boolean('published')
    t.field('user', {
      type: 'User',
      nullable: true,
      resolve(parent, _args, _ctx) {
        return prisma.profile
          .findOne({
            where: { id: parent.id },
          })
          .user()
      },
    })
  },
})
