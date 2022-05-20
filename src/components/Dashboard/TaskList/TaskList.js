import React from 'react';
import {
  HStack,
  StackDivider,
  VStack,
  Text
} from '@chakra-ui/react';
import { Tasks } from './Tasks';


export default function TaskList() {
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
        {Tasks.map(task => (
          <HStack>
            <Text>{task.body}</Text>
          </HStack>
        ))}
      </VStack>
  );
}
