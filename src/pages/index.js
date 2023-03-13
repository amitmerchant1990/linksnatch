import { useState, useEffect, useRef } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { Links } from '@/components/Links'
import { Placeholder } from '@/components/Placeholder'
import { isValidHttpUrl, fetchUrlMetadata, formatUrl, saveTextAsFile } from '@/utils/common'
import { toast, Toaster } from 'react-hot-toast'
import { NextSeo } from 'next-seo'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { publicRuntimeConfig } from 'next.config'

export default function Home() {
  const Dialog = withReactContent(Swal)
  const textInput = useRef(null)
  const importFile = useRef(null)
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
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

  function exportBookmarks() {
    const links = JSON.stringify(JSON.parse(localStorage.getItem('links')))

    if (links === "null" || links === "[]") {
      toast.error('No bookmarks to be exported!')
      return
    }

    saveTextAsFile(
      links, 
      'linksnatch-bookmarks-' + Math.floor(Date.now() / 1000) + '.json'
    )
  }

  function importBookmarks() {
    importFile.current.click()
  }

  function handleImportFile(event) {
    const fileObj = event.target.files && event.target.files[0]

    if (!fileObj) {
      return
    }

    if (fileObj.type !== 'application/json') {
      toast.error('Not a valid file.')
      event.target.value = null
      return
    }

    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0])
    fileReader.onload = (e) => {
      const contents = e.target.result
      let importedLinks = JSON.parse(contents)

      if (localStorage.getItem('links')) {
        const existingLinks = JSON.parse(localStorage.getItem('links'))

        if (existingLinks.length > 0) {
          Dialog.fire({
            text: 'Do you want to merge the imported links with your existing links?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#8e77e5',
            confirmButtonText: 'Yes, merge it!',
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
              importedLinks.forEach(link => {
                if (!checkLinkExists(link.url)) {
                  existingLinks.push(link)
                }
              })
      
              importedLinks = existingLinks.reverse()
            }
            
            localStorage.setItem('links', JSON.stringify(importedLinks))
            setLinks(importedLinks)
            toast.success('Bookmarks imported!')
          })
        }
      } else {
        localStorage.setItem('links', JSON.stringify(importedLinks))
        setLinks(importedLinks)
        toast.success('Bookmarks imported!')
      }
    };

    event.target.value = null;
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

          <div class="flex justify-center gap-5 mt-5">
            <a href="javascript:void(0);" onClick={() => exportBookmarks()} class="py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-purple-500 dark:bg-purple-900 text-white hover:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-xs dark:focus:ring-offset-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
              </svg>
              Export bookmarks
            </a>
            <input
              style={{display: 'none'}}
              ref={importFile}
              type="file"
              onChange={handleImportFile}
            />
            <a href="javascript:void(0);" onClick={importBookmarks} class="py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-purple-500 dark:bg-purple-900 text-white hover:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-xs dark:focus:ring-offset-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
              </svg>
              Import bookmarks
            </a>
          </div>
          
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
