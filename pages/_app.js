import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import LayoutProvider from './Layout/LayoutProvider'

function MyApp({ Component, pageProps}) {
  return (
<LayoutProvider>
   <Component {...pageProps} />
   </LayoutProvider>
  )
}

export default MyApp
