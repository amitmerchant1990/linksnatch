import { toast } from 'react-hot-toast'

export function extractDomainName(url = '') {
    if (!url) return;

    try {
        let domain = new URL(url)
        return domain.hostname
    } catch (e) {
        return
    }
}

export function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (e) {
        return false
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export const fetchUrlMetadata = async (url) => {
    let res;

    try {
        res = await fetch(
            `https://jsonlink.io/api/extract?url=` + url
        )

        if (!res.ok) {
            toast.error('Oops! Bad URL.')
            return false
        }
    } catch (err) {
        console.log(err);
        return;
    }

    const data = await res.json();
    console.log(data);

    // create an array
    const linksArray = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []

    // create a javascript object
    const linkMetaData = {
        'id': Math.random().toString(36).substr(2, 8),
        'title': data.title,
        'url': data.url,
        'timestamp': Math.floor(Date.now() / 1000),
    }

    // add object to array
    linksArray.push(linkMetaData)

    // save array to local storage
    localStorage.setItem('links', JSON.stringify(linksArray))

    const links = JSON.parse(localStorage.getItem('links'))

    console.log(links)

    return links
};

export function copyLink(url) {
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard!')
}