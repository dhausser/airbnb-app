import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useApolloClient, ApolloClient } from '@apollo/client'

import { initializeApollo } from '../apollo/client'
import { GET_POSTS_QUERY } from '../apollo/queries'
import { usePosts, useDeletePosts } from '../apollo/hooks'
import { Posts } from '../components/posts'
import { PostForm } from '../components/post-form'

import { Container, Title, Description, Grid } from '../shared/styles'

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
    <Container>
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Home Swing</Title>

        <Description>Get started by listing your home to swing.</Description>

        <button onClick={handleDelete}>Delete all</button>

        <Grid>
          <Posts loading={loading} error={error} data={data} />
          <PostForm initial={initial} />
        </Grid>
      </main>
    </Container>
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
