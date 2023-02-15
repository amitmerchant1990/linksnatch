export function extractDomainName(url = '') {
    if (!url) return;

    try {
        let domain = new URL(url);
        return domain.hostname;
    } catch (e) {
        alert('bad url')
    }
}

export function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (e) {
        //alert('can not proccess url')
        return;
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
            alert('bad url')
            return;
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