declare module 'winduum/src/components/drawer' {
	export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

	export function showDrawer(element: HTMLElement | Element, placement: DrawerPlacement): Promise<void>
	export function drawerEvents(element: HTMLDialogElement | Element, contentElement: HTMLElement | Element, placement: DrawerPlacement, signal?: AbortSignal): void
	export function drawerObserver(element: HTMLDialogElement | Element, placement: DrawerPlacement): IntersectionObserver
}

export {}
