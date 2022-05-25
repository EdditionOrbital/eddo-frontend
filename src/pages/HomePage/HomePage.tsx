import { Container, SimpleGrid, Stack } from "@mantine/core"
import AnnouncementList from "./AnnouncementList/AnnouncementList"
import CalendarView from "./CalendarView/CalendarView"
import HomeWelcome from "./HomeWelcome/HomeWelcome"
import TaskList from "./TaskList/TaskList"

const HomePage = ({user} : {user: {firstName: string, lastName: string} | undefined}) => {
    return (
        <Container p={24} size={1600}>
            <SimpleGrid spacing={120} breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 3}]}>
                <Stack spacing={36}>
                    <HomeWelcome firstName={user?.firstName} lastName={user?.lastName}/>
                    <TaskList/>
                </Stack>
                <CalendarView/>
                <AnnouncementList/>
            </SimpleGrid>
        </Container>
        
    )
}

export default HomePage