import { render } from '@testing-library/react'
// import { MockedProvider } from '@apollo/client/testing'
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

// const mocks = {}

const Providers = ({ children }) => {
  return children
  // return <MockedProvider mocks={}>{children}</MockedProvider>
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
}

const customRender = (ui: JSX.Element, options = {}): unknown =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
