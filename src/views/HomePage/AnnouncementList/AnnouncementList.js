import { Heading, VStack } from '@chakra-ui/react';
import Announcement from './Announcement';

const AnnouncementList = ({ announcements }) => {
  return (
    <VStack w="full" alignItems="baseline" spacing={8}>
      <Heading size="lg" colorScheme="charcoal">
        Announcements
      </Heading>
      <VStack w="full" spacing={2}>
        {announcements.map(a => (
          <Announcement
            content={a.content}
            author={a.author}
            module={a.module}
          />
        ))}
      </VStack>
    </VStack>
  );
};

export default AnnouncementList;
