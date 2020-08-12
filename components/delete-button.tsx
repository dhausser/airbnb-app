import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { getErrorMessage } from '../lib/form'
import { DELETE_POST_MUTATION } from '../apollo/mutations'
import * as DeletePostTypes from '../__generated__/DeletePost'

/**
 * TODO: Avoid rerender of post page after delete mutation is complete as it results in an error
 */

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
    onCompleted() {
      router.push('/')
    },
  })

  async function handleDelete() {
    try {
      await mutate()
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
