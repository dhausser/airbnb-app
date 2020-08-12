import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { getErrorMessage } from '../lib/form'
import { UPDATE_POST_MUTATION } from '../apollo/mutations'
import * as UpdatePostTypes from '../__generated__/UpdatePost'

export const UpdateDraftButton: React.FC<UpdatePostTypes.UpdatePostVariables> = ({ id, title, content }) => {
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
        },
      })
    },
    optimisticResponse: {
      updateDraft: {
        __typename: 'Post',
        id,
        title,
        content: content || '',
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
