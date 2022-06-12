import { useQuery } from "@apollo/client"
import { Button, Group, Stack } from "@mantine/core"
import { useState } from "react"
import { CONTEXT_LESSONS } from "../../../queries/lessons"
import CalendarItem from "./CalendarItem/CalendarItem"

const lessonTypes = ['All', 'Lecture', 'Tutorial']

const events = [
    {
        code: 'CS2100',
        lessonType: 'Lecture',
        startTime: '12:00',
        endTime: '13:00'
    },
    {
        code: 'CS2040S',
        lessonType: 'Lecture',
        startTime: '14:00',
        endTime: '15:00'
    },
    {
        code: 'MA2001',
        lessonType: 'Tutorial',
        startTime: '16:00',
        endTime: '18:00'
    },
]

const CalendarList = () => {
    var lessons = [];

    const { loading, error, data } = useQuery(CONTEXT_LESSONS);
    if (loading) {
    } else if (error) {
      console.log(error);
    } else
      try {
        lessons = data.contextLessons;
      } catch {}

    const [type, setType] = useState(lessonTypes[0])

    return (
        <Stack>
            <Group>
                {lessonTypes.map(t => <Button variant={t === type ? 'filled' : 'light'} onClick={() => setType(t)} compact>{t}</Button>)}
            </Group>
            <Stack>
                {lessons.filter((e: { lessonType: string }) => type === 'All' ? true : type === e.lessonType).map((e: { code: string; moduleId: string; lessonType: string; startTime: string; endTime: string }) => <CalendarItem event={e}/>)}
            </Stack>
        </Stack>
    )
}

export default CalendarList