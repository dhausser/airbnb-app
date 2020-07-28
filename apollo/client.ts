import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { prodEndpoint, devEndpoint } from '../config.json'

let apolloClient

function createIsomorphLink() {
  /**
   * TODO: enable window === 'undefined' block
   */
  //   if (typeof window === 'undefined') {
  //     const { SchemaLink } = require('@apollo/client/link/schema')
  //     const { schema } = require('./../pages/api/graphql')
  //     return new SchemaLink({ schema })
  //   } else {
  const { HttpLink } = require('@apollo/client/link/http')
  return new HttpLink({
    uri: process.env.NODE_ENV === 'production' ? prodEndpoint : devEndpoint,
    credentials: 'same-origin',
  })
  // }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null): ApolloClient<unknown> {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: unknown): ApolloClient<unknown> {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
