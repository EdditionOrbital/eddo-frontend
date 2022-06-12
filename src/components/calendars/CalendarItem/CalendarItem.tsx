import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core"
import { Lesson } from "../../../types/lesson.type"

const CalendarItem = ({event} : {event : Lesson}) => {

    return (
        <Card withBorder className="fade-hover-card">
            <Group position='apart'>
                <Stack align='flex-start' spacing={8}>
                    <Title order={5}>{event.code} {event.moduleId
                    }</Title>
                    <Badge>{event.lessonType}</Badge>
                </Stack>
                <Stack align='flex-end' spacing={0}>
                    <Text size='md'>{event.startTime}</Text>
                    <Text size='xs' style={{opacity:0.3}}>{event.endTime}</Text>
                </Stack>
            </Group>
        </Card>
    )
}

export default CalendarItem