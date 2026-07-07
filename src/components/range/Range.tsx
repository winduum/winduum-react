import { HTMLProps, SyntheticEvent, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { SetValueOptions } from "winduum/src/components/range"
import { setValue, setOutputValue } from "winduum/src/components/range"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Range(props: Props) {
	const ref = useRef<HTMLElement>(null)
	const Comp = props.asChild ? Slot : props.as ?? "div"

	const getTrack = (input: HTMLInputElement): SetValueOptions["track"] => {
		const track = input.dataset.track ?? input.dataset.xRangePart ?? input.dataset.xRangeTarget

		return track === "end" ? "end" : "start"
	}

	const setRangeValue = (target: EventTarget | null) => {
		if (!(target instanceof HTMLInputElement) || target.type !== "range") return

		setValue(target, {
			track: getTrack(target),
		})

		const outputElement = document.getElementById(target.getAttribute("aria-labelledby") ?? "")

		if (outputElement) setOutputValue(target, outputElement)
	}

	useEffect(() => {
		ref.current?.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach((input) => {
			setRangeValue(input)
		})
	}, [])

	return (
		<Comp {...props} className={classNames("x-range", props.className)} ref={ref} onInput={(event: SyntheticEvent) => setRangeValue(event.target)}>
			{props.children}
		</Comp>
	)
}
