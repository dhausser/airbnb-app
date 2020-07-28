import { gql } from '@apollo/client'

export const GET_POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      id
      title
      content
      author {
        email
      }
    }
  }
`

export const GET_POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author {
        email
      }
    }
  }
`
