import { createRef, HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Progress(props: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "progress"

	return (
		<Comp {...props} className={classNames("x-progress", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
