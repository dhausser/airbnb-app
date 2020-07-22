import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import * as PostsQueryTypes from './__generated__/PostsQuery'

// import { GetStaticProps } from 'next'
// import { initializeApollo } from '../apollo/client'

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

export const Home = (): JSX.Element => {
  const { loading, error, data } = useQuery<PostsQueryTypes.PostsQuery>(
    PostsQuery
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>{`${error.name}: ${error.message}`}</p>

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

        <div className="grid">
          {data.posts.map((post) => (
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

// export const getStaticProps: GetStaticProps = async () => {
//   const apolloClient: ApolloClient<{}> = initializeApollo()

//   // await apolloClient.query({
//   //   query: PostsQuery,
//   // })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

export default Home
