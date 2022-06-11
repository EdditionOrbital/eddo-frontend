import { useQuery } from '@apollo/client';
import { Stack, Title } from '@mantine/core';
import { CONTEXT_ANNOUNCEMENTS } from '../../../queries/announcement';
import AnnouncementItem from '../AnnouncementItem/AnnouncementItem';

const AnnouncementList = () => {
  var announcements = [];

  const { loading, error, data } = useQuery(CONTEXT_ANNOUNCEMENTS);
  if (loading) {
  } else if (error) {
    console.log(error);
  } else
    try {
      announcements = data.contextAnnouncements;
    } catch {}

  return (
    <Stack>
      <Title order={2}>Announcements</Title>
      <Stack>
        {announcements.map((a: { title: string; author: string; code: string; date: string; }) => (
          <AnnouncementItem key={a.code} announcement={a} />
        ))}
      </Stack>
      {/* <Button variant='outline' style={{width:150}}>View all tasks</Button> */}
    </Stack>
  );
};

export default AnnouncementList;
