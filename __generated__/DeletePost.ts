/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePost
// ====================================================

export interface DeletePost_deletePost_author {
  __typename: 'User'
  id: string
  email: string
  name: string | null
}

export interface DeletePost_deletePost {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: DeletePost_deletePost_author | null
  published: boolean
}

export interface DeletePost {
  deletePost: DeletePost_deletePost
}

export interface DeletePostVariables {
  id: string
}
