import {
  VStack,
  Grid,
  GridItem,
  Button,
  Tabs,
  TabPanels,
  TabList,
  Tab,
  TabPanel,
  useBreakpointValue,
} from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import { AUTH_TOKEN } from '../../utils/constants';
import AnnouncementList from './AnnouncementList/AnnouncementList';
import CalendarComponent from './CalendarComponent/CalendarComponent';
import TaskList from './TaskList/TaskList';
import WelcomeHeader from './WelcomeHeader/WelcomeHeader';

const mobileHomePage = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="blue" size="sm">
      <TabList>
        <Tab>Tasks</Tab>
        <Tab>Calendar</Tab>
        <Tab>Announcements</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TaskList tasks={['Task 1', 'Task 2', 'Task 3']} />
        </TabPanel>
        <TabPanel>
          <CalendarComponent />
        </TabPanel>
        <TabPanel>
          <AnnouncementList
            announcements={[
              { content: 'a1', author: 'test', module: 'gea1000' },
              { content: 'a1', author: 'test', module: 'gea1000' },
              { content: 'a1', author: 'test', module: 'gea1000' },
            ]}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const desktopHomePage = ({ user, setUser }) => {
  const logOut = () => {
    setUser(null);
    localStorage.setItem(AUTH_TOKEN, null);
  };

  return (
    <Grid
      gap="16"
      templateColumns={[
        null,
        'repeat(1,1fr)',
        'repeat(2,1fr)',
        'repeat(3,1fr)',
      ]}
    >
      <GridItem w="full">
        <VStack spacing={12}>
          <WelcomeHeader user={user} />
          <TaskList tasks={['Task 1', 'Task 2', 'Task 3']} />
        </VStack>
      </GridItem>
      <GridItem w="full">
        <CalendarComponent />
      </GridItem>
      <GridItem w="full">
        <AnnouncementList
          announcements={[
            { content: 'a1', author: 'test', module: 'gea1000' },
            { content: 'a1', author: 'test', module: 'gea1000' },
            { content: 'a1', author: 'test', module: 'gea1000' },
          ]}
        />
        <br />
        <Button onClick={logOut}>Log Out</Button>
      </GridItem>
    </Grid>
  );
};

const HomePage = ({ user, setUser }) => {
  const isSmallScreen = useBreakpointValue({base: true, sm: true, md: true, lg: false})
  return( (isMobile || isSmallScreen ) ? mobileHomePage() : desktopHomePage({user, setUser}))

}
export default HomePage;
