import { HTMLProps, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

interface Props extends HTMLProps<any> {
	asChild?: boolean
	as?: string
}

export default function Image(props: Props) {
	const ref = useRef<HTMLElement>(null)
	const Comp = props.asChild ? Slot : props.as ?? "div"

	useEffect(() => {
		const element = ref.current?.querySelector("img, video, iframe")

		if (!element) return

		const removeSkeleton = () => ref.current?.classList.remove("before:skeleton")

		if ("complete" in element && element.complete) removeSkeleton()
		else if (element instanceof HTMLVideoElement) element.oncanplay = removeSkeleton
		else element.addEventListener("load", removeSkeleton, { once: true })
	}, [])

	return (
		<Comp {...props} className={classNames("x-image", props.className)} ref={ref}>
			{props.children}
		</Comp>
	)
}
