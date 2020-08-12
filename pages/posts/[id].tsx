import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { initializeApollo } from '../../apollo/client'
import { GET_POST_QUERY } from '../../apollo/queries'
import { usePost } from '../../apollo/hooks'
import { PostForm } from '../../components/post-form'
import { UpdateDraftButton, DeleteDraftButton } from '../../components/action-button'

import styles from '../../styles/Home.module.css'

export const SinglePost: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { loading, error, data } = usePost(id)

  if (error) return <p>{`${error.name}: ${error.message}`}</p>
  if (loading || !data) return <p>Loading...</p>

  const {
    title,
    content,
    author: { email: authorEmail },
  } = data.post

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid}>
          <PostForm initial={{ title, content: content as string, authorEmail }} />
          <UpdateDraftButton
            id={data.post.id}
            title={data.post.title}
            content={data.post.content}
            authorEmail={data.post.author.email}
          />
          <DeleteDraftButton id={id as string} />
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
