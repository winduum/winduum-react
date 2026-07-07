import { HTMLProps, MouseEvent, useCallback, useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"
import type { CloseToastOptions, ShowToastOptions } from "winduum/src/components/toast"
import { closeToast, showToast } from "winduum/src/components/toast"

interface Props extends Omit<HTMLProps<any>, "onClose"> {
	asChild?: boolean
	as?: string
	showOptions?: ShowToastOptions
	closeOptions?: CloseToastOptions
	onClose?: () => void
}

export default function Toast({ showOptions, closeOptions, onClose, ...props }: Props) {
	const ref = useRef<HTMLElement>(null)
	const timeoutRef = useRef<number | undefined>(undefined)
	const Comp = props.asChild ? Slot : props.as ?? "li"

	const close = useCallback(async () => {
		if (!ref.current) return

		window.clearTimeout(timeoutRef.current)

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

		void showToast(element, {
			...showOptions,
			autoHide: null,
		}).then(() => {
			if (autoHide) {
				timeoutRef.current = window.setTimeout(close, autoHide * (((element.parentElement?.children.length ?? 0) + 1) / 2))
			}
		})

		return () => {
			window.clearTimeout(timeoutRef.current)
		}
	}, [close, showOptions])

	const onClick = (event: MouseEvent<HTMLElement>) => {
		props.onClick?.(event)
		if (event.defaultPrevented) return

		if ((event.target as HTMLElement).closest('[data-action="closeToast"]')) {
			void close()
		}
	}

	return (
		<Comp {...props} className={classNames("x-toast", props.className)} ref={ref} role={props.role ?? "status"} aria-live={props["aria-live"] ?? "assertive"} aria-atomic={props["aria-atomic"] ?? true} onClick={onClick}>
			{props.children}
		</Comp>
	)
}
