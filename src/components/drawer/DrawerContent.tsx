import { HTMLProps, createRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
	"data-x-drawer-part"?: string
}

export default function DrawerContent(props: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "div"

	return (
		<Comp {...props} className={classNames("x-drawer-content", props.className)} data-x-drawer-part={props["data-x-drawer-part"] ?? "content"} ref={ref}>
			{props.children}
		</Comp>
	)
}
