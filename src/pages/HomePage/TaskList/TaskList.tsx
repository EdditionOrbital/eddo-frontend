import { Stack, Title } from "@mantine/core"
import { useState } from "react"
import TaskModal from "../../../components/TaskModal/TaskModal"
import TaskItem from "./TaskItem/TaskItem"

const tasks = [
    {title:"Learn How to Lucid Dream", status: 'Completed'},
    {title:"Learn How to Dragon Boat", status: 'In Progress'},
    {title:"Get CPR Certified", status: 'In Progress'},
    {title:"Complete a Management Course", status: 'In Progress'},
    {title:"Read all Charles Dickens Novels", status: 'In Progress'},
    {title:"Learn to Live in the Now", status: 'In Progress'},
    // {title:"Learn to Fly a Plane"},
    // {title:"Learn How to Drive"},
    // {title:"Give a Commencement Speech"},
    // {title:"Learn to Break-danc"},
    // {title:"Learn Krav Maga"},
    // {title:"Learn a Form of Martial Arts"}
    ]

const TaskList = () => {

    const [shownTask, setShownTask] = useState<{title: string, status: string} | null>(null)

    return (
        <>
            <TaskModal task={shownTask} close={() => setShownTask(null)}/>
            <Stack>
                <Title order={2}>Your Tasks</Title>
                <Stack>
                    {tasks.map(t => <TaskItem onClick={() => setShownTask(t)} task={t}/>)}
                </Stack>
                {/* <Button variant='outline' style={{width:150}}>View all tasks</Button> */}
            </Stack>
        </>
    )

}

export default TaskList