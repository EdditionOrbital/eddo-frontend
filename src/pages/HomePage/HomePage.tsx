import { Container, SimpleGrid, Stack } from "@mantine/core"
import AnnouncementList from "../../components/announcements/AnnouncementList/AnnouncementList"
import CalendarView from "../../components/calendars/CalendarView/CalendarView"
import HomeWelcome from "../../components/misc/HomeWelcome/HomeWelcome"
import TaskList from "../../components/tasks/TaskList/TaskList"
import { User } from "../../types/user.type"

const HomePage = ({user} : {user: User | null | undefined}) => {
    return (
        <Container p={24} size={1600}>
            <SimpleGrid spacing={120} breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 3}]}>
                <Stack spacing={36}>
                    <HomeWelcome firstName={user?.firstName} lastName={user?.lastName || ''}/>
                    <TaskList/>
                </Stack>
                <CalendarView/>
                <AnnouncementList/>
            </SimpleGrid>
        </Container>
        
    )
}

export default HomePage