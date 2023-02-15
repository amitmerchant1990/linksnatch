import { extractDomainName } from '@/utils/common'

export function LinkContainer({ link, deleteLink }) {
    return (
        <div class="p-9 bg-purple-100 rounded-2xl relative shadow-lg" key={link.id}>
            <div class="flex gap-2 flex-row items-center mb-2">
                <img src={'https://' + extractDomainName(link.url ?? '') + '/favicon.ico'} class="w-4 h-4" onError={(e) => e.target.style.display='none'} />
                <p class="text-slate-600 text-xs">{extractDomainName(link.url ?? '')}</p>
            </div>
            <p class="group font-bold flex flex-wrap">
                <a href={link.url} target="_blank" class="flex gap-2 flex-row items-center group-hover:text-blue-600">
                    {link.title ?? extractDomainName(link.url ?? '')}
                </a>
                <svg class="w-6 h-6 flex-none opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none"><path d="M9.75 15.25L15.25 9.75M15.25 9.75H10.85M15.25 9.75V14.15" stroke="#0EA5E9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </p>
            <a class="absolute top-3 right-3" onClick={() => deleteLink(link.id)} title="Delete link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1 right-1 stroke-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </a>
        </div>
    )
}