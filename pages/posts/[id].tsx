import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useQuery, gql, ApolloClient } from '@apollo/client'
import { initializeApollo } from '../../apollo/client'
import { PostsQuery } from '../index'
import * as PostQueryTypes from '../../__generated__/PostQuery'

const PostQuery = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author {
        email
      }
    }
  }
`

export const Post = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery<PostQueryTypes.PostQuery, PostQueryTypes.PostQueryVariables>(
    PostQuery,
    {
      variables: { id: id as string },
    }
  )

  return (
    <div className="grid">
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{`${error.name}: ${error.message}`}</p>
        ) : (
          <Link href="/">
            <div>
              <h3>{data.post.title} &rarr;</h3>
              <p>{data.post.content}</p>
              <p>{data.post.author.email}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  // Call an external API endpoint to get posts
  const {
    data: { posts },
  } = await apolloClient.query({
    query: PostsQuery,
  })

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => `/posts/${post.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient: ApolloClient<unknown> = initializeApollo()

  await apolloClient.query({
    query: PostQuery,
    variables: {
      id: params.id,
    },
  })

  // Pass post data to the page via props
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Post
