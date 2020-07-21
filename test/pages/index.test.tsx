import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'

// const posts = [
//   {
//     id: 1,
//     title: 'Hello World',
//     content: 'This is the first hello world content',
//     author: {
//       email: 'alice@prisma.io',
//     },
//     published: false,
//   },
//   {
//     id: 2,
//     title: 'Hello Second World',
//     content: 'This is the second hello world content',
//     author: {
//       email: 'mark@prisma.io',
//     },
//     published: false,
//   },
//   {
//     id: 3,
//     title: 'Hello Third World',
//     content: 'This is the third hello world content',
//     author: {
//       email: 'rob@prisma.io',
//     },
//     published: true,
//   },
// ]

describe('Home page', () => {
  it('matches snapshot', () => {
    // const { asFragment } = render(<Home posts={posts} />, {})
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
