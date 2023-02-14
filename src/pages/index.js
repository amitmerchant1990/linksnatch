import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])

  let allLinks = []

  useEffect(() => {
    allLinks = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []
    setLinks(allLinks)
  }, [])

  
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(url);

      if (!isValidHttpUrl(url)) {
        alert('Please enter a valid URL');
        return;
      }

      callAPI(url);
    }
  };

  const callAPI = async (url) => {
    try {
      const res = await fetch(
        `https://jsonlink.io/api/extract?url=` + url
      );
      const data = await res.json();
      console.log(data);

      // create an array
      const linksArray = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [];

      // create a javascript object
      const linkMetaData = {
        'id': Math.random().toString(36).substr(2, 8),
        'title': data.title, 
        'url': data.url 
      }

      // add object to array
      linksArray.push(linkMetaData);
      
      // save array to local storage
      localStorage.setItem('links', JSON.stringify(linksArray));

      const links = JSON.parse(localStorage.getItem('links'));

      console.log(links);
      setLinks(links)
      setUrl('')
    } catch (err) {
      console.log(err);
    }
  };

  function extractDomainName(url) {
    let domain = (new URL(url));

    return domain.hostname;
  }

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function deleteLink(id) {
    const links = JSON.parse(localStorage.getItem('links'));
    const filteredLinks = links.filter(link => link.id !== id);
    localStorage.setItem('links', JSON.stringify(filteredLinks));
    setLinks(filteredLinks)
  }

  return (
    <>
      <header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
        <nav class="mt-6 relative max-w-7xl w-full bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-gray-800 dark:border-gray-700" aria-label="Global">
          <div class="flex items-center justify-between">
            <a class="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">LinkSnatcher</a>
            <div class="md:hidden">
              <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg class="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg class="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div id="navbar-collapse-with-animation" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
            <div class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:pl-7">
              <a class="font-medium text-blue-600 md:py-6 dark:text-blue-500" href="#" aria-current="page">About</a>
            </div>
          </div>
        </nav>
      </header>

      <div class="container mx-auto px-4 flex justify-center mt-10">
        <input
          type="text"
          class="w-1/2 lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          placeholder="Sweet! Paste your link here..."
          id="url"
          name="url"
          value={url}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {links.length > 0 && (
        <div class="container mx-auto my-auto px-4 py-10 flex mt-10 justify-center">
          <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.slice(0).reverse().map((link, index) => (
              <div class="p-9 bg-purple-100 rounded-xl relative">
                  <div class="flex gap-2 flex-row items-center mb-2">  
                    <img src={'https://' + extractDomainName(link.url) + '/favicon.ico'} class="w-5 h-5" />
                    <p class="text-slate-600">{extractDomainName(link.url)}</p>
                  </div>
                  <p class="font-bold hover:text-blue-600">
                    <a href={link.url} target="_blank" class="flex gap-2 flex-row items-center">
                      {link.title}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </p>
                  <a class="absolute top-3 right-3" onClick={() => deleteLink(link.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 absolute top-1 right-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </a>
              </div>
            ))}
          </div>
        </div>
      )} 
      {links.length === 0 &&  (
        <div class="grid place-items-center h-[calc(100vh-170px)]">
          <p class="text-slate-600 mb-2 grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
            </svg>
            Start snatching in some links.
          </p>
        </div>
      )}
    </>
  )
}
