import { Box, Button, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react"
import { AUTH_TOKEN } from "../../utils/constants"

const HomePage = ({user, setUser}) => { 

    const logOut = () => {
        setUser(null)
        localStorage.setItem(AUTH_TOKEN, null)
    }

    return (
        <Box p={12}>
            <VStack spacing={12} align='baseline'>
                <VStack spacing={4} align='baseline'>
                    <Heading size='lg'>Token</Heading>
                    <Text fontSize='md'>{localStorage.getItem(AUTH_TOKEN)}</Text>
                </VStack>
                <VStack spacing={4} align='baseline'>
                    <Heading size='lg'>Name</Heading>
                    <Text fontSize='md'>{ user ? `${user.firstName} ${user.lastName}` : ''}</Text>
                </VStack>
                <VStack spacing={4} align='baseline'>
                    <Heading size='lg'>Modules</Heading>
                    { 
                        user ? 
                            <UnorderedList>
                                {user.modules.map((module) => <ListItem>{module.moduleId}</ListItem>)}
                            </UnorderedList> : 
                            <Text fontSize='md'>No modules in list</Text>
                    }
                </VStack>
                <Button mt={6} onClick={logOut}>Log Out</Button>
            </VStack>
        </Box>
    )
}

export default HomePage