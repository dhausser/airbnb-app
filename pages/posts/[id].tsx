import { GetServerSideProps } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { initializeApollo } from '../../apollo/client'
import { GET_POST_QUERY } from '../../apollo/queries'
import { usePost, useUpdatePost, useDeletePost } from '../../apollo/hooks'
import { PostCard } from '../../components/post-card'

import styles from '../../styles/Home.module.css'

/**
 * TODO: Update post with input variables
 * TODO: Update post cache update and optimistic response
 * TODO: Delete post cache update and optimistic response
 * TODO: Delete post redirect to homepage on succes
 */
export const SinglePost: React.FC = () => {
  const router: NextRouter = useRouter()
  const { id } = router.query
  const { loading, error, data } = usePost(id)
  const [updatePost] = useUpdatePost({
    id: data?.post.id as string,
    title: data?.post.title as string,
    content: data?.post.content,
    authorEmail: data?.post.author?.email as string,
  })
  const [deletePost] = useDeletePost({ id: data?.post.id as string })

  if (error) return <p>{`${error.name}: ${error.message}`}</p>
  if (loading || !data) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid}>
          <PostCard post={data.post} />
          <button onClick={() => updatePost()}>Update</button>
          <button onClick={() => deletePost()}>Delete</button>
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
