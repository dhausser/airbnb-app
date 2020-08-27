import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from '../../apollo/client'

import { Post } from '../../components/post'
import { GET_POST_QUERY } from '../../apollo/queries'

function SinglePost() {
  const router = useRouter()
  const { id } = router.query

  return <Post id={id} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

  await apolloClient.query({
    query: GET_POST_QUERY,
    variables: {
      id: context.params?.id,
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
