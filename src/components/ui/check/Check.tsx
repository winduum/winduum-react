import { createRef, HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Check(props: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "div"

	return (
		<Comp {...props} className={classNames("ui-check", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
