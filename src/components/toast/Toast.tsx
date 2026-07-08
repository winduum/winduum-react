import { HTMLProps, ReactNode, useCallback, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { CloseToastOptions, ShowToastOptions } from "winduum/src/components/toast"

export interface ToastSlotProps {
	close: () => void
}

interface Props extends Omit<HTMLProps<any>, "children" | "onClose"> {
	asChild?: boolean
	as?: string
	showOptions?: ShowToastOptions
	closeOptions?: CloseToastOptions
	onClose?: () => void
	children?: ReactNode | ((props: ToastSlotProps) => ReactNode)
}

export default function Toast({ showOptions, closeOptions, onClose, children, ...props }: Props) {
	const ref = useRef<HTMLElement>(null)
	const timeoutRef = useRef<number | undefined>(undefined)
	const Comp = props.asChild ? Slot : props.as ?? "li"

	const close = useCallback(async () => {
		if (!ref.current) return

		window.clearTimeout(timeoutRef.current)

		const { closeToast } = await import("winduum/src/components/toast")

		await closeToast(ref.current, {
			...showOptions?.close,
			...closeOptions,
			remove: false,
		})

		onClose?.()
	}, [closeOptions, onClose, showOptions?.close])

	useEffect(() => {
		const element = ref.current

		if (!element) return

		const autoHide = showOptions?.autoHide ?? 7500

		void import("winduum/src/components/toast")
			.then(({ showToast }) => showToast(element, { ...showOptions, autoHide: null }))
			.then(() => {
				if (autoHide) {
					timeoutRef.current = window.setTimeout(close, autoHide * (((element.parentElement?.children.length ?? 0) + 1) / 2))
				}
			})

		return () => {
			window.clearTimeout(timeoutRef.current)
		}
	}, [close, showOptions])

	return (
		<Comp {...props} className={classNames("x-toast", props.className)} ref={ref} role={props.role ?? "status"} aria-live={props["aria-live"] ?? "assertive"} aria-atomic={props["aria-atomic"] ?? true}>
			{typeof children === "function" ? children({ close }) : children}
		</Comp>
	)
}
