import { Button, Heading, VStack } from "@chakra-ui/react"
import Task from "./Task"

const TaskList = ({tasks}) => {
    return (
        <VStack w='full' alignItems='baseline' spacing={4}>
            <Heading size='lg' colorScheme='charcoal'>Your Tasks</Heading>
            <VStack w='full' spacing={2}>
                {tasks.map(task => <Task content={task} />)}
            </VStack>
            <Button colorScheme='blue'>View all tasks</Button>
        </VStack>
    )
}

export default TaskList