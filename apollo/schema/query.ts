import { queryType, idArg } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Query = queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        id: idArg(),
      },
      resolve(_parent, { id }, _ctx) {
        return prisma.post.findOne({
          where: { id: Number(id) },
          include: { author: true },
        })
      },
    })

    t.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, _ctx) {
        return prisma.post.findMany({
          include: { author: true },
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve(_parent, _args, _ctx) {
        return prisma.user.findMany({
          include: {
            posts: true,
            profile: true,
          },
        })
      },
    })

    t.list.field('profiles', {
      type: 'Profile',
      resolve(_parent, _args, _ctx) {
        return prisma.profile.findMany({
          include: {
            user: true,
          },
        })
      },
    })
  },
})
