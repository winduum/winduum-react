import { useId } from "react"
import { Tooltip } from "./components/tooltip"
import { Popover, PopoverContent } from "./components/popover"
import { Dialog, DialogContent } from "./components/dialog"
import { Button } from "./components/button"

function App() {
	const dialogMain = useId()
	const popoverMain = useId()

	return (
		<>
			<div className="flex items-center gap-2 p-6">
				<Tooltip className="tooltip-bottom" aria-label="Opens a dialog">
					<Button command="show-modal" commandfor={dialogMain}>Open Dialog</Button>
				</Tooltip>

				<Button className="md:bordered" command="toggle-popover" commandfor={popoverMain} aria-controls={popoverMain}>
					Show dropdown
				</Button>
				<Popover className="bottom my-2" popover="" id={popoverMain}>
					<PopoverContent className="shadow p-2">
						This is a popover
					</PopoverContent>
				</Popover>
			</div>

			<Dialog id={dialogMain} closedby="any">
				<DialogContent>
					<div className="flex items-center justify-between gap-4">
						<div className="x-heading">Hello there</div>
						<input type="text" />
						<Button className="muted square accent-main" command="close" commandfor={dialogMain}>
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
