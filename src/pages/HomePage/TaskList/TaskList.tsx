import { Stack, Title } from "@mantine/core"
import TaskItem from "./TaskItem/TaskItem"

const tasks = [
    {title:"Learn How to Lucid Dream"},
    {title:"Learn How to Dragon Boat"},
    {title:"Get CPR Certified"},
    {title:"Complete a Management Course"},
    {title:"Read all Charles Dickens Novels"},
    {title:"Learn to Live in the Now"},
    // {title:"Learn to Fly a Plane"},
    // {title:"Learn How to Drive"},
    // {title:"Give a Commencement Speech"},
    // {title:"Learn to Break-danc"},
    // {title:"Learn Krav Maga"},
    // {title:"Learn a Form of Martial Arts"}
    ]

const TaskList = () => {

    return (
        <Stack>
            <Title order={2}>Your Tasks</Title>
            <Stack>
                {tasks.map(t => <TaskItem task={t}/>)}
            </Stack>
            {/* <Button variant='outline' style={{width:150}}>View all tasks</Button> */}
        </Stack>
    )

}

export default TaskList