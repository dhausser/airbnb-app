import { useState, FormEvent } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import Link from 'next/link'

import { getErrorMessage } from '../lib/form'
import useForm from '../lib/use-form'
import Field from '../components/field'

interface Props {
  initial: {
    title: string
    content: string
    authorEmail: string
  }
}

const CreateDraftMutation = gql`
  mutation CreateDraft($title: String!, $content: String!, $authorEmail: String!) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      author {
        email
      }
    }
  }
`

export const PostForm: React.FC<Props> = ({ initial }) => {
  const client = useApolloClient()
  const [createDraft] = useMutation(CreateDraftMutation)
  const { inputs, handleChange } = useForm()

  const [errorMsg, setErrorMsg] = useState(initial)

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const { title, content, authorEmail } = inputs
    try {
      const { data } = await createDraft({
        variables: { title, content, authorEmail },
      })
      if (data.createDraft.id) {
        await client.resetStore()
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
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
        <button type="submit">Create</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
      </form>
    </div>
  )
}
