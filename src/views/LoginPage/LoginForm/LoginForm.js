import { useMutation } from "@apollo/client"
import { Box, Button, Center, Input, Select, SimpleGrid, Spacer, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import Logo from "../../../components/Logo/Logo"
import { AUTH_TOKEN } from "../../../utils/constants"
import { defaultFormState } from "./_defaultState"
import { LOGIN_MUTATION, REGISTER_MUTATION } from "./_queries"

const LoginForm = () => {

    const [formState, setFormState] = useState(defaultFormState)
    const toast = useToast()

    const handleFirstNameChange = (e) => { 
        setFormState({...formState, firstName: e.target.value})
    }

    const handleLastNameChange = (e) => { 
        setFormState({...formState, lastName: e.target.value})
    }

    const handleMatricNoChange = (e) => { 
        setFormState({...formState, matricNo: e.target.value})
    }

    const handleMYearChange = (e) => { 
        setFormState({...formState, mYear: e.target.value})
    }
    
    const handleEmailChange = (e) => { 
        setFormState({...formState, email: e.target.value})
    }

    const handlePasswordChange = (e) => {
        setFormState({...formState, password: e.target.value})
    }

    const handleLoginChange = () => {
        setFormState({...formState, login: !formState.login})
    }

    const [startLogin] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            if (login.token) {
                localStorage.setItem(AUTH_TOKEN, login.token)
                window.location.reload()
            } else {
                toast({
                    title: 'Login Failed',
                    description: login.error,
                    status: 'error',
                    duration: 3000,
                    isClosable: false
                })
            }
        }
    })

    const [startRegister] = useMutation(REGISTER_MUTATION, {
        variables: {
            id: formState.matricNo,
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            password: formState.password,
            mYear: parseInt(formState.mYear)
        },
        onCompleted: ({ register }) => {
            if (register.token) {
                localStorage.setItem(AUTH_TOKEN, register.token)
                window.location.reload()
            } else {
                toast({
                    title: 'Register Failed',
                    description: register.error,
                    status: 'error',
                    duration: 3000,
                    isClosable: false
                })
            }
        }
    })

    const handleSubmit = () => {
        formState.login ? startLogin() : startRegister()
    }

    return (
        <Center w='80%'>
            <Box p={12} w='full'>
            <VStack spacing={8} w='full'>
                <Spacer/>
                <Logo truncated={false} height='56px'/>
                { formState.login ? <></> : <Input placeholder='Matriculation No.' size='lg' onChange={handleMatricNoChange}/> }
                { formState.login ? <></> :
                    <SimpleGrid minChildWidth={100} spacing={4} width='full'>
                        <Input placeholder="First Name" size='lg' onChange={handleFirstNameChange}/>
                        <Input placeholder="Last Name" size='lg' onChange={handleLastNameChange}/>
                    </SimpleGrid>
                }
                <VStack width='100%' spacing={2}>
                    <Input placeholder="Email" size="lg" onChange={handleEmailChange}/>
                    <Input placeholder="Password" size="lg" type='password' onChange={handlePasswordChange}/>
                </VStack>
                { formState.login ? <></> :
                    <Select onChange={handleMYearChange}>
                        { [2018, 2019, 2020, 2021].map(y => <option value={y} key={y}>{y}</option>)}
                    </Select>
                }
                <VStack w='full' spacing={6}>
                    <Button size='lg' colorScheme='blue' w='full' onClick={handleSubmit}>{formState.login ? 'Login' : 'Create Account'}</Button>
                    <SimpleGrid minChildWidth={100} spacing={4} width="100%">
                        <Button size='md' onClick={handleLoginChange}>{formState.login ? 'Create Account' : 'Login'}</Button>
                        <Button size='md'>Forgot Password</Button>
                    </SimpleGrid>
                </VStack>
                <Spacer/>
            </VStack>
            </Box>
        </Center>
    )

}

export default LoginForm