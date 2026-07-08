import type { DialogHTMLAttributes, RefObject } from "react"
import { useEffect, useRef } from "react"
import classNames from "classnames"
import type { DrawerPlacement } from "winduum/src/components/drawer"
import "winduum/src/components/dialog"

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
	placement?: DrawerPlacement
	modal?: boolean
	refs?: {
		contentElement?: RefObject<HTMLElement | null>
	}
}

export default function Drawer({ children, className, modal = true, placement = "left", refs, ...props }: Props) {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const drawerElement = ref.current
		const contentElement = refs?.contentElement?.current

		if (!drawerElement || !contentElement) return

		const abortController = new AbortController()
		let observer: IntersectionObserver | undefined

		const showModal = async () => {
			const scrollerElement = drawerElement.firstElementChild

			if (!scrollerElement || drawerElement.open) return

			if (modal) HTMLDialogElement.prototype.showModal.call(drawerElement)
			else HTMLDialogElement.prototype.show.call(drawerElement)

			const { showDrawer } = await import("winduum/src/components/drawer")

			void showDrawer(scrollerElement, placement)
		}

		drawerElement.showModal = showModal

		void import("winduum/src/components/drawer").then(({ drawerEvents, drawerObserver }) => {
			if (abortController.signal.aborted) return

			drawerEvents(drawerElement, contentElement, placement, abortController.signal)

			observer = drawerObserver(drawerElement, placement)
			observer.observe(contentElement)
		})

		return () => {
			delete (drawerElement as Partial<HTMLDialogElement>).showModal
			abortController.abort()
			observer?.disconnect()
		}
	}, [modal, placement, refs?.contentElement])

	return (
		<dialog {...props} className={classNames("x-drawer", className)} ref={ref}>
			{children}
		</dialog>
	)
}
