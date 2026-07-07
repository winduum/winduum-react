import { HTMLProps, MouseEvent, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import { toggleTab } from "winduum/src/components/tabs"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Tabs(props: Props) {
	const ref = useRef<HTMLElement>(null)
	const Comp = props.asChild ? Slot : props.as ?? "div"

	const toggle = (event: MouseEvent<HTMLElement>) => {
		props.onClick?.(event)
		if (event.defaultPrevented) return

		const tabElement = (event.target as HTMLElement).closest('[role="tab"]')

		if (!tabElement || !ref.current?.contains(tabElement)) return

		toggleTab(tabElement, {
			tabElements: ref.current.querySelectorAll('[role="tab"]'),
			tabPanelElements: ref.current.querySelectorAll('[role="tabpanel"]'),
		})
	}

	return (
		<Comp {...props} className={classNames("x-tabs", props.className)} ref={ref} onClick={toggle}>
			{props.children}
		</Comp>
	)
}
