import { Divider, Stack, Title } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import { useForm } from "@mantine/hooks"
import CalendarList from "./CalendarList"

const CalendarView = () => {
    const form = useForm({ initialValues: { date: new Date() }})
    return (
        <Stack spacing={24}>
            <Title order={2}>Your Calendar</Title>
            <Calendar size='md' fullWidth {...form.getInputProps('date')}/>
            <Divider my={2} style={{opacity: 0.3}}/>
            <CalendarList date={form.values.date}/>
        </Stack>
    )
}

export default CalendarView