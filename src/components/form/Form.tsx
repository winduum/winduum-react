import { createRef, HTMLProps, SubmitEvent } from "react"
import classNames from "classnames"
import type { ValidateFormOptions } from "winduum/src/components/form"
import { validateForm } from "winduum/src/components/form"

interface Props extends Omit<HTMLProps<HTMLFormElement>, "onSubmit"> {
	onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void
	validateOptions?: ValidateFormOptions
}

export default function Form({ validateOptions, ...props }: Props) {
	const ref = createRef<HTMLFormElement>()

	const validate = (event: SubmitEvent<HTMLFormElement>) => {
		props.onSubmit?.(event)
		validateForm(event.nativeEvent, validateOptions)
	}

	return (
		<form {...props} className={classNames("x-form", props.className)} ref={ref} noValidate={props.noValidate ?? true} onSubmit={validate}>
			{props.children}
		</form>
	)
}
