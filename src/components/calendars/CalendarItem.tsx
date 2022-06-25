import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core"
import { Lesson } from "../../types/lesson.type"

interface CalendarItemProps {
    event: Lesson
}

const CalendarItem = (props: CalendarItemProps) => {
    const { event } = props
    return (
        <Card withBorder className="fade-hover-card">
            <Group position='apart'>
                <Stack align='flex-start' spacing={8}>
                    <Title order={5}>{event.moduleId.split('-')[0]} {event.lessonType}</Title>
                    <Badge>{event.lessonType}</Badge>
                </Stack>
                <Stack align='flex-end' spacing={0}>
                    <Text size='md'>{event.startTime.slice(0,2)}:{event.startTime.slice(2,4)}</Text>
                    <Text size='xs' style={{opacity:0.3}}>{event.endTime.slice(0,2)}:{event.endTime.slice(2,4)}</Text>
                </Stack>
            </Group>
        </Card>
    )
}

export default CalendarItem