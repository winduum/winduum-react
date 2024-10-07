import { HTMLProps, createRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function DialogContent(props: Props) {
	const ref = createRef<HTMLElement>();
	const Comp = props.asChild ? Slot : props.as ?? "div"

	return (
		<Comp {...props} className={classNames("x-dialog-content", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
