import { publicRuntimeConfig } from 'next.config'
import { toast } from 'react-hot-toast'

export function extractDomainName(url = '') {
    if (!url) return;

    try {
        let domain = new URL(url)
        return domain.hostname
    } catch (error) {
        return
    }
}

export function isValidDomainName(string) {
    const regexp = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i

    return regexp.test(string)
}

export function isValidHttpUrl(string) {
    const regexp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i

    return regexp.test(string)
}

export const fetchUrlMetadata = async (url) => {
    let response;

    let data;

    const jsonlink_api_key = process.env.NEXT_PUBLIC_JSONLINK_API_KEY

    try {
        response = await fetch(
            publicRuntimeConfig.jsonlink_api_url + `/extract?url=${url}&api_key=${jsonlink_api_key}`
        )

        if (!response.ok) {
            toast.error('Oops! Bad URL.')
            return false
        }

        data = await response.json();
    } catch (error) {
        console.log(error);
    }

    const linksArray = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : []

    const linkMetaData = {
        'id': Math.random().toString(36).substr(2, 8),
        'title': data?.title ?? url,
        'url': data?.url ?? url,
        'timestamp': Math.floor(Date.now() / 1000),
    }

    linksArray.push(linkMetaData)

    localStorage.setItem('links', JSON.stringify(linksArray))

    const links = JSON.parse(localStorage.getItem('links'))

    return links
};

export function copyLink(url) {
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard!')
}

export function formatUrl(string) {
    let url;

    try {
        url = new URL(string);

        if (!url.hostname) {
            // cases where the hostname was not identified
            // ex: user:password@www.example.com, example.com:8000
            url = new URL("https://" + string);
        }
    } catch (error) {
        if (isValidDomainName(string)) {
            url = new URL("https://" + string);
        }
    }

    return url;
}

export function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    let textFileAsBlob = new Blob([textToWrite], { type: 'application/json' });
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';

    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}