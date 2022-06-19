import { Card, Stack, Text } from "@mantine/core"
import { Task } from "../../types/task.type"
import TaskCompletionBadge from "./TaskCompletionBadge"

const TaskItem = ({task, onClick} : {task : Task, onClick: () => void}) => {

    return (
        <Card withBorder onClick={onClick} className="fade-hover-card">
            <Stack align='flex-start' spacing={6}>
                <Text size='md' style={{cursor:'pointer'}}>{task.title}</Text>
                <TaskCompletionBadge status={task.status} size='sm'/>
            </Stack>
        </Card>
    )
}

export default TaskItem