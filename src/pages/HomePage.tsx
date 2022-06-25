import { Box, SimpleGrid } from "@mantine/core"
import { useContext } from "react"
import CalendarView from "../components/calendars/CalendarView"
import TaskList from "../components/tasks/TaskList"
import { UserContext } from "../services/userContextProvider"
import { isStudent } from "../utils/checkUserType"

interface HomePageProps {
}

export default function HomePage (props: HomePageProps) {
    const { user } = useContext(UserContext)
    if (isStudent(user)) return (
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