import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { getErrorMessage } from '../lib/form'
// import { GET_POSTS_QUERY } from '../apollo/queries'
import { UPDATE_POST_MUTATION, DELETE_POST_MUTATION } from '../apollo/mutations'
import * as UpdatePostTypes from '../__generated__/UpdatePost'
import * as DeletePostTypes from '../__generated__/DeletePost'
// import * as PostsQueryTypes from '../__generated__/PostsQuery'

export const UpdateDraftButton: React.FC<UpdatePostTypes.UpdatePostVariables> = ({
  id,
  title,
  content,
  authorEmail,
}) => {
  const [errorMsg, setErrorMsg] = useState<string>()
  const router = useRouter()
  const [mutate, { loading, error }] = useMutation<
    UpdatePostTypes.UpdatePost,
    UpdatePostTypes.UpdatePostVariables
  >(UPDATE_POST_MUTATION, {
    variables: {
      id,
      title,
      content,
      authorEmail,
    },
    update(cache) {
      cache.modify({
        id: `Post:${id}`,
        fields: {
          title() {
            return title
          },
          content() {
            return content
          },
          author(existingAuthor) {
            return { email: authorEmail, ...existingAuthor }
          },
        },
      })
    },
    optimisticResponse: {
      updateDraft: {
        __typename: 'Post',
        id,
        title,
        content: content || '',
        author: {
          __typename: 'User',
          id: '',
          name: '',
          email: authorEmail,
        },
        published: false,
      },
    },
  })

  async function handleUpdate() {
    try {
      const { data } = await mutate()
      if (data?.updateDraft.id) {
        router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  if (loading) return <button>Updating...</button>
  if (error)
    return (
      <p>
        {error.name}: {error.message}
      </p>
    )
  if (errorMsg) return <p>{errorMsg}</p>

  return <button onClick={handleUpdate}>Update</button>
}

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
