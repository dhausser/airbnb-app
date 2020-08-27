import { useRef } from 'react'
import { usePosts } from '../apollo/hooks'
import { PostCard } from '../components/post-card'
import { PostForm } from '../components/post-form'
import * as PostsQueryTypes from '../__generated__/PostsQuery'
import styles from '../styles/Home.module.css'

type Post = PostsQueryTypes.PostsQuery_posts

function Posts() {
  const initial = { title: 'test title', content: 'test content', authorEmail: 'davy@prisma.io' }
  const lastPostId = useRef<string>()

  const { loading, error, data } = usePosts()

  if (loading || !data?.posts) return <p>Loading...</p>
  if (error) return <p>{`${error.name}: ${error.message}`}</p>

  if (data.posts.length) {
    lastPostId.current = data.posts[data.posts.length - 1].id
  }

  return (
    <div className={styles.grid}>
      {data.posts.map((post: Post) => (
        <PostCard key={post.id as string} post={post} />
      ))}
      <PostForm initial={initial} lastPostId={lastPostId.current} />
    </div>
  )
}

export { Posts }
