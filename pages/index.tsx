import Head from 'next/head'
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
// import * as PostsQueryTypes from '../__generated__/PostsQuery'

// import { GetStaticProps } from 'next'
// import { ApolloClient } from '@apollo/client'
// import { initializeApollo } from '../apollo/client'

// export const PostsQuery = gql`
//   query PostsQuery {
//     posts {
//       id
//       title
//       content
//       author {
//         email
//       }
//     }
//   }
// `

const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
      id
      body
      title
      published
    }
  }
`

export const Home = (): JSX.Element => {
  // const { loading, error, data } = useQuery<PostsQueryTypes.PostsQuery>(DraftsQuery)
  const { loading, error, data } = useQuery(DraftsQuery)

  return (
    <div className="container">
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Home Swing</h1>

        <p className="description">Get started by listing your home to swing.</p>

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
            data.drafts.map((draft) => (
              <Link href={`/posts/${draft.id}`} key={draft.id}>
                <div className="card">
                  <p>{draft.id}</p>
                  <p>{draft.body}</p>
                  <p>{draft.title}</p>
                  <p>{draft.published}</p>
                  {/* <h3>{post.title} &rarr;</h3>
                  <p>{post.content.slice(0, 30)}...</p>
                  <p>{post.author.email}</p> */}
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const apolloClient: ApolloClient<{}> = initializeApollo()

//   await apolloClient.query({
//     query: PostsQuery,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

export default Home
