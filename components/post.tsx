import { PostCard, PostProps } from './post-card'

export const Post: React.FC<PostProps> = ({ loading, error, data }) => {
  if (error) return <p>{`${error.name}: ${error.message}`}</p>
  if (loading || !data.post) return <p>Loading...</p>

  return <PostCard post={data.post} />
}
