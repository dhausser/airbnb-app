import { GetServerSideProps } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { initializeApollo } from '../../apollo/client'
import { GET_POST_QUERY } from '../../apollo/queries'
import { usePost } from '../../apollo/hooks'
import { Post } from '../../components/post'

import { Grid } from '../../shared/styles'

export const SinglePost: React.FC = () => {
  const router: NextRouter = useRouter()
  const { id } = router.query

  const { loading, error, data } = usePost(id as string)

  return (
    <Grid>
      <Post loading={loading} error={error} data={data} />
    </Grid>
  )
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
