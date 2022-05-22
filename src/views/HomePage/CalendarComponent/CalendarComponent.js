import {Heading, HStack, Spacer, Tag, VStack } from '@chakra-ui/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import MenuTab from './MenuTab';

const CalendarComponent = () => {
  const tabs = ['All', 'Lectures', 'Tutorials', 'Exams', 'Deadlines'];

  return (
    <VStack w="full" alignItems="baseline" spacing={8}>
      <Heading size="lg" colorScheme="charcoal">
        Your Calendar
      </Heading>
      <DayPicker />
      <VStack w="full" spacing={4}>
        <HStack spacing={2} w="full">
          {tabs.map(tab => (
              <MenuTab title={tab} />
          ))}
          <Spacer />
        </HStack>
        <VStack w="full" spacing={2}>
          <HStack w="full" borderRadius="md" border="1px solid #ccc" p={3}>
            <VStack alignItems="baseline" spacing={2}>
              <Heading size="sm">CS2040S Lecture</Heading>
              <Tag colorScheme="purple" size="sm">
                Lecture
              </Tag>
            </VStack>
            <Spacer />
            <VStack alignItems="flex-end" spacing={0}>
              <Heading size="sm">14:00</Heading>
              <Heading size="xs" opacity={0.3}>
                15:00
              </Heading>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default CalendarComponent;
