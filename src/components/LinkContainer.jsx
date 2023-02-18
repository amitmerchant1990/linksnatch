import { extractDomainName, copyLink } from '@/utils/common'

export function LinkContainer({ 
    link,
    deleteLink
}) {
    return (
        <div class="p-9 bg-purple-100 dark:bg-purple-900 rounded-2xl relative shadow-lg dark:shadow-slate-900" key={link.id}>
            <div class="flex gap-2 flex-row items-center mb-2">
                <img src={'https://' + extractDomainName(link.url ?? '') + '/favicon.ico'} class="w-4 h-4" onError={(e) => e.target.style.display = 'none'} />
                <p class="text-slate-600 dark:text-gray-300 text-xs">{extractDomainName(link.url ?? '')}</p>
            </div>

            <p class="group font-bold flex flex-wrap">
                <a href={link.url} target="_blank" class="text-gray-700 dark:text-gray-100 flex gap-2 flex-row items-center group-hover:text-purple-700 dark:group-hover:text-purple-200">
                    {link.title ?? extractDomainName(link.url ?? '')}
                </a>
                <svg class="w-6 h-6 flex-none opacity-0 group-hover:opacity-100 dark:group-hover:stroke-purple-200" viewBox="0 0 24 24" fill="none"><path d="M9.75 15.25L15.25 9.75M15.25 9.75H10.85M15.25 9.75V14.15" stroke="#7e22d8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" class="dark:group-hover:stroke-purple-200"></path></svg>
            </p>

            <a class="absolute top-3 right-8" onClick={() => copyLink(link.url)} title="Copy link to clipboard">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1 right-1 stroke-gray-500 dark:stroke-gray-100 dark:hover:stroke-gray-300 hover:stroke-gray-700 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            </a>

            <a class="absolute top-3 right-3" onClick={() => deleteLink(link.id)} title="Delete link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1 right-1 stroke-gray-500 dark:stroke-gray-100 dark:hover:stroke-gray-300 hover:stroke-gray-700 hover:stroke-gray-700 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </a>
        </div>
    )
}