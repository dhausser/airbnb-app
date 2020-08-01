import { InMemoryCache } from '@apollo/client'
import { render, cleanup, waitFor } from '../test-utils'
import { SinglePost } from '../../pages/posts/[id]'
import { GET_POST_QUERY } from '../../apollo/queries'

const cache = new InMemoryCache({ addTypename: false })
const mockPost = {
  id: 42,
  title: 'Hello World',
  content: 'This is the hello world content',
  author: {
    email: 'alice@prisma.io',
  },
  published: false,
}
const mocks = [
  {
    request: {
      query: GET_POST_QUERY,
      variables: {
        id: '42',
      },
    },
    result: {
      data: { post: mockPost },
    },
  },
]

describe('Single post page', () => {
  afterEach(cleanup)

  it('renders without error', () => {
    render(<SinglePost />, {
      router: { query: { id: '42' } },
      mocks,
      cache,
      addTypename: false,
    })
  })

  it('matches snapshot', async () => {
    const { container } = render(<SinglePost />, {
      router: { query: { id: '42' } },
      mocks,
      cache,
      addTypename: false,
    })

    waitFor(() => expect(container).toMatchSnapshot())
  })
})
