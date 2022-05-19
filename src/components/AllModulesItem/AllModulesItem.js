import { Box, Heading, Spacer, Text, VStack } from "@chakra-ui/react"

const AllModulesItem = ({ module }) => {
    return (
        <Box border='1px' borderColor='gray.300' borderRadius={12} p={6}>
            <VStack w='full' align='baseline' spacing={6} minH={200}>
                <VStack w='full' align='baseline' spacing={2}>
                    <Text opacity={0.7}>{module.code}</Text>
                    <Heading size='md'>{module.title}</Heading>
                </VStack>
                <Heading opacity={0.6} size='sm'>No files to show</Heading>
                <Spacer/>
                <Text>{module.year % 2000}/{module.year % 2000 + 1} Semester {module.semester}</Text>
            </VStack>
        </Box>
    )
}
export default AllModulesItem