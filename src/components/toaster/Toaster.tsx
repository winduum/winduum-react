import { HTMLProps, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Toaster(props: Props) {
	const ref = useRef<HTMLElement>(null)
	const Comp = props.asChild ? Slot : props.as ?? "ol"

	useEffect(() => {
		const element = ref.current

		if (!element) return

		let observer: MutationObserver | undefined

		void import("winduum/src/components/toaster/index.js").then((module) => {
			const { toasterObserver } = module as unknown as {
				toasterObserver: () => MutationObserver
			}
			const nextObserver = toasterObserver()

			nextObserver.observe(element, { childList: true })
			observer = nextObserver
		})

		return () => {
			observer?.disconnect()
		}
	}, [])

	return (
		<Comp {...props} className={classNames("x-toaster", props.className)} ref={ref} popover={props.popover ?? "manual"}>
			{props.children}
		</Comp>
	)
}
