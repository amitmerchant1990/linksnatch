import '@/styles/globals.css'
import { useEffect } from 'react'
import { NextSeo, DefaultSeo } from 'next-seo'
import { publicRuntimeConfig } from 'next.config'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('preline')
  }, [])

  return (
    <>
      <NextSeo
        description={publicRuntimeConfig.description}
        themeColor={publicRuntimeConfig.app_theme_color}
      />

      <DefaultSeo
        openGraph={{
          type: 'application',
          locale: publicRuntimeConfig.app_locale,
          url: publicRuntimeConfig.app_url,
          siteName: publicRuntimeConfig.app_name + ' — ' + publicRuntimeConfig.app_short_description,
          images: [
            { url: publicRuntimeConfig.app_url + '/linksnatch-cover.png' },
          ],
        }}
        twitter={{
          handle: publicRuntimeConfig.app_creator,
          site: publicRuntimeConfig.app_creator,
          creator: publicRuntimeConfig.app_creator,
          cardType: 'summary_large_image',
        }}
      />

      <Component {...pageProps} />
    </>
  )
}
