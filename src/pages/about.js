import { AppHeader } from "@/components/AppHeader"
import { NextSeo } from "next-seo"

export default function About() {
    return (
        <>
            <NextSeo
                title="About — LinkSnatch — Dead simple bookmarks"
                description="About — LinkSnatch — Dead simple bookmarks"
            />

            <AppHeader />

            <div class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full mb-10">
                <div class="shadow-sm mt-6 relative max-w-7xl w-full mx-2 py-3 px-4 md:py-0 md:px-6 lg:px-8 xl:mx-auto">
                    <h6 class="text-2xl font-bold leading-normal mt-0 mb-2 text-gray-600 dark:text-gray-300">About</h6>

                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-400">
                        This is a dead simple bookmarks app that lets you save the links on your device on the go.
                    </p>

                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-400">
                        I built <b>LinkSnatch</b> because I wanted something really simple to save links that I wanted to read later. I didn't want to have to sign up for an account, I didn't want to have to install a browser extension, and I didn't want to have to use a bookmarking service that was going to track me. 
                        I wanted something pretty simple that just works. And here I am!
                    </p>

                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-400">
                        The app is fairly <i>opinionated</i> and comes with a set of bare minimum features I would need:
                    </p>

                    <ul class="list-disc mt-4 ml-10 text-lg text-slate-700 dark:text-slate-400">
                        <li>A beautiful interface with minimal distractions.</li>
                        <li>Extracts URL metadata using <a href="https://jsonlink.io/" target="_blank" class="text-gray-700 dark:text-gray-300 dark:hover:text-blue-300 font-bold hover:text-blue-600">jsonlink.io</a> and saves it to the browser's local storage.</li>
                        <li>Save and search links all from a single place.</li>
                        <li>Dark mode.</li>
                        <li>It doesn't track you.</li>
                        <li>No signup needed.</li>
                        <li>It doesn't require you to install a browser extension.</li>
                        <li>It's <a href="https://github.com/amitmerchant1990/linksnatch" target="_blank" class="text-gray-700 dark:text-gray-300 dark:hover:text-blue-300 font-bold hover:text-blue-600">open source</a>.</li>
                    </ul>

                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-400">
                        I started building it to solve my own itch but later realized that someone might be in need of something like this. 
                        And so, I decided to set it free out in the wild!
                    </p>

                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-400">
                        Crafted with ❤️ by <a href="https://www.amitmerchant.com/" target="_blank" class="text-gray-700 dark:text-gray-300 dark:hover:text-blue-300 font-bold hover:text-blue-600">Amit Merchant</a>
                    </p>
                </div>
            </div>
        </>
    )
}