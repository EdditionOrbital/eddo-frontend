import { useQuery } from "@apollo/client"
import { Button, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { CURRENT_USER_LESSONS } from "../../../queries/lessons"
import CalendarItem from "./CalendarItem/CalendarItem"

const lessonTypes = ['All', 'Lecture', 'Tutorial']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const CalendarList = () => {
    const today = new Date();
    const day = today.getDay();

    var events = []
    const {loading, error, data} = useQuery(CURRENT_USER_LESSONS)

    if (loading) {}
    else if (error) console.log(error)
    else try { events = data.currentUserLessons } catch {}

    const [type, setType] = useState(lessonTypes[0])

    return (
        <Stack>
            <Group>
                {lessonTypes.map(t => <Button variant={t === type ? 'filled' : 'light'} onClick={() => setType(t)} compact>{t}</Button>)}
            </Group>
            <Stack>
                {events.filter((e: { lessonType: string }) => type === 'All' ? true : type === e.lessonType).map(((e: { code: string; moduleId: string; lessonType: string; startTime: string; endTime: string }) => <CalendarItem event={e}/>))}
            </Stack>
        </Stack>
    )
}

export default CalendarList