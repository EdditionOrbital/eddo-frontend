import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core"

const CalendarItem = ({event} : {event : {code: string, lessonType: string, startTime: string, endTime: string}}) => {

    return (
        <Card withBorder className="fade-hover-card">
            <Group position='apart'>
                <Stack align='flex-start' spacing={8}>
                    <Title order={5}>{event.code} {event.lessonType}</Title>
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