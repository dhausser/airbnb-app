import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ApolloClient } from '@apollo/client'

import { initializeApollo } from '../apollo/client'
import { GET_POSTS_QUERY } from '../apollo/queries'
import { usePosts, useDeletePosts } from '../apollo/hooks'
import { Posts } from '../components/posts'
import { PostForm } from '../components/post-form'

import styles from '../styles/Home.module.css'

export const Home: React.FC = () => {
  const initial = { title: 'test', content: 'test', authorEmail: 'davy@prisma.io' }
  const { loading, error, data } = usePosts()
  const [deletePosts] = useDeletePosts()

  return (
    <div className={styles.container}>
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Home Swing</h1>

        <p className={styles.description}>Get started by listing your home to swing.</p>

        <button onClick={deletePosts}>Delete all</button>

        <div className={styles.grid}>
          <Posts loading={loading} error={error} data={data} />
          <PostForm initial={initial} />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
