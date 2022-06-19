import { Divider, Stack, Title } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import CalendarList from "./CalendarList"

const CalendarView = () => {
    return (
        <Stack spacing={24}>
            <Title order={2}>Your Calendar</Title>
            <Calendar size='md' fullWidth styles={(theme) => ({ weekend : { color: 'blue' } })}/>
            <Divider my={2} style={{opacity: 0.3}}/>
            <CalendarList/>
        </Stack>
    )
}

export default CalendarView