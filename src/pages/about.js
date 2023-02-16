import { AppHeader } from "@/components/AppHeader"
import { NextSeo } from "next-seo"

export default function About() {
    return (
        <>
            <NextSeo
                title="About — LinkSnatch — The dead simple bookmarks"
                description="About — LinkSnatch — The dead simple bookmarks"
            />

            <AppHeader />

            <div class="container mx-auto px-4 mt-10">
                <p>
                    I built <b>LinkSnatch</b> because I wanted something really simple to save links that I wanted to read later. I didn't want to have to sign up for an account, I didn't want to have to install a browser extension, and I didn't want to have to use a bookmarking service that was going to track me. I just wanted a simple way to save links that I could access from any device.
                </p>
            </div>
        </>
    )
}