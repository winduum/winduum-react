import { createRef, HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Breadcrumb(props: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "nav"

	return (
		<Comp aria-label="breadcrumb" {...props} className={classNames("c-breadcrumb", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
