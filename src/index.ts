export const onCommand = (event: Event) => {
	event.preventDefault()

	const element = event.currentTarget as EventTarget & Record<string, unknown>
	const command = (event as Event & { command: string }).command
	const method = command.replace(/-\w/g, (value) => value[1].toUpperCase())
	const action = element[method]

	if (typeof action === "function") action.call(element, event)
}
