import { useQuery } from "@apollo/client"
import { Button, Group, Stack } from "@mantine/core"
import { useState } from "react"
import { CONTEXT_LESSONS } from "../../queries/lessons"
import { Lesson } from "../../types/lesson.type"
import CalendarItem from "./CalendarItem"

const lessonTypes = ['All', 'Lecture', 'Tutorial']

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
                {lessonTypes.map(t => <Button key={t} variant={t === type ? 'filled' : 'light'} onClick={() => setType(t)} compact>{t}</Button>)}
            </Group>
            <Stack>
                {lessons.filter((e: Lesson) => type === 'All' ? true : type === e.lessonType).map((e: Lesson) => <CalendarItem key={e.code} event={e}/>)}
            </Stack>
        </Stack>
    )
}

export default CalendarList