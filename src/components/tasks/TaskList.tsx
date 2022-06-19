import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import TaskModal from "./TaskModal"
import TaskItem from "./TaskItem"
import { useQuery } from "@apollo/client"
import { CONTEXT_TASKS } from "../../queries/tasks"
import { Task } from "../../types/task.type"
import { Plus } from "tabler-icons-react"
import { useForm } from "@mantine/form"

const emptyTask = { _id: null, title: '', status: 'Not Started'}

const TaskList = () => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [currentTask, setCurrentTask] = useState<Task | null>(null)
    const {loading, error, data} = useQuery(CONTEXT_TASKS)

    const form = useForm<Task>({
        initialValues: emptyTask
    })

    const callbacks = {
        create: (t: Task) => setTasks([...tasks, t]),
        update: (t: Task) => setTasks(tasks.map(i => t._id === i._id ? t : i)),
        delete: (t: Task) => setTasks(tasks.filter(i => t._id !== i._id))
    }

    const handleNewTaskClick = () => {
		setCurrentTask(emptyTask)
		form.setValues(emptyTask)
	}

	const handleTaskClick = (task: Task) => () => {
		setCurrentTask(task)
		form.setValues(task)
	}

    useEffect(() => {
        if (data) setTasks(data.contextTasks)
    }, [loading, error, data])

    return (
        <>
            <TaskModal form={form} task={currentTask} close={() => setCurrentTask(null)} callbacks={callbacks}/>
            <Stack>
                <Group position='apart'>
                    <Title order={2}>Your Tasks</Title>
                    <ActionIcon variant="light" onClick={handleNewTaskClick}><Plus/></ActionIcon>
                </Group>
                <Stack>
                    { tasks.length > 0 ? tasks.map(t => <TaskItem key={t._id} onClick={handleTaskClick(t)} task={t}/>) : <Text>You have no pending tasks.</Text>}
                </Stack>
            </Stack>
        </>
    )
}

export default TaskList