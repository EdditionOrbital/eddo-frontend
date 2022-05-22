import { Heading, HStack, Spacer, Tag, Text, VStack } from '@chakra-ui/react';

const Announcement = props => {
  return (
    <HStack
      w="full"
      border="1px solid #ccc"
      borderRadius="md"
      align="baseline"
      p={2}
    >
      <VStack w="full" align="baseline">
        <Heading size="sm">{props.content}</Heading>
        <Text>by {props.author}</Text>
      </VStack>
      <Spacer />
      <Tag colorScheme='gray' size="sm">
        {props.module}
      </Tag>
    </HStack>
  );
};

export default Announcement;
