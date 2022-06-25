import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core"
import { useContext, useState } from "react"
import TaskModal from "./TaskModal"
import TaskItem from "./TaskItem"
import { Task } from "../../types/task.type"
import { Plus } from "tabler-icons-react"
import { useForm } from "@mantine/form"
import { UserContext } from "../../services/userContextProvider"

const emptyTask = { _id: null, title: '', status: 'Not Started'}

const TaskList = () => {
    const {user, setUser} = useContext(UserContext)
    const [currentTask, setCurrentTask] = useState<Task | null>(null)

    const form = useForm<Task>({
        initialValues: emptyTask
    })

    if (!user || !user.tasks) return <></>

    const callbacks = {
        create: (t: Task) => setUser({ ...user, tasks: user.tasks ? [...user.tasks, t] : [t]}),
        update: (t: Task) => setUser({ ...user, tasks: user.tasks ? user.tasks.map(i => t._id === i._id ? t : i) : [t] }),
        delete: (t: Task) => setUser({ ...user, tasks: user.tasks ? user.tasks.filter(i => t._id !== i._id) : []})
    }

    const handleNewTaskClick = () => {
		setCurrentTask(emptyTask)
		form.setValues(emptyTask)
	}

	const handleTaskClick = (task: Task) => () => {
		setCurrentTask(task)
		form.setValues(task)
	}

    return (
        <>
            <TaskModal form={form} task={currentTask} close={() => setCurrentTask(null)} callbacks={callbacks}/>
            <Stack>
                <Group position='apart'>
                    <Title order={2}>Your Tasks</Title>
                    <ActionIcon variant="light" onClick={handleNewTaskClick}><Plus/></ActionIcon>
                </Group>
                <Stack>
                    { user.tasks.length > 0 ? user.tasks.map(t => <TaskItem key={t._id} onClick={handleTaskClick(t)} task={t}/>) : <Text>You have no pending tasks.</Text>}
                </Stack>
            </Stack>
        </>
    )
}

export default TaskList