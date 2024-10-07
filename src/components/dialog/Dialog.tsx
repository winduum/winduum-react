import { forwardRef, ElementRef, MutableRefObject, ReactNode } from 'react'
import classNames from 'classnames'
import { showDialog, closeDialog, DefaultOptions } from 'winduum/src/components/dialog'

interface DialogMethods extends MutableRefObject<ElementRef<'dialog'>> {
	show: (options?: DefaultOptions) => Promise<void>
	close: (options?: DefaultOptions) => Promise<void>
}

interface DialogProps {
	className?: string
	children: ReactNode
}

const Dialog = forwardRef<ElementRef<'dialog'>, DialogProps>((props, forwardedRef) => {
	if (forwardedRef) {
		const ref = forwardedRef as DialogMethods

		ref.show = async (options?: DefaultOptions): Promise<void> => {
			await showDialog(ref.current, options)
		}

		ref.close = async (options?: DefaultOptions): Promise<void> => {
			await closeDialog(ref.current, options)
		}
	}

	return (
		<dialog {...props} className={classNames("x-dialog", props.className)} ref={forwardedRef}>
			{props.children}
		</dialog>
	)
})

export default Dialog
