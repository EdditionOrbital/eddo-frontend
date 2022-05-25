import { Modal, SegmentedControl, Space, Stack, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"

const statuses = ['Not Started', 'In Progress', 'Completed'].map(s => {
	return { value: s, label: s }
})

const TaskModal = ({task, close} : {task: {title: string, status: string} | null, close: () => void}) => {

	const [formState, setFormState] = useState(
		{
			title: task?.title,
			status: task?.status
		}
	)

	const handleStatusChange = (s: string) => setFormState({...formState, status: s})

	useEffect(() => {
		setFormState(
			{
				title: task?.title,
				status: task?.status
			}
		)
	}, [task])
	
	console.log(formState.status)

	return (
		<Modal centered opened={task !== null} title={formState.title} onClose={close}>
			<Stack>
				<TextInput label="Title" size='md' value={formState.title} onChange={(e) => setFormState({...formState, title: e.currentTarget.value})}/>
				<Space/>
				<SegmentedControl size="sm" data={statuses} value={formState.status} onChange={handleStatusChange}/>
			</Stack>
		</Modal>
	)
}

export default TaskModal