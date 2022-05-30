import { useQuery } from '@apollo/client';
import { Stack, Title } from '@mantine/core';
import { CURRENT_USER_ANNOUNCEMENTS } from '../../../queries/announcement';
import AnnouncementItem from '../AnnouncementItem/AnnouncementItem';

const AnnouncementList = () => {
  var announcements = [];

  const { loading, error, data } = useQuery(CURRENT_USER_ANNOUNCEMENTS);
  if (loading) {
  } else if (error) {
    console.log(error);
  } else
    try {
      announcements = data.currentUserAnnouncements;
    } catch {}

  return (
    <Stack>
      <Title order={2}>Announcements</Title>
      <Stack>
        {announcements.map((a: { title: string; author: string; code: string; date: string; }) => (
          <AnnouncementItem announcement={a} />
        ))}
      </Stack>
      {/* <Button variant='outline' style={{width:150}}>View all tasks</Button> */}
    </Stack>
  );
};

export default AnnouncementList;
