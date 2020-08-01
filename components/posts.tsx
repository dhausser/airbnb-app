import { PostCard, PostsProps } from './post-card'

export const Posts: React.FC<PostsProps> = ({ loading, error, data }) => {
  if (error) return <p>{`${error.name}: ${error.message}`}</p>
  if (loading || !data.posts) return <p>Loading...</p>

  return (
    <>
      {data.posts.map((post) => (
        <PostCard key={post.id as string} post={post} />
      ))}
    </>
  )
}
