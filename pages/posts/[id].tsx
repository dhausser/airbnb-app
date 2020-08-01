import { useRouter, NextRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from '../../apollo/client'
import { Post } from '../../components/post'
import { GET_POSTS_QUERY, GET_POST_QUERY } from '../../apollo/queries'
import { usePost } from '../../apollo/hooks'
import { PostQuery_post } from '../../__generated__/PostQuery'

export const SinglePost: React.FC = () => {
  const router: NextRouter = useRouter()
  const { id } = router.query

  const { loading, error, data } = usePost(id as string)

  return (
    <div className="grid">
      <Post loading={loading} error={error} data={data} />
    </div>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

  // Call an external API endpoint to get posts
  const { data } = await apolloClient.query({
    query: GET_POSTS_QUERY,
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.posts.map((post: PostQuery_post) => `/posts/${post.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

  await apolloClient.query({
    query: GET_POST_QUERY,
    variables: {
      id: params?.id,
    },
  })

  // Pass post data to the page via props
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default SinglePost
