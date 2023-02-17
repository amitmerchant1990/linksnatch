export function Placeholder() {
    return (
        <div class="grid place-items-center h-[calc(100vh-200px)]">
            <p class="text-slate-600 mb-2 grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-12 h-12 mb-5 stroke-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                </svg>
                <span class="text-gray-400">Start snatching in some links!</span>
            </p>
        </div>
    )
}