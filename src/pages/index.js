import { useState, useEffect, useRef } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { Links } from '@/components/Links'
import { Placeholder } from '@/components/Placeholder'
import { isValidHttpUrl, fetchUrlMetadata, formatUrl } from '@/utils/common'
import { toast, Toaster } from 'react-hot-toast'
import { NextSeo } from 'next-seo'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { publicRuntimeConfig } from 'next.config'

export default function Home() {
  const Dialog = withReactContent(Swal)
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
    let formattedUrl

    if (url !== '') {
      formattedUrl = formatUrl(url);
    }

    if (url !== '' && !isValidHttpUrl(formattedUrl?.href)) {
      searchLinks()
    }

    if (url === '' || isValidHttpUrl(formattedUrl?.href)) {
      allLinks = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []
      setLinks(allLinks)
      textInput.current.focus()
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

    if (checkLinkExists(formattedUrl)) {
      toast.error('Bam! You already have this link saved');
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
    Dialog.fire({
      text: 'Are you sure you want to delete this link?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
			cancelButtonColor: '#8e77e5',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const links = JSON.parse(localStorage.getItem('links'))
        const filteredLinks = links.filter(link => link.id !== id)
        localStorage.setItem('links', JSON.stringify(filteredLinks))
        setLinks(filteredLinks)
        toast.success('Link deleted!')
      }
    })
  }

  function searchLinks() {
    const links = JSON.parse(localStorage.getItem('links'))
    const filteredLinks = links?.filter(link => link.title?.toLowerCase().includes(url.toLowerCase())) ?? []
    setLinks(filteredLinks)
  }

  function checkLinkExists(url) {
    const links = JSON.parse(localStorage.getItem('links'))
    const filteredLinks = links?.filter(link => link.url === url.href) ?? []
    return filteredLinks.length > 0
  }

  return (
    <>
      <NextSeo
        title={publicRuntimeConfig.app_name + ' — ' + publicRuntimeConfig.app_short_description}
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
            className={`w-full border bg-gray-100 border-slate-300 dark:border-slate-600 outline-none focus:outline-none focus:ring lg:flex items-center text-sm sm:text-lg md:text-lg leading-6 text-slate-600 dark:text-slate-300 rounded-2xl shadow-sm py-4 px-4 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700 ${hasValidUrl ? "focus:ring-green-300 ring-green-300" : ""}`}
            placeholder="Paste your link here or search bookmarks..."
            id="url"
            name="url"
            value={url}
            ref={textInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={showSpinner}
          />
          
          <button type="button" className={`absolute right-3 top-4 sm:top-5 md:top-5 ${hasValidUrl && !showSpinner ? "show" : "hidden"}`} onClick={() => saveLink()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 stroke-gray-500 hover:stroke-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          {showSpinner && (
            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-violet-400 rounded-full absolute right-3 top-4 sm:top-5 md:top-5" role="status" aria-label="loading">
              <span class="sr-only">Loading...</span>
            </div>
          )}
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
