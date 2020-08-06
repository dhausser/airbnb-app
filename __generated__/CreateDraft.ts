/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDraft
// ====================================================

export interface CreateDraft_createDraft_author {
  __typename: 'User'
  email: string
}

export interface CreateDraft_createDraft {
  __typename: 'Post'
  id: string
  title: string
  content: string | null
  author: CreateDraft_createDraft_author | null
}

export interface CreateDraft {
  createDraft: CreateDraft_createDraft
}

export interface CreateDraftVariables {
  title: string
  content: string
  authorEmail: string
}
