import { useQuery, useMutation, MutationTuple, QueryResult } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_POSTS_QUERY, GET_POST_QUERY } from './queries'
import {
  CREATE_DRAFT_MUTATION,
  UPDATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_POSTS_MUTATION,
} from './mutations'

import * as PostQueryTypes from './__generated__/PostQuery'
import * as PostsQueryTypes from './__generated__/PostsQuery'
import * as CreateDraftMutationTypes from './__generated__/CreateDraft'
import * as UpdatePostTypes from './__generated__/UpdatePost'
import * as DeletePostMutationTypes from './__generated__/DeletePost'
import * as DeletePostsMutationTypes from './__generated__/DeletePosts'

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

export const useUpdatePost = (
  id: ParsedUrlQuery,
  inputs: Record<string, string>
): MutationTuple<UpdatePostTypes.UpdatePost, UpdatePostTypes.UpdatePostVariables> => {
  const router = useRouter()
  return useMutation<UpdatePostTypes.UpdatePost, UpdatePostTypes.UpdatePostVariables>(UPDATE_POST_MUTATION, {
    variables: {
      id: `${id}`,
      title: inputs.title,
      content: inputs.content,
    },
    update(cache) {
      cache.modify({
        id: `Post:${id}`,
        fields: {
          title() {
            return inputs.title
          },
          content() {
            return inputs.content
          },
        },
      })
    },
    onCompleted() {
      router.push('/')
    },
    optimisticResponse: {
      updateDraft: {
        __typename: 'Post',
        id: `${id}`,
        title: inputs.title,
        content: inputs.content,
        published: false,
      },
    },
  })
}

export const useDeletePost = ({
  id,
}: DeletePostMutationTypes.DeletePostVariables): MutationTuple<
  DeletePostMutationTypes.DeletePost,
  DeletePostMutationTypes.DeletePostVariables
> => {
  return useMutation<DeletePostMutationTypes.DeletePost, DeletePostMutationTypes.DeletePostVariables>(
    DELETE_POST_MUTATION,
    {
      variables: { id },
    }
  )
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
