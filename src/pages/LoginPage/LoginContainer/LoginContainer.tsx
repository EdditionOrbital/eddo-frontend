import { Anchor, Center, Space, Stack, Text } from "@mantine/core"
import { useState } from "react"
import Logo from "../../../components/Logo/Logo"
import LoginForm from "./LoginForm/LoginForm"
import RegisterForm from "./RegisterForm/RegisterForm"


const LoginContainer = () => {

    const [login, setLogin] = useState(true)

    const alternateOption = (
        login ? 
            <Text align="center">Don't have an account? <Anchor onClick={() => setLogin(false)}>Create an Account</Anchor></Text> : 
            <Text align="center">Already have an account? <Anchor onClick={() => setLogin(true)}>Log In</Anchor></Text>
    )

    return (
        <Stack style={{width:'85%', minWidth: 250, maxWidth: 450}}>
            <Center><Logo height={40}/></Center>
            <Space/>
            {login ? <LoginForm/> : <RegisterForm/>}
            <Space/>
            {alternateOption}
        </Stack>
    )

}

export default LoginContainer