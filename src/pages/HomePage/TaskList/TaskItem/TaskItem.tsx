import { Card, Checkbox, Group, Text } from "@mantine/core"
import { useState } from "react"

const TaskItem = ({task} : {task: { title : string }}) => {

    const [completed, setCompleted] = useState(false)

    return (
        <Card withBorder style={{opacity: completed ? 0.3 : 1}}>
            <Group position='apart'>
                <Text>{task.title}</Text>
                <Checkbox checked={completed} onChange={(e) => setCompleted(e.currentTarget.checked)}/>
            </Group>
        </Card>
    )
}

export default TaskItem