import { useQuery, useMutation, ApolloError } from '@apollo/client'
import { GET_POSTS_QUERY, GET_POST_QUERY } from './queries'
import { DELETE_POSTS_MUTATION } from './mutations'

import * as PostQueryTypes from '../__generated__/PostQuery'
import * as PostsQueryTypes from '../__generated__/PostsQuery'
import * as DeletePostsMutationTypes from '../__generated__/DeletePosts'

interface QueryResults {
  loading: boolean
  error: ApolloError | undefined
  data: any
}

export const usePosts = (): QueryResults => {
  const { loading, error, data } = useQuery<PostsQueryTypes.PostsQuery>(GET_POSTS_QUERY)

  return {
    loading,
    error,
    data,
  }
}

export const usePost = (id: string | string[]): QueryResults => {
  const { loading, error, data } = useQuery<PostQueryTypes.PostQuery, PostQueryTypes.PostQueryVariables>(
    GET_POST_QUERY,
    {
      variables: { id: id as string },
    }
  )

  return {
    loading,
    error,
    data,
  }
}

export const useDeletePosts = (): any => {
  return useMutation<DeletePostsMutationTypes.DeletePosts>(DELETE_POSTS_MUTATION)
}
