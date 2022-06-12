import { Container, SimpleGrid } from "@mantine/core"
import AnnouncementList from "../../components/announcements/AnnouncementList/AnnouncementList"
import CalendarView from "../../components/calendars/CalendarView/CalendarView"
import TaskList from "../../components/tasks/TaskList/TaskList"
import { User } from "../../types/user.type"

const HomePage = ({user} : {user: User | null | undefined}) => {
    return (
        <Container p={24} size={1600}>
            <SimpleGrid spacing='xl' breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 3}]}>
                <CalendarView/>
                <TaskList/>
                <AnnouncementList/>
            </SimpleGrid>
        </Container>
        
    )
}

export default HomePage