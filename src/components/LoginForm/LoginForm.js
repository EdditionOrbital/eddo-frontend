import { useMutation } from "@apollo/client"
import { Box, Button, Center, Heading, Input, SimpleGrid, Spacer, VStack } from "@chakra-ui/react"
import { useState } from "react"
import Logo from "../Logo/Logo"
import { AUTH_TOKEN } from "../../utils/constants"
import { defaultFormState, defaultLoginErrorState } from "./_defaultState"
import { LOGIN_MUTATION } from "./_queries"

const LoginForm = () => {

    const [formState, setFormState] = useState(defaultFormState)
    const handleEmailChange = (e) => { setFormState({...formState, email: e.target.value})}
    const handlePasswordChange = (e) => { setFormState({...formState, password: e.target.value})}
    const handleLoginChange = () => { setFormState({...formState, login: !formState.login})}

    const [startLogin] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            if (login.token) {
                localStorage.setItem(AUTH_TOKEN, login.token)
                window.location.reload()
            }
        }
    })

    const handleSubmit = () => {
        formState.login ? startLogin() : console.log('Register not ready')
    }

    return (
        <Center w='80%'>
            <Box p={12} w='full'>
            <VStack spacing={8} w='full'>
                <Spacer/>
                <Logo truncated={false} height='48px'/>
                {/* <Heading>{formState.login ? 'Login' : 'Create Account'}</Heading> */}
                <VStack width='100%' spacing={2}>
                    <Input placeholder="Email" size="md" onChange={handleEmailChange}/>
                    <Input placeholder="Password" size="md" type='password' onChange={handlePasswordChange}/>
                </VStack>
                <VStack w='full' spacing={6}>
                <Button colorScheme='blue' w='full' onClick={handleSubmit}>{formState.login ? 'Login' : 'Create Account'}</Button>
                <SimpleGrid minChildWidth={100} spacing={4} width="100%">
                    <Button size='sm' onClick={handleLoginChange}>{formState.login ? 'Create Account' : 'Login'}</Button>
                    <Button size='sm'>Forgot Password</Button>
                </SimpleGrid>
                </VStack>
                <Spacer/>
            </VStack>
            </Box>
        </Center>
    )

}

export default LoginForm