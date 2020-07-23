/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostQuery
// ====================================================

export interface PostQuery_post_author {
  __typename: 'User'
  email: string | null
}

export interface PostQuery_post {
  __typename: 'Post'
  id: string | null
  title: string | null
  content: string | null
  author: PostQuery_post_author | null
}

export interface PostQuery {
  post: PostQuery_post | null
}

export interface PostQueryVariables {
  id: string
}
