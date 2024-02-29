import { HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean;
	as?: string;
}

export default function Tooltip(props: Props) {
	const Comp = props.asChild ? Slot : props.as ?? "div"

	return (
		<Comp
			{...props}
			className={classNames("c-popover-content", props.className)}
		>
			{props.children}
		</Comp>
	)
}
