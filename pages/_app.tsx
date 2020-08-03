import { AppPropsType } from 'next/dist/next-server/lib/utils'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { globalStyles } from '../shared/styles'
import { useApollo } from '../apollo/client'

// import '../styles/global.css'

const App: React.FC<AppPropsType> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <CacheProvider value={cache}>
      <ApolloProvider client={apolloClient}>
        {globalStyles}
        <Component {...pageProps} />
      </ApolloProvider>
    </CacheProvider>
  )
}

export default App
