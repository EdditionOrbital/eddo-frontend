import { Box, Heading, Spacer, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { currentSem, currentYear } from "../../../services/currentYearSemester"
import './AllModulesItem.css'

const AllModulesItem = ({ module }) => {

    const isCurrentModule = module.year === currentYear && module.semester === currentSem
    
    return (
        <Box borderColor={useColorModeValue('gray.100', 'gray.700')} opacity={isCurrentModule ? 1 : 0.2} className={`all-modules-item all-modules-item-${useColorModeValue('light', 'dark')}`} p={6}>
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