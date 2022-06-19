import { useMutation } from "@apollo/client"
import { ActionIcon, Button, Group, Modal, SegmentedControl, Space, Stack, TextInput } from "@mantine/core"
import { DELETE_TASK, CREATE_TASK, UPDATE_TASK } from "../../queries/tasks"
import { Task } from "../../types/task.type"
import { EddoCallback } from "../../types/callbacks.type"
import { Trash } from "tabler-icons-react"
import { UseFormReturnType } from "@mantine/form/lib/use-form"

const statuses = ['Not Started', 'In Progress', 'Completed'].map(s => {
	return { value: s, label: s }
})

const TaskModal = ({form, task, close, callbacks} : { form: UseFormReturnType<Task>, task: Task | null, close: () => void, callbacks: EddoCallback<Task>}) => {

	const modalTitle = form.values.title === '' ? task?.title ? task?.title : 'Create New Task' : form.values.title

	const [createTask] = useMutation(CREATE_TASK, {
		variables: form.values,
		onCompleted: ({ createTask }) => {
			if (createTask.response) {
				callbacks.create(form.values)
				close()
			} else console.log(createTask)
		}
	})

	const [updateTask] = useMutation(UPDATE_TASK, {
		variables: form.values,
		onCompleted: ({ updateTask }) => {
			if (updateTask.response) {
				callbacks.update(form.values)
				close()
			} else console.log(updateTask.error)
		}
	})

	const [deleteTask] = useMutation(DELETE_TASK, {
		variables: form.values,
		onCompleted: ({ deleteTask }) => {
			if (deleteTask.response) {
				callbacks.delete(form.values)
				close()
			} else console.log(deleteTask.error)
		}
	})

	return (
		<Modal centered opened={task !== null} title={modalTitle} onClose={close}>
			<Stack>
				<TextInput label="Title" size='md' {...form.getInputProps('title')}/>
				<Space/>
				<SegmentedControl size="sm" data={statuses} {...form.getInputProps('status')}/>
				<Space/>
				<Group position='right'>
					<Button onClick={task?._id === null ? () => createTask() : () => updateTask()}>{task?._id === null ? 'Add New Task' : 'Modify Task'}</Button>
					<ActionIcon color='red' variant='light' onClick={() => deleteTask()}><Trash/></ActionIcon>
				</Group>
			</Stack>
		</Modal>
	)
}

export default TaskModal