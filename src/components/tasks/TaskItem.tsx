import { Card, Stack, Text } from "@mantine/core"
import { Task } from "../../types/task.type"
import TaskCompletionBadge from "./TaskCompletionBadge"

interface TaskItemProps {
    task : Task
    onClick: () => void
}

const TaskItem = (props: TaskItemProps) => {
    return (
        <Card withBorder onClick={props.onClick} className="fade-hover-card">
            <Stack align='flex-start' spacing={6}>
                <Text size='md' style={{cursor:'pointer'}}>{props.task.title}</Text>
                <TaskCompletionBadge status={props.task.status} size='sm'/>
            </Stack>
        </Card>
    )
}

export default TaskItem