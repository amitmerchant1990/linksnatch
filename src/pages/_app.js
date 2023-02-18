import '@/styles/globals.css'
import { useEffect } from 'react'
import { NextSeo, DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('preline')
  }, [])

  return (
    <>
      <NextSeo
        description="An effortlessly simple bookmarks app that lets you save the links on your device on the go."
        themeColor="#CABCFD"
      />

      <DefaultSeo
        openGraph={{
          type: 'application',
          locale: 'en_US',
          url: 'https://linksnatch.pages.dev',
          siteName: 'LinkSnatch — Dead simple bookmarks',
          images: [
            { url: '/linksnatch-cover.png' },
          ],
        }}
        twitter={{
          handle: '@amit_merchant',
          site: '@amit_merchant',
          cardType: 'summary_large_image',
          creator: '@amit_merchant',
        }}
      />
      
      <Component {...pageProps} />
    </>
  )
}
