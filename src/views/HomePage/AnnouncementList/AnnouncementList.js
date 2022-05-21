import { Heading, Text, VStack } from "@chakra-ui/react"

const AnnouncementList = () => {
    return (
        <VStack w='full' alignItems='baseline' spacing={8}>
            <Heading size='lg'>Announcements</Heading>
            <VStack w='full' spacing={2}>
                <VStack alignItems='baseline' w='full' borderRadius='md' border='1px solid #ccc' p={3}>
                    <Heading size='sm'>Announcement 1</Heading>
                    <Text>by Author</Text>
                </VStack>
                <VStack alignItems='baseline' w='full' borderRadius='md' border='1px solid #ccc' p={3}>
                    <Heading size='sm'>Announcement 2</Heading>
                    <Text>by Author</Text>
                </VStack>
                <VStack alignItems='baseline' w='full' borderRadius='md' border='1px solid #ccc' p={3}>
                    <Heading size='sm'>Announcement 3</Heading>
                    <Text>by Author</Text>
                </VStack>
            </VStack>
        </VStack>
    )
}

export default AnnouncementList