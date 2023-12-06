import { LinkContainer } from '@/components/LinkContainer'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export function Links({ 
    links, 
    deleteLink 
}) {
    const [parent, enableAnimations] = useAutoAnimate()

    return (
        <div class="relative max-w-7xl w-full px-4 md:py-0 md:px-6 lg:px-8 xl:mx-auto mt-10 mb-10">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={parent}>
                {links.slice(0).reverse().map((link, index) => (
                    <LinkContainer key={link.id} link={link} deleteLink={deleteLink} />
                ))}
            </div>
        </div>
    )
}