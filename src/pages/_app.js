import '@/styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('preline')
  }, [])

  return <Component {...pageProps} />
}
