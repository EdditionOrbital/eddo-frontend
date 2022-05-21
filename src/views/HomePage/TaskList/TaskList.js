import { Button, Checkbox, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react"

const TaskList = () => {
    return (
        <VStack w='full' alignItems='baseline' spacing={4}>
            <Heading size='lg' colorScheme='charcoal'>Your Tasks</Heading>
            <VStack w='full' spacing={2}>
                <HStack w='full' borderRadius='md' border='1px solid #ccc' p={3}>
                    <Text>Task 1</Text>
                    <Spacer/>
                    <Checkbox/>
                </HStack>
                <HStack w='full' borderRadius='md' border='1px solid #ccc' p={3}>
                    <Text>Task 2</Text>
                    <Spacer/>
                    <Checkbox/>
                </HStack>
                <HStack w='full' borderRadius='md' border='1px solid #ccc' p={3}>
                    <Text>Task 3</Text>
                    <Spacer/>
                    <Checkbox/>
                </HStack>
            </VStack>
            <Button colorScheme='blue'>View all tasks</Button>
        </VStack>
    )
}

export default TaskList