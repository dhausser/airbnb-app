import { InMemoryCache } from '@apollo/client'
import { render, cleanup, waitFor } from '../test-utils'
import { GET_POSTS_QUERY } from '../../apollo/queries'
import Home from '../../pages/index'

const cache = new InMemoryCache({ addTypename: false })
const mockPosts = [
  {
    id: 1,
    title: 'Hello World',
    content: 'This is the first hello world content',
    author: {
      email: 'alice@prisma.io',
    },
    published: false,
  },
  {
    id: 2,
    title: 'Hello Second World',
    content: 'This is the second hello world content',
    author: {
      email: 'mark@prisma.io',
    },
    published: false,
  },
  {
    id: 3,
    title: 'Hello Third World',
    content: 'This is the third hello world content',
    author: {
      email: 'rob@prisma.io',
    },
    published: true,
  },
]
const mocks = [
  {
    request: {
      query: GET_POSTS_QUERY,
    },
    result: {
      data: {
        posts: mockPosts,
      },
    },
  },
]

describe('Home page', () => {
  afterEach(cleanup)

  it('renders without error', () => {
    render(<Home />, {
      mocks,
      cache,
      addTypename: false,
    })
  })

  it('matches snapshot', () => {
    const { container } = render(<Home />, {
      mocks,
      cache,
      addTypename: false,
    })

    waitFor(() => expect(container).toMatchSnapshot())
  })
})
