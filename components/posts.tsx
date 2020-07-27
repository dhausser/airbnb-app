import { ApolloError } from '@apollo/client'
import { PostCard } from './post-card'
import { PostsQuery } from '../__generated__/PostsQuery'

interface Props {
  loading: boolean
  error: ApolloError
  data: PostsQuery
}

export const Posts: React.FC<Props> = ({ loading, error, data }) => {
  return (
    <>
      {loading ? (
        <div className="card">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="card">
          <p>{`${error.name}: ${error.message}`}</p>
        </div>
      ) : (
        data.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </>
  )
}
