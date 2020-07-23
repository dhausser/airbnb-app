/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsQuery
// ====================================================

export interface PostsQuery_posts_author {
  __typename: 'User'
  email: string | null
}

export interface PostsQuery_posts {
  __typename: 'Post'
  id: string | null
  title: string | null
  content: string | null
  author: PostsQuery_posts_author | null
}

export interface PostsQuery {
  posts: PostsQuery_posts[] | null
}
