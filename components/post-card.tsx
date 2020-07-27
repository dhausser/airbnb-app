import Link from 'next/link'
import { PostQuery } from '../__generated__/PostQuery'

export const PostCard: React.FC<PostQuery> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} key={post.id}>
      <div className="card">
        <h3>{post.title} &rarr;</h3>
        <p>{post.content.slice(0, 30)}...</p>
        <p>{post.author.email}</p>
      </div>
    </Link>
  )
}
