import type { DialogHTMLAttributes } from "react"
import { useEffect, useRef } from "react"
import classNames from "classnames"
import type { DrawerPlacement } from "winduum/src/components/drawer"
import { drawerEvents, drawerObserver, showDrawer } from "winduum/src/components/drawer"
import "winduum/src/components/dialog"

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
	placement?: DrawerPlacement
	modal?: boolean
}

export default function Drawer({ children, className, modal = true, placement = "left", ...props }: Props) {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const drawerElement = ref.current
		const contentElement = drawerElement?.querySelector<HTMLElement>("[data-x-drawer-part='content'], .x-drawer-content")

		if (!drawerElement || !contentElement) return

		const abortController = new AbortController()

		const showModal = () => {
			const scrollerElement = drawerElement.firstElementChild

			if (!scrollerElement || drawerElement.open) return

			if (modal) HTMLDialogElement.prototype.showModal.call(drawerElement)
			else HTMLDialogElement.prototype.show.call(drawerElement)

			void showDrawer(scrollerElement, placement)
		}

		drawerElement.showModal = showModal

		drawerEvents(drawerElement, contentElement, placement, abortController.signal)

		const observer = drawerObserver(drawerElement, placement)
		observer.observe(contentElement)

		return () => {
			delete (drawerElement as Partial<HTMLDialogElement>).showModal
			abortController.abort()
			observer.disconnect()
		}
	}, [modal, placement])

	return (
		<dialog {...props} className={classNames("x-drawer", className)} ref={ref}>
			{children}
		</dialog>
	)
}
