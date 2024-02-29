import { useRef } from "react"
import { Tooltip } from "./components/tooltip"
import { Popover, PopoverContent } from "./components/popover"
import { Dialog, DialogContent } from "./components/dialog"
import { UiBtn } from "./components/ui/btn"

function App() {
	const dialogMain = useRef()

	const openDialog = () => {
		dialogMain.show()
	}

	const closeDialog = () => {
		dialogMain.close()
	}

	return (
		<>
			<div className="flex-center p-6">
				<Tooltip className="bottom" aria-label="Opens a dialog">
					<UiBtn onClick={openDialog}>Open Dialog</UiBtn>
				</Tooltip>

				<Popover>
					<UiBtn className="md:bordered">Show dropdown</UiBtn>
					<PopoverContent className="shadow mt-2">
						This is a popover
					</PopoverContent>
				</Popover>
			</div>

			<Dialog ref={dialogMain} className={"asd"}>
				<DialogContent>
					<div className="flex-between">
						<div className="ui-heading">Hello there</div>
						<input type="text" />
						<UiBtn className="muted square accent-main" onClick={closeDialog}>
							<svg
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						</UiBtn>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default App
