import { Box, SimpleGrid } from "@mantine/core"
import CalendarView from "../../components/calendars/CalendarView/CalendarView"
import TaskList from "../../components/tasks/TaskList/TaskList"
import { User } from "../../types/user.type"

const HomePage = ({user} : {user: User | null | undefined}) => {
    return (
        <Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
            <SimpleGrid spacing='xl' breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 2}]}>
                <CalendarView/>
                <TaskList/>
            </SimpleGrid>
        </Box>
        
    )
}

export default HomePage