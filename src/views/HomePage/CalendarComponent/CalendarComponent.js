import {
  Heading,
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { LoneSchemaDefinitionRule } from 'graphql';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import CalendarEvent from './CalendarEvent';

const CalendarComponent = () => {
  const tabTitles = ['All', 'Lectures', 'Tutorials', 'Exams', 'Deadlines'];
  const events = [
    {
      title: 'CS2040S Lecture',
      tag: 'Lecture',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      title: 'CS2040S Tutorial',
      tag: 'Tutorial',
      startTime: '15:00',
      endTime: '16:00',
    },
    { title: 'CS2040S PSET 1', tag: 'Deadline' },
  ];

  const makeTabPanel = (type) => (
    <TabPanel>
      <VStack w='full' alignItems='baseline' spacing={3}>
        {events.filter(e => type !== 'All' ? e.tag + 's' === type : true).map(e => CalendarEvent(e))}
      </VStack>

    </TabPanel>
  )

  return (
    <VStack w="full" alignItems="baseline" spacing={8}>
      <Heading size="lg" colorScheme="charcoal">
        Your Calendar
      </Heading>
      <DayPicker />
      <VStack w="full" spacing={4}>
        <HStack spacing={2} w="full">
          <Tabs
            variant="soft-rounded"
            colorScheme="purple"
            size="sm"
            px={0}
          >
            <TabList mb={4}>
              {tabTitles.map(t => (
                <Tab>{t}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {tabTitles.map(t => makeTabPanel(t))}
            </TabPanels>
          </Tabs>
          <Spacer />
        </HStack>
        <VStack w="full" spacing={2}></VStack>
      </VStack>
    </VStack>
  );
};

export default CalendarComponent;
