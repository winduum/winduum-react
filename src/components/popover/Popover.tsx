import type { ComputePositionConfig, Placement } from "@floating-ui/dom"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import { type HTMLProps, useEffect, useRef } from "react"
import {
	supportsAnchor,
	supportsAnchoredContainer,
} from "winduum/src/common.js"
import { onCommand } from "../../index.js"

const nativeShowPopover = HTMLElement.prototype.showPopover as (
	this: HTMLElement,
	options?: { source?: HTMLElement },
) => void
const nativeHidePopover = HTMLElement.prototype.hidePopover

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
	autoUpdate?: boolean | ComputePositionConfig
	placement?: Placement
}

export default function Popover({
	autoUpdate,
	placement = "bottom",
	...props
}: Props) {
	const ref = useRef<HTMLElement>(null)
	const Comp = props.asChild ? Slot : (props.as ?? "div")

	useEffect(() => {
		const popoverElement = ref.current

		if (!popoverElement) return

		let sourceElement: HTMLElement | undefined
		let cleanup: (() => void) | undefined

		const showPopover = async (options?: { source?: HTMLElement }) => {
			const source = options?.source

			sourceElement = source

			if (
				source &&
				((autoUpdate && !supportsAnchoredContainer) || !supportsAnchor)
			) {
				const { autoUpdatePopover } = await import(
					"winduum/src/components/popover/index.js"
				)

				cleanup = await autoUpdatePopover(
					source,
					popoverElement,
					placement,
					autoUpdate,
				)
			}

			nativeShowPopover.call(popoverElement, options)
		}

		const hidePopover = () => {
			cleanup?.()
			cleanup = undefined

			nativeHidePopover.call(popoverElement)
		}

		const togglePopover = (options?: { source?: HTMLElement }) => {
			popoverElement.matches(":popover-open")
				? hidePopover()
				: void showPopover(options)
		}

		const onToggle = (event: ToggleEvent) => {
			if (sourceElement?.ariaExpanded)
				sourceElement.ariaExpanded = `${event.newState === "open"}`
		}

		Object.assign(popoverElement, { showPopover, hidePopover, togglePopover })
		popoverElement.addEventListener("toggle", onToggle)
		popoverElement.addEventListener("command", onCommand)

		return () => {
			cleanup?.()
			popoverElement.removeEventListener("toggle", onToggle)
			popoverElement.removeEventListener("command", onCommand)
		}
	}, [autoUpdate, placement])

	return (
		<Comp
			{...props}
			className={classNames("x-popover", props.className)}
			ref={ref}
		>
			{props.children}
		</Comp>
	)
}
