import { useQuery } from '@apollo/client';
import { Stack, Title } from '@mantine/core';
import { CONTEXT_ANNOUNCEMENTS } from '../../../queries/announcement';
import { Announcement } from '../../../types/announcement.type';
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
        {announcements.map((a: Announcement) => (
          <AnnouncementItem key={a.moduleId} announcement={a} />
        ))}
      </Stack>
    </Stack>
  );
};

export default AnnouncementList;
