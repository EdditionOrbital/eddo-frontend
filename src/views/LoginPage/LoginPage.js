import { Box, HStack, Image, Spacer, useBreakpointValue, useColorModeValue, VStack } from "@chakra-ui/react"
import { isMobile } from "react-device-detect"
import LoginForm from "../../components/LoginForm/LoginForm"
import LoginPageBackground from './LoginPageBackground.svg'


const LoginPage = () => {

    const isSmallScreen = useBreakpointValue({base: true, sm: true, md: true, lg: false})

    return (
        <HStack w='100vw' h='100vh' maxH='100vh' spacing={0} overflow='hidden'>
            <Spacer/>
            {isMobile || isSmallScreen ? <></> : 
                <Box w='full' maxW='50%' h='100%' bgColor='blue.300'>
                    <Image src={LoginPageBackground} minH='100vh' minW='60vw'/>
                </Box>
            }
            <Box w='50%' minW={500} h='100%' bgColor={useColorModeValue('white', 'black')}>
                <VStack h='100%' w='full'>
                    <Spacer/>
                    <LoginForm/>
                    <Spacer/>
                </VStack>
            </Box>
            <Spacer/>
        </HStack>
    )
}

export default LoginPage