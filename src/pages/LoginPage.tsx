import { Center, Container, Group, Image, MediaQuery } from "@mantine/core"
import LoginBackground from '../assets/images/login-background.svg'
import LoginContainer from "../components/login/LoginContainer"

const LoginPage = () => {
    return (
        <Group spacing={0}>
            <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
                <Container fluid style={{width: '50vw', maxHeight: '100vh', backgroundColor: 'blue', overflow: 'hidden'}} p={0}>
                    <Image src={LoginBackground} fit='cover'/>
                </Container>
            </MediaQuery>
            <MediaQuery smallerThan='md' styles={{ width: '100vw !important' }}>
                <Center style={{width: '50vw', height: '100vh', backgroundColor: 'white'}} p={24}>
                    <LoginContainer/>
                </Center>
            </MediaQuery>
        </Group>
    )
}

export default LoginPage