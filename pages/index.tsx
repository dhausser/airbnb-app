import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useApolloClient, ApolloClient } from '@apollo/client'

import { initializeApollo } from '../apollo/client'
import { GET_POSTS_QUERY } from '../apollo/queries'
import { usePosts, useDeletePosts } from '../apollo/hooks'
import { Posts } from '../components/posts'
import { PostForm } from '../components/post-form'

export const Home: React.FC = () => {
  const client = useApolloClient()
  const { loading, error, data } = usePosts()
  const [deletePosts] = useDeletePosts()
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
    query: GET_POSTS_QUERY,
  })

  // Pass post data to the page via props
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Home
