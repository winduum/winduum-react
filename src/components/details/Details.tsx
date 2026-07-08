import { createRef, FormEvent, HTMLProps } from "react"
import classNames from "classnames"
import type { ToggleDetailsOptions } from "winduum/src/components/details"

interface Props extends HTMLProps<HTMLDetailsElement> {
	toggleOptions?: ToggleDetailsOptions
}

export default function Details({ toggleOptions, ...props }: Props) {
	const ref = createRef<HTMLDetailsElement>()

	const toggleDetails = async (event: FormEvent) => {
		const target = event.target as HTMLInputElement

		if (!target.closest("summary")) return

		const { toggleDetails } = await import("winduum/src/components/details")

		toggleDetails(target, toggleOptions)
	}

	return (
		<details {...props} className={classNames("x-details", props.className)} ref={ref} onChange={toggleDetails}>
			{props.children}
		</details>
	)
}
