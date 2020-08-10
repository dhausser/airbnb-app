import { useQuery, useMutation, MutationTuple, QueryResult } from '@apollo/client'
import { GET_POSTS_QUERY, GET_POST_QUERY } from './queries'
import { CREATE_DRAFT_MUTATION, DELETE_POSTS_MUTATION } from './mutations'

import * as PostQueryTypes from '../__generated__/PostQuery'
import * as PostsQueryTypes from '../__generated__/PostsQuery'
import * as CreateDraftMutationTypes from '../__generated__/CreateDraft'
import * as DeletePostsMutationTypes from '../__generated__/DeletePosts'

type ParsedUrlQuery = string | string[] | undefined

export const usePosts = (): QueryResult<PostsQueryTypes.PostsQuery, Record<string, any>> => {
  return useQuery<PostsQueryTypes.PostsQuery>(GET_POSTS_QUERY)
}

export const usePost = (
  id: ParsedUrlQuery
): QueryResult<PostQueryTypes.PostQuery, PostQueryTypes.PostQueryVariables> => {
  return useQuery<PostQueryTypes.PostQuery, PostQueryTypes.PostQueryVariables>(GET_POST_QUERY, {
    variables: { id: id as string },
  })
}

export const useCreateDraft = (): MutationTuple<
  CreateDraftMutationTypes.CreateDraft,
  Record<string, any>
> => {
  return useMutation<CreateDraftMutationTypes.CreateDraft>(CREATE_DRAFT_MUTATION)
}

export const useDeletePosts = (): MutationTuple<
  DeletePostsMutationTypes.DeletePosts,
  Record<string, any>
> => {
  return useMutation<DeletePostsMutationTypes.DeletePosts>(DELETE_POSTS_MUTATION, {
    optimisticResponse: {
      deletePosts: 0,
    },
    update(cache) {
      cache.writeQuery({
        query: GET_POSTS_QUERY,
        data: {
          posts: [],
        },
      })
    },
  })
}
