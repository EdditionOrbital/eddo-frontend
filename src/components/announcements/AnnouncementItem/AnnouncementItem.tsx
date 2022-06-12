import { Badge, Card, Group, Space, Stack, Text, Title } from "@mantine/core"
import { Announcement } from "../../../types/announcement.type"

const AnnouncementItem = ({announcement} : {announcement: Announcement}) => {
    return (
        <Card withBorder className="fade-hover-card">
            <Stack spacing={0}>
                <Title order={5}>{announcement.title}</Title>
                <Text size="sm">by {announcement.author?.firstName}</Text>
                <Space h='md'/>
                <Group position="apart">
                    <Badge>{announcement.moduleId}</Badge>
                    <Text size="xs">{announcement.date}</Text>
                </Group>
            </Stack>
        </Card>
    )
}

export default AnnouncementItem