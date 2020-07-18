/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostQuery
// ====================================================

export interface PostQuery_posts_author {
  __typename: 'User'
  email: string
}

export interface PostQuery_posts {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: PostQuery_posts_author | null
}

export interface PostQuery {
  posts: PostQuery_posts[]
}
