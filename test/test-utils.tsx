import React from 'react'
import { render as defaultRender, cleanup, waitFor, RenderResult } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ApolloCache } from '@apollo/client'

export * from '@testing-library/react'

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof defaultRender>
type RenderUI = DefaultParams[0]
type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>
  mocks: MockedResponse[]
  cache: ApolloCache<any> | undefined
  addTypename?: boolean
}

export function render(
  ui: RenderUI,
  { wrapper, router, mocks, cache, addTypename, ...options }: RenderOptions
): RenderResult {
  if (!wrapper) {
    wrapper = ({ children }) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <MockedProvider mocks={mocks} cache={cache} addTypename={addTypename}>
          {children as React.ReactElement}
        </MockedProvider>
      </RouterContext.Provider>
    )
  }

  return defaultRender(ui, { wrapper, ...options })
}

export { cleanup, waitFor }

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}
