import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { gql, useQuery, ApolloClient } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
// import * as PostsQueryTypes from './__generated__/PostsQuery'

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

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`

export const Home = ({ posts }): JSX.Element => {
  // const { loading, error, data } = useQuery<PostsQueryTypes.PostsQuery>(
  //   PostsQuery
  // )

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>{`${error.name}: ${error.message}`}</p>

  const {
    data: { viewer },
  } = useQuery(ViewerQuery)

  return (
    <div className="container">
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Home Swing</h1>

        <p className="description">
          Get started by listing your home to swing.
        </p>

        <p>{viewer.name}</p>

        <div className="grid">
          {posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="card">
                <h3>{post.title} &rarr;</h3>
                <p>{post.content}</p>
                <p>{post.author.email}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const apolloClient: ApolloClient<{}> = initializeApollo()

  // const {
  //   data: { posts },
  // } = await apolloClient.query({
  //   query: PostsQuery,
  // })

  const posts = await prisma.post.findMany({
    include: { author: true },
  })

  await apolloClient.query({
    query: ViewerQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      posts,
    },
  }
}

export default Home
