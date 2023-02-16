import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState, useEffect, useRef } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { Links } from '@/components/Links'
import { Placeholder } from '@/components/Placeholder'
import { isValidHttpUrl, fetchUrlMetadata, formatUrl } from '@/utils/common'
import { toast, Toaster } from 'react-hot-toast'
import { NextSeo } from 'next-seo'

export default function Home() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const textInput = useRef(null)
  const [hasValidUrl, setHasValidUrl] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false);

  let allLinks = []

  useEffect(() => {
    textInput.current.focus()
    allLinks = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []
    setLinks(allLinks)
  }, [])

  useEffect(() => {
    setHasValidUrl(false)
    let formattedUrl;

    if (url !== '') {
      formattedUrl = formatUrl(url);
    }

    if (url !== '' && !isValidHttpUrl(formattedUrl?.href)) {
      searchLinks()
    }

    if (url === '' || isValidHttpUrl(formattedUrl?.href)) {
      allLinks = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []
      setLinks(allLinks)
    }

    if (isValidHttpUrl(formattedUrl?.href)) {
      setHasValidUrl(true)
    }
  }, [url])

  const handleChange = (event) => {
    setUrl(event.target.value)
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      saveLink()
    }
  };

  async function saveLink() {
    const formattedUrl = formatUrl(url);

    if (!isValidHttpUrl(formattedUrl)) {
      toast.error('Please enter a valid URL');
      return
    }

    setShowSpinner(true)
    allLinks = await fetchUrlMetadata(formattedUrl)
    setShowSpinner(false)
    reloadLinks(allLinks)
  }

  function reloadLinks(links) {
    if (!links)
      return

    toast.success('Link saved!')
    setLinks(links)
    setUrl('')
  }

  function deleteLink(id) {
    const links = JSON.parse(localStorage.getItem('links'));
    const filteredLinks = links.filter(link => link.id !== id);
    localStorage.setItem('links', JSON.stringify(filteredLinks));
    setLinks(filteredLinks)
  }

  function searchLinks() {
    const links = JSON.parse(localStorage.getItem('links'))
    const filteredLinks = links?.filter(link => link.title?.toLowerCase().includes(url.toLowerCase())) ?? []
    setLinks(filteredLinks)
  }

  return (
    <>
      <NextSeo
        title="LinkSnatch — The dead simple bookmarks"
        description="LinkSnatch — The dead simple bookmarks"
      />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <AppHeader />

      <div class="container mx-auto px-4 flex justify-center mt-10">
        <div class="relative lg:w-1/2 w-full">
          <input
            type="text"
            className={`w-full border bg-gray-100 border-slate-300 outline-none focus:outline-none focus:ring lg:flex items-center text-sm leading-6 text-slate-400 rounded-2xl shadow-sm py-4 px-4 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700 ${hasValidUrl ? "focus:ring-green-300 ring-green-300" : ""}`}
            placeholder="Paste your link here or search bookmarks..."
            id="url"
            name="url"
            value={url}
            ref={textInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={showSpinner}
          />
          <button type="button" className={`absolute right-3 top-4 ${hasValidUrl && !showSpinner ? "show" : "hidden"}`} onClick={() => saveLink()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-gray-500 hover:stroke-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          {showSpinner && (<div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-violet-400 rounded-full absolute right-3 top-4" role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
          </div>)}
        </div>
      </div>

      {links?.length > 0 && (
        <Links links={links} deleteLink={deleteLink} />
      )}

      {links.length === 0 && (
        <Placeholder />
      )}
    </>
  )
}
