import { HTMLProps, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

type PopoverOptions = boolean | Record<string, unknown>
const supportsAnchor = CSS.supports("anchor-name", "--")
const supportsAnchoredContainer = CSS.supports("container-type: anchored")

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
	autoUpdate?: PopoverOptions
	placement?: string
}

export default function Popover({ autoUpdate, placement = "bottom", ...props }: Props) {
	const ref = useRef<HTMLElement>(null)
	const Comp = props.asChild ? Slot : props.as ?? "div"

	useEffect(() => {
		const popoverElement = ref.current

		if (!popoverElement) return

		let open = false
		let sourceElement: HTMLElement | undefined
		let cleanup: (() => void) | undefined

		const showPopover = async (options?: { source?: HTMLElement }) => {
			const source = options?.source

			sourceElement = source

			if (source && ((autoUpdate && !supportsAnchoredContainer) || !supportsAnchor)) {
				const { autoUpdatePopover } = await import("winduum/src/components/popover/index.js")

				cleanup = await autoUpdatePopover(source, popoverElement, placement as never, autoUpdate as never)
			}

			;(HTMLElement.prototype.showPopover as (this: HTMLElement, options?: { source?: HTMLElement }) => void).call(popoverElement, options)
		}

		const hidePopover = () => {
			cleanup?.()
			cleanup = undefined

			;(HTMLElement.prototype.hidePopover as (this: HTMLElement) => void).call(popoverElement)
		}

		const togglePopover = (options?: { source?: HTMLElement }) => {
			!open
				? void showPopover(options)
				: hidePopover()
		}

		const onToggle = (event: ToggleEvent) => {
			open = event.newState === "open"

			if (sourceElement?.ariaExpanded) sourceElement.ariaExpanded = `${open}`
		}

		;(popoverElement as any).showPopover = showPopover
		;(popoverElement as any).hidePopover = hidePopover
		;(popoverElement as any).togglePopover = togglePopover
		popoverElement.addEventListener("toggle", onToggle)

		return () => {
			cleanup?.()
			delete (popoverElement as Partial<HTMLElement>).showPopover
			delete (popoverElement as Partial<HTMLElement>).hidePopover
			delete (popoverElement as Partial<HTMLElement>).togglePopover
			popoverElement.removeEventListener("toggle", onToggle)
		}
	}, [autoUpdate, placement])

	return (
		<Comp {...props} className={classNames("x-popover", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
