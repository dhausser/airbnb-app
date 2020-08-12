import { useState, FormEvent } from 'react'
import Link from 'next/link'

import useForm from '../lib/use-form'
import { useCreateDraft } from '../apollo/hooks'
import { Field } from '../components/field'
import { getErrorMessage } from '../lib/form'
import { GET_POSTS_QUERY } from '../apollo/queries'
import * as PostsQueryTypes from '../__generated__/PostsQuery'

import styles from '../styles/Home.module.css'

interface Props {
  initial: {
    title: string
    content: string
    authorEmail: string
  }
  lastPostId?: string | undefined
}

export const PostForm: React.FC<Props> = ({ initial, lastPostId }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const { inputs, handleChange } = useForm(initial)
  const [createDraft] = useCreateDraft()
  const optimisticId = lastPostId ? `${parseInt(lastPostId) + 1}` : '0'

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const { title, content, authorEmail } = inputs

    try {
      createDraft({
        variables: { title, content, authorEmail },
        optimisticResponse: {
          createDraft: {
            __typename: 'Post',
            id: optimisticId,
            title,
            content,
            author: {
              __typename: 'User',
              email: authorEmail,
            },
          },
        },
        update(cache, { data }) {
          const current = cache.readQuery<PostsQueryTypes.PostsQuery>({ query: GET_POSTS_QUERY }) || {
            posts: [],
          }
          cache.writeQuery({
            query: GET_POSTS_QUERY,
            data: {
              posts: [...current.posts, data?.createDraft],
            },
          })
        },
      })
    } catch (error) {
      setErrorMsg(getErrorMessage(error.message))
    }
  }

  return (
    <div className={styles.card}>
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
