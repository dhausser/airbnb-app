import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { initializeApollo } from '../apollo/client'
import { GET_POSTS_QUERY } from '../apollo/queries'
import { Posts } from '../components/posts'
import { DeletePosts } from '../components/delete-posts'

import styles from '../styles/Home.module.css'

function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Home Swing</h1>
        <p className={styles.description}>Get started by listing your home to swing.</p>
        <DeletePosts />
        <Posts />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

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

export default HomePage
