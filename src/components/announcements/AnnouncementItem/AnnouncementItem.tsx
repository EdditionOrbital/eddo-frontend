import { Badge, Card, Group, Space, Stack, Text, Title } from "@mantine/core"

const AnnouncementItem = ({announcement} : {announcement: { title : string, author: string, code: string, date: string }}) => {
    return (
        <Card withBorder className="fade-hover-card">
            <Stack spacing={0}>
                <Title order={5}>{announcement.title}</Title>
                <Text size="sm">by {announcement.author}</Text>
                <Space h='md'/>
                <Group position="apart">
                    <Badge>{announcement.code}</Badge>
                    <Text size="xs">{announcement.date}</Text>
                    
                </Group>
            </Stack>
        </Card>
    )
}

export default AnnouncementItem