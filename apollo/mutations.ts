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

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String) {
    updateDraft(id: $id, title: $title, content: $content) {
      id
      title
      content
      published
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
      content
      author {
        id
        email
        name
      }
      published
    }
  }
`

export const DELETE_POSTS_MUTATION = gql`
  mutation DeletePosts {
    deletePosts
  }
`
