import { useState, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { ApolloClient } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { useQuery, useMutation, useApolloClient, gql } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from '../components/field'
import * as PostsQueryTypes from '../__generated__/PostsQuery'

export const PostsQuery = gql`
  query PostsQuery {
    posts {
      id
      title
      content
      author {
        email
      }
    }
  }
`

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

const DeletePostsMutation = gql`
  mutation DeletePosts {
    deletePosts
  }
`

export const Home = (): JSX.Element => {
  const client = useApolloClient()
  const [createDraft] = useMutation(CreateDraftMutation)
  const [deletePosts] = useMutation(DeletePostsMutation)
  const { loading, error, data } = useQuery<PostsQueryTypes.PostsQuery>(PostsQuery)
  const initialValues = { title: 'test', content: 'test', authorEmail: 'davy@prisma.io' }
  const [values, setValues] = useState(initialValues)
  const [errorMsg, setErrorMsg] = useState()

  function handleChange(event) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const { title, content, authorEmail } = values
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

  async function handleDelete() {
    const { data } = await deletePosts()
    if (data.deletePosts) {
      await client.resetStore()
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Home Swing</h1>

        <p className="description">Get started by listing your home to swing.</p>

        <button onClick={handleDelete}>Delete all</button>

        <div className="grid">
          {loading ? (
            <div className="card">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="card">
              <p>{`${error.name}: ${error.message}`}</p>
            </div>
          ) : (
            data.posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <div className="card">
                  <h3>{post.title} &rarr;</h3>
                  <p>{post.content.slice(0, 30)}...</p>
                  <p>{post.author.email}</p>
                </div>
              </Link>
            ))
          )}
          <div className="card">
            <form onSubmit={handleSubmit}>
              {errorMsg && <p>{errorMsg}</p>}
              <Field
                name="title"
                type="text"
                autoComplete="title"
                required={false}
                label="Title"
                onChange={handleChange}
              />
              <Field
                name="content"
                type="text"
                autoComplete="content"
                required={false}
                label="Content"
                onChange={handleChange}
              />
              <button type="submit">Create</button> or{' '}
              <Link href="signup">
                <a>Sign up</a>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient: ApolloClient<{}> = initializeApollo()

  await apolloClient.query({
    query: PostsQuery,
  })

  // Pass post data to the page via props
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Home
