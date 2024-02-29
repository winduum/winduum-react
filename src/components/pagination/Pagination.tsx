import { createRef, HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Pagination(props: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "nav"

	return (
		<Comp aria-label="pagination" {...props} className={classNames("c-pagination", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
