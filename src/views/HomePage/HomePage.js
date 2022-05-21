import {
  Box,
  Button,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  HStack,
  VStack,
  Spacer,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AUTH_TOKEN } from '../../utils/constants';
import AnnouncementList from './AnnouncementList/AnnouncementList';
import CalendarComponent from './CalendarComponent/CalendarComponent';
import TaskList from './TaskList/TaskList';
import WelcomeHeader from './WelcomeHeader/WelcomeHeader';

const HomePage = ({ user, setUser }) => {
  const logOut = () => {
    setUser(null);
    localStorage.setItem(AUTH_TOKEN, null);
  };

//   return (
//     <Box p={12}>
//       {/* <VStack spacing={12} align='baseline'>
//                 <VStack spacing={4} align='baseline'>
//                     <Heading size='lg'>Token</Heading>
//                     <Text fontSize='md'>{localStorage.getItem(AUTH_TOKEN)}</Text>
//                 </VStack>
//                 <VStack spacing={4} align='baseline'>
//                     <Heading size='lg'>Name</Heading>
//                     <Text fontSize='md'>{ user ? `${user.firstName} ${user.lastName}` : ''}</Text>
//                 </VStack>
//                 <VStack spacing={4} align='baseline'>
//                     <Heading size='lg'>Modules</Heading>
//                     { 
//                         user ? 
//                             <UnorderedList>
//                                 {user.modules.map((module) => <ListItem>{module.moduleId}</ListItem>)}
//                             </UnorderedList> : 
//                             <Text fontSize='md'>No modules in list</Text>
//                     }
//                 </VStack> */}

//       <HStack>
//         <VStack bgColor='red'>
//           <Heading>Tasks</Heading>
//           <TaskList />
//         </VStack>
//         <Spacer/>
//         <VStack bgColor='green'>
//           <Heading>Calendar</Heading>
//           <InlineCalendar />
//         </VStack>
//         <Spacer />
//         <VStack bgColor='blue'>
//           <Heading> Announcements </Heading>
//           <AnnouncementList />
//         </VStack>
//       </HStack>
//       <Button mt={6} onClick={logOut}>
//         Log Out
//       </Button>
//       {/** </VStack>*/}
//     </Box>
//   );

return (
  <Grid p={6} templateColumns={[null, 'repeat(1,1fr)', 'repeat(2,1fr)', 'repeat(3,1fr)']}>
    <GridItem w='full' p={6}>
      <VStack spacing={12}>
        <WelcomeHeader/>
        <TaskList/>
      </VStack>
    </GridItem>
    <GridItem w='full' p={6}>
      <CalendarComponent/>
    </GridItem>
    <GridItem w='full' p={6}>
      <AnnouncementList/>
    </GridItem>
  </Grid>
)
};

export default HomePage;
