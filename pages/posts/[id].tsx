import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { initializeApollo } from '../../apollo/client'
import { GET_POST_QUERY } from '../../apollo/queries'
import { usePost, useUpdatePost, useDeletePost } from '../../apollo/hooks'
import { PostCard } from '../../components/post-card'
import { getErrorMessage } from '../../lib/form'

import styles from '../../styles/Home.module.css'

/**
 * TODO: Update post with input variables
 * TODO: Update post cache update and optimistic response
 * TODO: Delete post cache update and optimistic response
 * TODO: Delete post redirect to homepage on succes
 */
export const SinglePost: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const router: NextRouter = useRouter()
  const { id } = router.query
  const { loading, error, data } = usePost(id)
  const [updateDraft] = useUpdatePost({
    id: data?.post.id as string,
    title: data?.post.title as string,
    content: data?.post.content,
    authorEmail: data?.post.author?.email as string,
  })
  const [deletePost] = useDeletePost({ id: data?.post.id as string })

  // async function handleUpdate(event: FormEvent<HTMLFormElement>) {
  async function handleUpdate() {
    // event.preventDefault()

    try {
      const { data } = await updateDraft()
      if (data?.updateDraft.id) {
        router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  async function handleDelete() {
    try {
      const { data } = await deletePost()
      if (data?.deletePost.id) {
        router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  if (errorMsg) return <p>{errorMsg}</p>
  if (error) return <p>{`${error.name}: ${error.message}`}</p>
  if (loading || !data) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid}>
          <PostCard post={data.post} />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
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
