import Link from 'next/link'
import { ApolloError } from '@apollo/client'
import { PostQuery } from '../apollo/__generated__/PostQuery'
import { PostsQuery } from '../apollo/__generated__/PostsQuery'

import styles from '../styles/Home.module.css'

interface Props {
  loading: boolean
  error: ApolloError | undefined
}

export interface PostProps extends Props {
  data: PostQuery
}

export interface PostsProps extends Props {
  data: PostsQuery
}

export const PostCard: React.FC<PostQuery> = ({ post }) => {
  return (
    <Link href="/post/[id]" as={`/post/${post?.id}`} key={post?.id as string}>
      <div className={styles.card}>
        <h3>{post?.title} &rarr;</h3>
        <p>{post?.content?.slice(0, 30)}...</p>
        <p>{post?.author?.email}</p>
      </div>
    </Link>
  )
}
