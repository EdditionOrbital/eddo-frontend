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

interface TaskModalProps {
	form: UseFormReturnType<Task>
	task: Task | null
	close: () => void
	callbacks: EddoCallback<Task>
}

const TaskModal = (props: TaskModalProps) => {

	const modalTitle = props.form.values.title === '' ? props.task?.title ? props.task?.title : 'Create New Task' : props.form.values.title

	const [createTask] = useMutation(CREATE_TASK, {
		variables: props.form.values,
		onCompleted: ({ createTask }) => {
			if (createTask.response) {
				props.callbacks.create(props.form.values)
				props.close()
			} else console.log(createTask)
		}
	})

	const [updateTask] = useMutation(UPDATE_TASK, {
		variables: props.form.values,
		onCompleted: ({ updateTask }) => {
			if (updateTask.response) {
				props.callbacks.update(props.form.values)
				props.close()
			} else console.log(updateTask.error)
		}
	})

	const [deleteTask] = useMutation(DELETE_TASK, {
		variables: props.form.values,
		onCompleted: ({ deleteTask }) => {
			if (deleteTask.response) {
				props.callbacks.delete(props.form.values._id || '')
				props.close()
			} else console.log(deleteTask.error)
		}
	})

	return (
		<Modal centered opened={props.task !== null} title={modalTitle} onClose={props.close}>
			<Stack>
				<TextInput label="Title" size='md' {...props.form.getInputProps('title')}/>
				<Space/>
				<SegmentedControl size="sm" data={statuses} {...props.form.getInputProps('status')}/>
				<Space/>
				<Group position='right'>
					<Button onClick={props.task?._id === null ? () => createTask() : () => updateTask()}>{props.task?._id === null ? 'Add New Task' : 'Modify Task'}</Button>
					<ActionIcon color='red' variant='light' onClick={() => deleteTask()}><Trash/></ActionIcon>
				</Group>
			</Stack>
		</Modal>
	)
}

export default TaskModal