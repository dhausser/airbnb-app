import { useState, FormEvent } from 'react'
import { useQuery } from '@apollo/client'

import { Field } from './field'
import { DeleteDraftButton } from './delete-button'
import { GET_POST_QUERY } from '../apollo/queries'
import { useUpdatePost } from '../apollo/hooks'
import { getErrorMessage } from '../lib/form'
import useForm from '../lib/use-form'

import * as PostQueryTypes from '../__generated__/PostQuery'
import styles from '../styles/Home.module.css'

interface Props {
  id: string | string[] | undefined
}

function Post(props: Props) {
  const [errorMsg, setErrorMsg] = useState<string>()

  const { loading, error, data } = useQuery<PostQueryTypes.PostQuery, PostQueryTypes.PostQueryVariables>(
    GET_POST_QUERY,
    {
      variables: { id: String(props.id) },
    }
  )

  const { inputs, handleChange } = useForm({ title: data?.post.title, content: data?.post.content })
  const [mutate, { loading: loadingMutate, error: errorMutate }] = useUpdatePost(props.id, inputs)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await mutate()
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  if (loading || !data) return <button>Loading...</button>
  if (error) return <p>{error.message}</p>
  if (errorMutate) return <p>{errorMutate.message}</p>
  if (errorMsg) return <p>{errorMsg}</p>

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          type="text"
          autoComplete="title"
          required={false}
          label="Title"
          value={inputs.title}
          onChange={handleChange}
        />
        <Field
          name="content"
          type="text"
          autoComplete="content"
          required={false}
          label="Content"
          value={inputs.content}
          onChange={handleChange}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit">{loadingMutate ? 'Updating...' : 'Update'}</button>
          <DeleteDraftButton id={String(props.id)} />
        </div>
      </form>
    </div>
  )
}

export { Post }
