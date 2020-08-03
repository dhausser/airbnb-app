import Link from 'next/link'
import { ApolloError } from '@apollo/client'
import { PostQuery } from '../__generated__/PostQuery'
import { PostsQuery } from '../__generated__/PostsQuery'

import { Card } from '../shared/styles'

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
    <Link href={`/posts/${post?.id}`} key={post?.id as string}>
      <Card>
        <h3>{post?.title} &rarr;</h3>
        <p>{post?.content?.slice(0, 30)}...</p>
        <p>{post?.author?.email}</p>
      </Card>
    </Link>
  )
}
