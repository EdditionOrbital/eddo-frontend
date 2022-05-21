import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react"

const WelcomeHeader = () => {
    return (
        <HStack w='full' spacing={4}>
            <Avatar size='lg' src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'/>
            <VStack alignItems='baseline' spacing={0}>
                <Text>Welcome back,</Text>
                <Heading>Edward</Heading>
            </VStack>
        </HStack>
    )
}

export default WelcomeHeader