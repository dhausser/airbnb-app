import Link from 'next/link'
import { PostQuery } from '../__generated__/PostQuery'
import { ApolloError } from '@apollo/client'

interface Props {
  loading: boolean
  error: ApolloError
  data: PostQuery
}

export const Post: React.FC<Props> = ({ loading, error, data: { post } }) => {
  return (
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{`${error.name}: ${error.message}`}</p>
      ) : (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div className="card">
            <h3>{post.title} &rarr;</h3>
            <p>{post.content.slice(0, 30)}...</p>
            <p>{post.author.email}</p>
          </div>
        </Link>
      )}
    </div>
  )
}
