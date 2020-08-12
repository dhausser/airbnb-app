/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostQuery
// ====================================================

export interface PostQuery_post_author {
  __typename: 'User'
  email: string
}

export interface PostQuery_post {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: PostQuery_post_author
}

export interface PostQuery {
  post: PostQuery_post
}

export interface PostQueryVariables {
  id: string
}
