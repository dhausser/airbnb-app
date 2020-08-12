/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePost
// ====================================================

export interface UpdatePost_updateDraft_author {
  __typename: 'User'
  id: string
  email: string
  name: string | null
}

export interface UpdatePost_updateDraft {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: UpdatePost_updateDraft_author
  published: boolean
}

export interface UpdatePost {
  updateDraft: UpdatePost_updateDraft
}

export interface UpdatePostVariables {
  id: string
  title: string
  content?: string | null
  authorEmail: string
}
