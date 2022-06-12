import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import TaskModal from "../TaskModal/TaskModal"
import TaskItem from "../TaskItem/TaskItem"
import { FaPlus } from 'react-icons/fa'
import { useQuery } from "@apollo/client"
import { CONTEXT_TASKS } from "../../../queries/tasks"
import { Task } from "../../../types/task.type"

const emptyTask = { _id: null, title: '', status: 'Not Started'}

const TaskList = () => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [shownTask, setShownTask] = useState<Task | null>(null)
    const {loading, error, data} = useQuery(CONTEXT_TASKS)

    const addTask = (t: Task) => setTasks([...tasks, t])
    const updateTask = (t: Task) => setTasks(tasks.map(i => t._id === i._id ? t : i))
    const deleteTask = (_id: string) => setTasks(tasks.filter(i => _id !== i._id))

    useEffect(() => {
        var res = []
        if (loading) {}
        else if (error) console.log(error)
        else try { res = data.contextTasks } catch {}
        setTasks(res)
    }, [loading, error, data])

    useEffect(() => {
        console.log('Task updated')
    }, [tasks])

    return (
        <>
            <TaskModal task={shownTask} close={() => setShownTask(null)} callbacks={{ add: addTask, update: updateTask, delete: deleteTask}}/>
            <Stack>
                <Group position='apart'>
                    <Title order={2}>Your Tasks</Title>
                    <ActionIcon variant="light" onClick={() => setShownTask(emptyTask)}><FaPlus/></ActionIcon>
                </Group>
                <Stack>
                    { tasks.length > 0 ? tasks.map(t => <TaskItem key={t._id} onClick={() => setShownTask(t)} task={t}/>) : <Text>You have no pending tasks.</Text>}

                </Stack>
                {/* <Button variant='outline' style={{width:150}}>View all tasks</Button> */}
            </Stack>
        </>
    )

}

export default TaskList