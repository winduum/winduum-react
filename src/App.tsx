import { useRef } from "react"
import { Tooltip } from "./components/tooltip"
import { Popover, PopoverContent } from "./components/popover"
import { Dialog, DialogContent } from "./components/dialog"
import { Button } from "./components/button"

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
			<div className="flex items-center gap-2 p-6">
				<Tooltip className="bottom" aria-label="Opens a dialog">
					<Button onClick={openDialog}>Open Dialog</Button>
				</Tooltip>

				<Popover className="trigger-focus">
					<Button className="md:bordered">Show dropdown</Button>
					<PopoverContent className="shadow mt-2">
						This is a popover
					</PopoverContent>
				</Popover>
			</div>

			<Dialog ref={dialogMain} className={"asd"}>
				<DialogContent>
					<div className="flex justify-between">
						<div className="x-heading">Hello there</div>
						<input type="text" />
						<Button className="muted square accent-main" onClick={closeDialog}>
							<svg
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default App
