import React from 'react'
import { render } from '../testUtils'
import { Post } from '../../pages/posts/[id]'

const post = {
  id: 1,
  title: 'Hello World',
  content: 'This is the hello world content',
  author: {
    email: 'alice@prisma.io',
  },
  published: false,
}

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Post post={post} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
