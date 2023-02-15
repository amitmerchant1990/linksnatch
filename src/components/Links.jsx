import { LinkContainer } from '@/components/LinkContainer'

export function Links({ 
    links, 
    deleteLink 
}) {
    return (
        <div class="container mx-auto my-auto px-4 pb-10 flex mt-10 justify-center">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {links.slice(0).reverse().map((link, index) => (
                    <LinkContainer key={index} link={link} deleteLink={deleteLink} />
                ))}
            </div>
        </div>
    )
}