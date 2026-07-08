import { createRef, FormEvent, HTMLProps, KeyboardEvent, MouseEvent } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { SetPositionOptions } from "winduum/src/components/compare"

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

	const setPosition = async ({ target }: FormEvent) => {
		const { setPosition } = await import("winduum/src/components/compare")

		setPosition(target as HTMLInputElement, positionOptions)
	}

	const setKeyboardStep = async ({ key, target }: KeyboardEvent) => {
		const { setKeyboardStep } = await import("winduum/src/components/compare")

		setKeyboardStep(target as HTMLInputElement, key, keyboardStep)
	}

	const setMouseStep = async ({ target }: MouseEvent) => {
		const { setMouseStep } = await import("winduum/src/components/compare")

		setMouseStep(target as HTMLInputElement, mouseStep)
	}

	return (
		<Comp
			{...props}
			className={classNames("x-compare", props.className)}
			ref={ref}
			onInput={setPosition}
			onKeyDown={setKeyboardStep}
			onMouseDown={setMouseStep}
		>
			{props.children}
		</Comp>
	)
}
