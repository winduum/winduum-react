import { HTMLProps, MouseEvent, ReactNode, RefObject } from "react"
import { Slot } from "@radix-ui/react-slot"
import classNames from "classnames"

export interface TabsSlotProps {
	toggleTab: (event: MouseEvent<HTMLElement>) => void
}

interface Props extends Omit<HTMLProps<any>, "children"> {
	asChild?: boolean
	as?: string
	refs?: {
		tabElements?: RefObject<HTMLElement | null>[]
		tabPanelElements?: RefObject<HTMLElement | null>[]
	}
	children?: ReactNode | ((props: TabsSlotProps) => ReactNode)
}

export default function Tabs({ refs, children, ...props }: Props) {
	const Comp = props.asChild ? Slot : props.as ?? "div"

	const getElements = (elements?: RefObject<HTMLElement | null>[]) => elements?.map((ref) => ref.current).filter((element): element is HTMLElement => Boolean(element)) ?? []

	const toggleTab = async (event: MouseEvent<HTMLElement>) => {
		const source = event.currentTarget
		const { toggleTab } = await import("winduum/src/components/tabs")

		toggleTab(source, {
			tabElements: getElements(refs?.tabElements),
			tabPanelElements: getElements(refs?.tabPanelElements),
		})
	}

	return (
		<Comp {...props} className={classNames("x-tabs", props.className)}>
			{typeof children === "function" ? children({ toggleTab }) : children}
		</Comp>
	)
}
