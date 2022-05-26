import { Stack, Title } from "@mantine/core"
import AnnouncementItem from "../AnnouncementItem/AnnouncementItem"

const announcements = [
    {
        title: 'Announcement 1',
        author: 'Prof. John Doe',
        code: 'CS2100',
        date: 'Today'
    },
    {
        title: 'Announcement 2',
        author: 'Prof. Jane Doe',
        code: 'CS2040S',
        date: 'Yesterday'
    },
    {
        title: 'Announcement 3',
        author: 'Prof. John Doe',
        code: 'MA2001',
        date: '2 Days Ago'
    },
]

const AnnouncementList = () => {

    return (
        <Stack>
            <Title order={2}>Announcements</Title>
            <Stack>
                {announcements.map(a => <AnnouncementItem announcement={a}/>)}
            </Stack>
            {/* <Button variant='outline' style={{width:150}}>View all tasks</Button> */}
        </Stack>
    )

}

export default AnnouncementList