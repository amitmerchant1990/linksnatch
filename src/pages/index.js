import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState, useEffect, useRef } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { Links } from '@/components/Links'
import { Placeholder } from '@/components/Placeholder'
import { isValidHttpUrl, fetchUrlMetadata } from '@/utils/common'
import { toast, Toaster } from 'react-hot-toast'

export default function Home() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const textInput = useRef(null)

  let allLinks = []

  useEffect(() => {
    textInput.current.focus()
    allLinks = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []
    setLinks(allLinks)
  }, [])

  useEffect(() => {
    if (url !== '' && !isValidHttpUrl(url)) {
      searchLinks()
    } else if (url === '') {
      allLinks = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []
      setLinks(allLinks)
    }
  }, [url])

  const handleChange = (event) => {
    setUrl(event.target.value)
  };

  const handleKeyDown = async (event) => {
    console.log(url)

    if (event.key === 'Enter') {
      if (!isValidHttpUrl(url)) {
        toast.error('Please enter a valid URL');
        return
      }

      allLinks = await fetchUrlMetadata(url)
      reloadLinks(allLinks)
    }
  };

  function reloadLinks(links) {
    if (!links) 
      return

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
    const filteredLinks = links.filter(link => link.title?.toLowerCase().includes(url.toLowerCase()))
    setLinks(filteredLinks)
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <AppHeader />

      <div class="container mx-auto px-4 flex justify-center mt-10">
        <input
          type="text"
          class="lg:w-1/2 w-full border bg-gray-100 border-slate-300 outline-none focus:outline-none focus:ring lg:flex items-center text-sm leading-6 text-slate-400 rounded-2xl shadow-sm py-4 px-4 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          placeholder="Paste your link here or search for links..."
          id="url"
          name="url"
          value={url}
          ref={textInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
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
