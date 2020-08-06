import { useState, FormEvent } from 'react'
import { useMutation, gql } from '@apollo/client'
import Link from 'next/link'

import useForm from '../lib/use-form'
import { CREATE_DRAFT_MUTATION } from '../apollo/mutations'
import { Field } from '../components/field'
import { getErrorMessage } from '../lib/form'

// import styles from '../styles/Home.module.css'

interface Props {
  initial: {
    title: string
    content: string
    authorEmail: string
  }
}

export const PostForm: React.FC<Props> = ({ initial }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const { inputs, handleChange } = useForm(initial)
  const [createDraft] = useMutation(CREATE_DRAFT_MUTATION, {
    update(cache, { data: { createDraft } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: createDraft,
              fragment: gql`
                fragment NewPost on Post {
                  id
                }
              `,
            })
            return [...existingPosts, newPostRef]
          },
        },
      })
    },
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const { title, content, authorEmail } = inputs
    try {
      createDraft({
        variables: { title, content, authorEmail },
        optimisticResponse: {
          __typeName: 'Mutation',
          createDraft: {
            id: 0,
            __typeName: 'Post',
            title,
            content,
            authorEmail,
          },
        },
      })
    } catch (error) {
      setErrorMsg(getErrorMessage(error.message))
    }
  }

  return (
    <div>
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
