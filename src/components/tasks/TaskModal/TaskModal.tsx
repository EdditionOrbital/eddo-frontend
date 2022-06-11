import { useMutation } from "@apollo/client"
import { ActionIcon, Button, Group, Modal, SegmentedControl, Space, Stack, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { DELETE_TASK, CREATE_TASK, UPDATE_TASK } from "../../../queries/tasks"
import { AiOutlineDelete } from 'react-icons/ai'
import { Task } from "../../../types/task.type"
import { EddoCallback } from "../../../types/callbacks.type"

const statuses = ['Not Started', 'In Progress', 'Completed'].map(s => {
	return { value: s, label: s }
})

const TaskModal = ({task, close, callbacks} : { task: Task | null, close: () => void, callbacks: EddoCallback<Task>}) => {

	const [formState, setFormState] = useState(
		{
			title: task?.title || '',
			status: task?.status || ''
		}
	)

	const handleStatusChange = (s: string) => setFormState({...formState, status: s})

	useEffect(() => {
		setFormState(
			{
				title: task?.title || '',
				status: task?.status || ''
			}
		)
	}, [task])
	
	const modalTitle = formState.title === '' ? task?._id === null ? 'New Task' : task?.title : formState.title
	const notChanged = formState.title === task?.title && formState.status === task?.status

	const [addNewTask] = useMutation(CREATE_TASK, {
		variables: {
			title: formState.title,
			status: formState.status
		},
		onCompleted: ({ newTask }) => {
			if (newTask.response) {
				const task = {
					_id: newTask.response,
					...formState
				}
				callbacks.add(task)
			} else console.log(newTask.error)
			close()
		}
	})

	const [updateTask] = useMutation(UPDATE_TASK, {
		variables: {
			_id: task?._id,
			...formState
		},
		onCompleted: ({ updateTask }) => {
			if (updateTask.response) {
				const task = {
					_id: updateTask.response,
					...formState
				}
				callbacks.update(task)
			} else console.log(updateTask.error)
			close()
		}
	})

	const [deleteTask] = useMutation(DELETE_TASK, {
		variables: { _id: task?._id },
		onCompleted: ({ deleteTask }) => {
			if (deleteTask.response) {
				const id = task?._id || ''
				callbacks.delete(id)
			} else console.log(deleteTask.error)
			close()
		}
	})

	return (
		<Modal centered opened={task !== null} title={modalTitle} onClose={close}>
			<Stack>
				<TextInput label="Title" size='md' value={formState.title} onChange={(e) => setFormState({...formState, title: e.currentTarget.value})}/>
				<Space/>
				<SegmentedControl size="sm" data={statuses} value={formState.status} onChange={handleStatusChange}/>
				<Space/>
				<Group position='right'>
					<Button onClick={task?._id === null ? () => addNewTask() : () => updateTask()} disabled={notChanged}>{task?._id === null ? 'Add New Task' : 'Modify Task'}</Button>
					<ActionIcon color='red' variant='light' onClick={() => deleteTask()}><AiOutlineDelete/></ActionIcon>
				</Group>
				
			</Stack>
		</Modal>
	)
}

export default TaskModal