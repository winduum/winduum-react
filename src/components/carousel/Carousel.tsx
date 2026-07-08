import { HTMLProps, MouseEvent, ReactNode, RefObject, useEffect } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

export interface CarouselSlotProps {
	scrollPrev: () => void
	scrollNext: () => void
	toggleScrollState: () => void
	scrollToMarker: (event: MouseEvent<HTMLElement>) => void
}

interface Props extends Omit<HTMLProps<any>, "children"> {
	asChild?: boolean
	as?: string
	vertical?: boolean
	refs?: {
		contentElement?: RefObject<HTMLElement | null>
		markerGroupElement?: RefObject<HTMLElement | null>
		prevElement?: RefObject<HTMLButtonElement | null>
		nextElement?: RefObject<HTMLButtonElement | null>
	}
	children?: ReactNode | ((props: CarouselSlotProps) => ReactNode)
}

export default function Carousel({ vertical, refs, children, ...props }: Props) {
	const Comp = props.asChild ? Slot : props.as ?? "div"

	const scroll = async (direction: number) => {
		const { scrollBy } = await import("winduum/src/components/carousel")

		scrollBy(refs!.contentElement!.current!, { direction, vertical })
	}

	const scrollPrev = () => scroll(-1)
	const scrollNext = () => scroll(1)

	const toggleScrollState = async () => {
		const { toggleScrollState } = await import("winduum/src/components/carousel")

		toggleScrollState(refs!.contentElement!.current!, {
			prevElement: refs?.prevElement?.current,
			nextElement: refs?.nextElement?.current,
			vertical,
		})
	}

	const scrollToMarker = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault()

		const target = event.currentTarget
		const { scrollToMarker } = await import("winduum/src/components/carousel")

		scrollToMarker(refs!.contentElement!.current!, target, refs!.markerGroupElement!.current!, vertical ? { block: "start" } : {})
	}

	useEffect(() => {
		const abortController = new AbortController()

		refs?.contentElement?.current?.addEventListener(
			"scrollsnapchanging",
			async (event: any) => {
				const { setSnappedAttribute } = await import("winduum/src/components/carousel")

				setSnappedAttribute(refs.contentElement!.current!, event.snapTargetInline ?? event.snapTargetBlock, refs?.markerGroupElement?.current)
			},
			{ signal: abortController.signal },
		)

		return () => abortController.abort()
	}, [refs?.contentElement, refs?.markerGroupElement])

	return (
		<Comp {...props} className={classNames("x-carousel", props.className)}>
			{typeof children === "function" ? children({ scrollPrev, scrollNext, toggleScrollState, scrollToMarker }) : children}
		</Comp>
	)
}
