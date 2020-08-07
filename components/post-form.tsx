import { useState, FormEvent } from 'react'
import Link from 'next/link'

import useForm from '../lib/use-form'
import { useCreateDraft } from '../apollo/hooks'
import { Field } from '../components/field'
import { getErrorMessage } from '../lib/form'
import { ApolloCache, NormalizedCacheObject } from '@apollo/client'
import { GET_POSTS_QUERY } from '../apollo/queries'
import * as PostsQueryTypes from '../__generated__/PostsQuery'
import * as CreateDraftMutationTypes from '../__generated__/CreateDraft'

// import styles from '../styles/Home.module.css'

interface Props {
  initial: {
    title: string
    content: string
    authorEmail: string
  }
  lastPostId: string | null
}

interface UpdateType {
  data: CreateDraftMutationTypes.CreateDraft
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
          __typeName: 'Mutation',
          createDraft: {
            __typeName: 'Post',
            id: optimisticId,
            title,
            content,
            author: { email: authorEmail },
          },
        },
        update(cache: ApolloCache<NormalizedCacheObject>, { data: { createDraft } }: UpdateType) {
          const data = cache.readQuery({ query: GET_POSTS_QUERY }) as PostsQueryTypes.PostsQuery
          cache.writeQuery({
            query: GET_POSTS_QUERY,
            data: {
              posts: [...data.posts, createDraft],
            },
          })
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
