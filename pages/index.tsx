import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useQuery, useMutation, useApolloClient, gql, ApolloClient } from '@apollo/client'

import { initializeApollo } from '../apollo/client'
import { Posts } from '../components/posts'
import { PostForm } from '../components/post-form'
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

const DeletePostsMutation = gql`
  mutation DeletePosts {
    deletePosts
  }
`

export const Home = (): JSX.Element => {
  const client = useApolloClient()
  const [deletePosts] = useMutation(DeletePostsMutation)
  const { loading, error, data } = useQuery<PostsQueryTypes.PostsQuery>(PostsQuery)
  const initial = { title: 'test', content: 'test', authorEmail: 'davy@prisma.io' }

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
          <Posts loading={loading} error={error} data={data} />
          <PostForm initial={initial} />
        </div>
      </main>
    </div>
  )
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient: ApolloClient<unknown> = initializeApollo()

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
