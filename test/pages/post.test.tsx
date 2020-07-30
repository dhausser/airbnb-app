import { InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { render, cleanup, waitFor } from '../test-utils'
import { Post } from '../../pages/posts/[id]'
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
    render(
      <MockedProvider mocks={mocks} cache={cache}>
        <Post />
      </MockedProvider>,
      {
        router: { query: { id: '42' } },
      }
    )
  })

  it('matches snapshot', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} cache={cache}>
        <Post />
      </MockedProvider>,
      {
        router: { query: { id: '42' } },
      }
    )

    waitFor(() => expect(container).toMatchSnapshot())
  })
})
