import { createRef, HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Link(props: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "a"

	return (
		<Comp {...props} className={classNames("ui-link", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
