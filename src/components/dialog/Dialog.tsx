import { forwardRef } from "react"
import classNames from "classnames"
import {
	showDialog,
	closeDialog,
	DefaultOptions,
} from "winduum/src/components/dialog"

const Dialog = forwardRef((props, forwardedRef) => {
	forwardedRef.show = async (options: DefaultOptions) => {
		await showDialog(forwardedRef.current, options)
	}

	forwardedRef.close = async (options: DefaultOptions) => {
		await closeDialog(forwardedRef.current, options)
	}

	return (
		<dialog
			{...props}
			className={classNames("c-dialog", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</dialog>
	)
})

export default Dialog
