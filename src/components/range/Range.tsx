import { HTMLProps, ReactNode, RefObject, SyntheticEvent, useEffect } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

export interface RangeSlotProps {
	setValue: (event: SyntheticEvent<HTMLInputElement>) => void
}

interface Props extends Omit<HTMLProps<any>, "children"> {
	asChild?: boolean
	as?: string
	refs?: {
		startElement?: RefObject<HTMLInputElement | null>
		endElement?: RefObject<HTMLInputElement | null>
	}
	children?: ReactNode | ((props: RangeSlotProps) => ReactNode)
}

export default function Range({ refs, children, ...props }: Props) {
	const Comp = props.asChild ? Slot : props.as ?? "div"

	const setValue = async ({ currentTarget }: { currentTarget: EventTarget | null }) => {
		const target = currentTarget

		if (!(target instanceof HTMLInputElement) || target.type !== "range") return

		const track = target === refs?.endElement?.current ? "end" : "start"
		const { setValue, setOutputValue } = await import("winduum/src/components/range")

		setValue(target, { track })

		const outputElement = document.getElementById(target.getAttribute("aria-labelledby") ?? "")

		if (outputElement) setOutputValue(target, outputElement)
	}

	useEffect(() => {
		if (refs?.startElement?.current) void setValue({ currentTarget: refs.startElement.current })
		if (refs?.endElement?.current) void setValue({ currentTarget: refs.endElement.current })
	}, [refs?.startElement, refs?.endElement])

	return (
		<Comp {...props} className={classNames("x-range", props.className)}>
			{typeof children === "function" ? children({ setValue }) : children}
		</Comp>
	)
}
