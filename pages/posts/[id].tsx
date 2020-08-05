import { GetServerSideProps } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { initializeApollo } from '../../apollo/client'
import { GET_POST_QUERY } from '../../apollo/queries'
import { usePost } from '../../apollo/hooks'
import { Post } from '../../components/post'

import styles from '../../styles/Home.module.css'

export const SinglePost: React.FC = () => {
  const router: NextRouter = useRouter()
  const { id } = router.query

  const { loading, error, data } = usePost(id as string)

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid}>
          <Post loading={loading} error={error} data={data} />
        </div>
      </div>
    </div>
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
