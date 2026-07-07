import { createRef, FormEvent, HTMLProps, KeyboardEvent, MouseEvent } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { SetPositionOptions } from "winduum/src/components/compare"
import { setPosition, setKeyboardStep, setMouseStep } from "winduum/src/components/compare"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
	keyboardStep?: string
	mouseStep?: string
	positionOptions?: SetPositionOptions
}

export default function Compare({ keyboardStep, mouseStep, positionOptions, ...props }: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "div"

	return (
		<Comp
			{...props}
			className={classNames("x-compare", props.className)}
			ref={ref}
			onInput={(event: FormEvent) => setPosition(event.target as HTMLInputElement, positionOptions)}
			onKeyDown={(event: KeyboardEvent) => setKeyboardStep(event.target as HTMLInputElement, event.key, keyboardStep)}
			onMouseDown={(event: MouseEvent) => setMouseStep(event.target as HTMLInputElement, mouseStep)}
		>
			{props.children}
		</Comp>
	)
}
