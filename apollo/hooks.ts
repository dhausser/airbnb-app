import { useQuery, useMutation, ApolloError } from '@apollo/client'
import { GET_POSTS_QUERY, GET_POST_QUERY } from './queries'
import { CREATE_DRAFT_MUTATION, DELETE_POSTS_MUTATION } from './mutations'

import * as PostQueryTypes from '../__generated__/PostQuery'
import * as PostsQueryTypes from '../__generated__/PostsQuery'
import * as CreateDraftMutationTypes from '../__generated__/CreateDraft'
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

export const useCreateDraft = (): any => {
  return useMutation<CreateDraftMutationTypes.CreateDraft>(CREATE_DRAFT_MUTATION)
}

export const useDeletePosts = (): any => {
  return useMutation<DeletePostsMutationTypes.DeletePosts>(DELETE_POSTS_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          posts() {
            return []
          },
        },
      })
    },
  })
}
