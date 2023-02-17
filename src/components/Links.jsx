import { LinkContainer } from '@/components/LinkContainer'

export function Links({ 
    links, 
    deleteLink 
}) {
    return (
        <div class="relative max-w-7xl w-full px-4 md:py-0 md:px-6 lg:px-8 xl:mx-auto mt-10 mb-10">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {links.slice(0).reverse().map((link, index) => (
                    <LinkContainer key={index} link={link} deleteLink={deleteLink} />
                ))}
            </div>
        </div>
    )
}