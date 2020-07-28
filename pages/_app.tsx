import { AppPropsType } from 'next/dist/next-server/lib/utils'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

import '../styles/global.css'

export default function App({ Component, pageProps }: AppPropsType): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
