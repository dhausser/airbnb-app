import { gql } from '@apollo/client'

export const DELETE_POSTS_MUTATION = gql`
  mutation DeletePosts {
    deletePosts
  }
`
