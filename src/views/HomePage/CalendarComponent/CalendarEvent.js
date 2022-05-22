import { Heading, HStack, Spacer, Tag, VStack } from '@chakra-ui/react';

function handleColor(event) {
    switch(event.tag) {
        case 'Lecture': return 'purple';
        case 'Tutorial': return 'blue';
        default: return 'red';
        
    }
}

const CalendarEvent = props => (
  <HStack w="full" borderRadius="md" border="1px solid #ccc" p={3}>
    <VStack alignItems="baseline" spacing={2}>
      <Heading size="sm">{props.title}</Heading>
      <Tag colorScheme={handleColor(props)} size="sm">
        {props.tag}
      </Tag>
    </VStack>
    <Spacer />
    <VStack alignItems="flex-end" spacing={0}>
      <Heading size="sm">{props.startTime}</Heading>
      <Heading size="xs" opacity={0.3}>
        {props.endTime}
      </Heading>
    </VStack>
  </HStack>
);

export default CalendarEvent;
