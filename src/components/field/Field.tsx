import { createRef, FormEvent, HTMLProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { ValidateFieldOptions } from "winduum/src/components/form"
import { validateField } from "winduum/src/components/form"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
	validateOptions?: ValidateFieldOptions
}

export default function Field({ validateOptions, ...props }: Props) {
	const ref = createRef<HTMLElement>()
	const Comp = props.asChild ? Slot : props.as ?? "div"

	const validate = (event: FormEvent<HTMLElement>) => {
		props.onChange?.(event)
		validateField(event.currentTarget, validateOptions)
	}

	return (
		<Comp {...props} className={classNames("x-field", props.className)} ref={ref} onChange={validate}>
			{props.children}
		</Comp>
	)
}
