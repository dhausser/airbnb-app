import { AppPropsType } from 'next/dist/next-server/lib/utils'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

import '../styles/globals.css'

const App: React.FC<AppPropsType> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
