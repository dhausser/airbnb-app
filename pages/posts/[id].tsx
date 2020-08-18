import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import useForm from '../../lib/use-form'
import { Field } from '../../components/field'
import { GET_POST_QUERY } from '../../apollo/queries'
import { initializeApollo } from '../../apollo/client'
import { getErrorMessage } from '../../lib/form'
import { DeleteDraftButton } from '../../components/delete-button'
import styles from '../../styles/Home.module.css'
import * as PostQueryTypes from '../../__generated__/PostQuery'
import { useUpdatePost } from '../../apollo/hooks'

function SinglePost() {
  const router = useRouter()
  const { id } = router.query
  const [errorMsg, setErrorMsg] = useState<string>()
  const { loading, error, data } = useQuery<PostQueryTypes.PostQuery, PostQueryTypes.PostQueryVariables>(
    GET_POST_QUERY,
    {
      variables: { id: `${id}` },
    }
  )
  const { inputs, handleChange } = useForm({ title: data?.post.title, content: data?.post.content })
  const [mutate, { loading: loadingMutate, error: errorMutate }] = useUpdatePost(id, inputs)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await mutate()
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  if (loading || !data) return <button>Loading...</button>
  if (error)
    return (
      <p>
        {error.name}: {error.message}
      </p>
    )
  if (errorMutate)
    return (
      <p>
        {errorMutate.name}: {errorMutate.message}
      </p>
    )
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
          <DeleteDraftButton id={`${id}`} />
        </div>
      </form>
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
