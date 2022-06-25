import { Box, SimpleGrid } from "@mantine/core"
import CalendarView from "../components/calendars/CalendarView"
import TaskList from "../components/tasks/TaskList"
import { User } from "../types/user.type"
import { isStudent } from "../utils/checkUserType"

interface HomePageProps {
    user: User | null | undefined
}

export default function HomePage (props: HomePageProps) {
    if (isStudent(props.user)) return (
        <Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
            <SimpleGrid spacing='xl' breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 2}]}>
                <CalendarView/>
                <TaskList/>
            </SimpleGrid>
        </Box>
    )
    return (
        <Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
            <SimpleGrid spacing='xl' breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 2}]}>
            </SimpleGrid>
        </Box>
    )
}