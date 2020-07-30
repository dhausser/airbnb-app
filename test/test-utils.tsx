import React from 'react'
import { render as defaultRender, cleanup, waitFor } from '@testing-library/react'
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
  { wrapper, router, mocks, cache, addTypename, ...options }: RenderOptions = {}
) {
  if (!wrapper) {
    wrapper = ({ children }) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <MockedProvider mocks={mocks} cache={cache} addTypename={addTypename}>
          {children}
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

// import { render } from '@testing-library/react'
// import { RouterContext } from "next/dist/next-server/lib/router-context";
// // import { MockedProvider } from '@apollo/client/testing'
// // import { ThemeProvider } from "my-ui-lib"
// // import { TranslationProvider } from "my-i18n-lib"
// // import defaultStrings from "i18n/en-x-default"

// // Mocks useRouter
// const useRouter = jest.spyOn(require('next/router'), 'useRouter')

// /**
//  * mockNextUseRouter
//  * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
//  */
// export function mockNextUseRouter(props: {
//   route: string
//   pathname: string
//   query: string
//   asPath: string
// }): void {
//   useRouter.mockImplementationOnce(() => ({
//     route: props.route,
//     pathname: props.pathname,
//     query: props.query,
//     asPath: props.asPath,
//   }))
// }

// const Providers = ({ children }) => {
//   return children
//   // return <MockedProvider mocks={}>{children}</MockedProvider>
//   // return (
//   //   <ThemeProvider theme="light">
//   //     <TranslationProvider messages={defaultStrings}>
//   //       {children}
//   //     </TranslationProvider>
//   //   </ThemeProvider>
//   // )
// }

// const customRender = (ui: JSX.Element, options = {}): unknown =>
//   render(ui, { wrapper: Providers, ...options })

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export { customRender as render }

// import { render } from '@testing-library/react'

// // this adds custom jest matchers from jest-dom
// import { MockedProvider, MockedResponse } from '@apollo/client/testing'
// import { ApolloCache } from '@apollo/client'

// type RenderApolloOptions = {
//   mocks?: MockedResponse[]
//   addTypename?: boolean
//   defaultOptions?: any
//   cache?: ApolloCache<{}> | undefined
//   resolvers?: any
//   wrapper?: any
//   [st: string]: any
// }

// const renderApollo = (
//   node: JSX.Element,
//   { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {}
// ): unknown => {
//   return render(
//     <MockedProvider
//       mocks={mocks}
//       addTypename={addTypename}
//       defaultOptions={defaultOptions}
//       cache={cache}
//       resolvers={resolvers}
//     >
//       {node}
//     </MockedProvider>,
//     options
//   )
// }

// // Mocks useRouter
// const useRouter = jest.spyOn(require('next/router'), 'useRouter')

// /**
//  * mockNextUseRouter
//  * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
//  */
// export function mockNextUseRouter(props: {
//   route: string
//   pathname: string
//   query: string
//   asPath: string
// }): void {
//   useRouter.mockImplementationOnce(() => ({
//     route: props.route,
//     pathname: props.pathname,
//     query: props.query,
//     asPath: props.asPath,
//   }))
// }

// export * from '@testing-library/react'
// export { renderApollo }
