import Head from 'next/head'
import { useRef } from 'react'
import { GetServerSideProps } from 'next'
import { ApolloClient } from '@apollo/client'

import { initializeApollo } from '../apollo/client'
import { GET_POSTS_QUERY } from '../apollo/queries'
import { usePosts, useDeletePosts } from '../apollo/hooks'
import { PostForm } from '../components/post-form'
import { PostCard } from '../components/post-card'
import * as PostsQueryTypes from '../__generated__/PostsQuery'

import styles from '../styles/Home.module.css'

type Post = PostsQueryTypes.PostsQuery_posts

export const Home: React.FC = () => {
  const { loading, error, data } = usePosts()
  const [deletePosts] = useDeletePosts()
  const lastPostId = useRef<string>()
  const initial = { title: 'test title', content: 'test content', authorEmail: 'davy@prisma.io' }

  if (error) return <p>{`${error.name}: ${error.message}`}</p>
  if (loading || !data?.posts) return <p>Loading...</p>

  if (data.posts.length) {
    lastPostId.current = data.posts[data.posts.length - 1].id
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Home Swing</h1>

        <p className={styles.description}>Get started by listing your home to swing.</p>

        <button onClick={() => deletePosts()}>Delete all</button>

        <div className={styles.grid}>
          {data.posts.map((post: Post) => (
            <PostCard key={post.id as string} post={post} />
          ))}
          <PostForm initial={initial} lastPostId={lastPostId.current} />
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
