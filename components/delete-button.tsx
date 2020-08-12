import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { getErrorMessage } from '../lib/form'
// import { GET_POSTS_QUERY } from '../apollo/queries'
import { DELETE_POST_MUTATION } from '../apollo/mutations'
import * as DeletePostTypes from '../__generated__/DeletePost'
// import * as PostsQueryTypes from '../__generated__/PostsQuery'

export const DeleteDraftButton: React.FC<DeletePostTypes.DeletePostVariables> = ({ id }) => {
  const [errorMsg, setErrorMsg] = useState<string>()
  const router = useRouter()
  const [mutate, { loading, error }] = useMutation<
    DeletePostTypes.DeletePost,
    DeletePostTypes.DeletePostVariables
  >(DELETE_POST_MUTATION, {
    variables: {
      id,
    },
    // update(cache, { data }) {
    //   const current = cache.readQuery<PostsQueryTypes.PostsQuery>({ query: GET_POSTS_QUERY }) || {
    //     posts: [],
    //   }
    //   cache.writeQuery({
    //     query: GET_POSTS_QUERY,
    //     data: {
    //       posts: current.posts.filter((post) => post.id === data?.deletePost.id),
    //     },
    //   })
    // },
    // optimisticResponse: {
    //   deletePost: {
    //     __typename: 'Post',
    //     id
    //   }
    // },
  })

  async function handleDelete() {
    try {
      const { data } = await mutate()
      if (data?.deletePost.id) {
        router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  if (loading) return <button>Deleting...</button>
  if (error)
    return (
      <p>
        {error.name}: {error.message}
      </p>
    )
  if (errorMsg) return <p>{errorMsg}</p>

  return <button onClick={handleDelete}>Delete</button>
}
