import Link from 'next/link'
import { PostQuery } from '../__generated__/PostQuery'
import { ApolloError } from '@apollo/client'

interface Props {
  loading: boolean
  error: ApolloError
  data: PostQuery
}

export const Post: React.FC<Props> = ({ loading, error, data }) => {
  return (
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{`${error.name}: ${error.message}`}</p>
      ) : (
        <Link href={`/posts/${data.post.id}`} key={data.post.id}>
          <div>
            <h3>{data.post.title} &rarr;</h3>
            <p>{data.post.content.slice(0, 30)}...</p>
            <p>{data.post.author.email}</p>
          </div>
        </Link>
      )}
    </div>
  )
}
