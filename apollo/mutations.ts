import { gql } from '@apollo/client'

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraft($title: String!, $content: String!, $authorEmail: String!) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      author {
        email
      }
    }
  }
`

export const DELETE_POSTS_MUTATION = gql`
  mutation DeletePosts {
    deletePosts
  }
`
