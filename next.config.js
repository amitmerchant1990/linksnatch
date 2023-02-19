/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
  },
  publicRuntimeConfig: {
    app_name: 'LinkSnatch',
    app_short_description: 'Dead simple bookmarks',
    description: 'An effortlessly simple bookmarks app that lets you save the links on your device on the go.',
    app_url: 'https://linksnatch.pages.dev',
    app_creator: '@amit_merchant',
    app_locale: 'en_US',
    app_theme_color: '#CABCFD',
    jsonlink_api_url: 'https://jsonlink.io/api',
  },
}

module.exports = nextConfig
