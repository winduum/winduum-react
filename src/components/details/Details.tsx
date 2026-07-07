import { createRef, FormEvent, HTMLProps } from "react"
import classNames from "classnames"
import type { ToggleDetailsOptions } from "winduum/src/components/details"
import { toggleDetails } from "winduum/src/components/details"

interface Props extends HTMLProps<HTMLDetailsElement> {
	toggleOptions?: ToggleDetailsOptions
}

export default function Details({ toggleOptions, ...props }: Props) {
	const ref = createRef<HTMLDetailsElement>()

	const toggleCheckbox = (event: FormEvent) => {
		const target = event.target as HTMLInputElement

		if (!target.closest("summary")) return

		toggleDetails(target, toggleOptions)
	}

	return (
		<details {...props} className={classNames("x-details", props.className)} ref={ref} onChange={toggleCheckbox}>
			{props.children}
		</details>
	)
}
