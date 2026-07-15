import { HTMLProps, ReactNode, RefObject, UIEvent, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { ScrollCarouselOptions } from "winduum/src/components/carousel"
import { observeCarousel, scrollCarousel } from "winduum/src/components/carousel/index.js"

export interface CarouselSlotProps {
	scrollPrev: () => void
	scrollNext: () => void
	setScrollPos: () => void
	scrollCarousel: typeof scrollCarousel
	onScroll: (event: UIEvent<HTMLElement>, options?: ScrollCarouselOptions) => void
}

interface Props extends Omit<HTMLProps<any>, "children"> {
	asChild?: boolean
	as?: string
	refs?: {
		contentElement?: RefObject<HTMLElement | null>
		prevElement?: RefObject<HTMLButtonElement | null>
		nextElement?: RefObject<HTMLButtonElement | null>
		paginationElement?: RefObject<HTMLElement | null>
	}
	children?: ReactNode | ((props: CarouselSlotProps) => ReactNode)
}

export default function Carousel({ asChild, as, className, refs, children, ...props }: Props) {
	const rootElement = useRef<HTMLElement>(null)
	const Comp = asChild ? Slot : as ?? "div"

	const scrollPrev = () => {
		const contentElement = refs?.contentElement?.current
		const itemElement = contentElement?.children[0] as HTMLElement | undefined

		contentElement?.scroll({ left: contentElement.scrollLeft - (itemElement?.offsetWidth ?? 0) })
	}

	const scrollNext = () => {
		const contentElement = refs?.contentElement?.current
		const itemElement = contentElement?.children[0] as HTMLElement | undefined

		contentElement?.scroll({ left: contentElement.scrollLeft + (itemElement?.offsetWidth ?? 0) })
	}

	const setScrollPos = () => {
		const contentElement = refs?.contentElement?.current
		const maxScrollLeft = (contentElement?.scrollWidth ?? 0) - (contentElement?.clientWidth ?? 0)
		const scrollStart = (contentElement?.scrollLeft ?? 0) <= 0
		const scrollEnd = (contentElement?.scrollLeft ?? 0) >= maxScrollLeft

		if (refs?.prevElement?.current && refs?.nextElement?.current) {
			refs.prevElement.current.disabled = scrollStart
			refs.nextElement.current.disabled = scrollEnd
		}

		rootElement.current?.toggleAttribute("data-scroll-start", scrollStart)
		rootElement.current?.toggleAttribute("data-scroll-end", scrollEnd)
		rootElement.current?.toggleAttribute("data-scroll-none", maxScrollLeft === 0)
	}

	const onScroll = (event: UIEvent<HTMLElement>, options?: ScrollCarouselOptions) => {
		scrollCarousel(event.currentTarget, options)
		setScrollPos()
	}

	useEffect(() => {
		const contentElement = refs?.contentElement?.current

		if (!contentElement) return

		const observer = observeCarousel(contentElement)

		scrollCarousel(contentElement)
		setScrollPos()

		return () => observer.disconnect()
	}, [refs?.contentElement, refs?.prevElement, refs?.nextElement])

	return (
		<Comp {...props} className={classNames("x-carousel", className)} ref={rootElement}>
			{typeof children === "function" ? children({ scrollPrev, scrollNext, setScrollPos, scrollCarousel, onScroll }) : children}
		</Comp>
	)
}
