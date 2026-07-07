import type { DetailedHTMLProps, DialogHTMLAttributes } from "react"
import classNames from "classnames"
import "winduum/src/components/dialog"

export default function Dialog(props: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) {
	return (
		<dialog {...props} className={classNames("x-dialog", props.className)}>
			{props.children}
		</dialog>
	)
}
