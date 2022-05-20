import React from 'react';
import {
  HStack,
  StackDivider,
  VStack,
  Text,
} from '@chakra-ui/react';
import { Announcements } from "./Announcements"


export default function AnnouncementList() {
  return (
      <VStack
        divider={<StackDivider />}
        borderColor="gray.200"
        borderWidth="2px"
        p="4"
        borderRadius="lg"
        alignItems="stretch"
        w="80%"
      >
        {Announcements.map(announcement => (
          <HStack>
            <Text>{announcement.body}</Text>
          </HStack>
        ))}
      </VStack>
  );
}
