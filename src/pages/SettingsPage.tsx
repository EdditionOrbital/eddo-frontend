import { Box, Button, Space, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Dispatch, SetStateAction } from "react"
import { User } from "../types/user.type"
import { AUTH_TOKEN } from "../utils/constants"

interface SettingsPageProps {
    user: User | null | undefined
    setUser: Dispatch<SetStateAction<User | null | undefined>>
}

const SettingsPage = (props: SettingsPageProps) => {
    const form = useForm({
        initialValues: {
            ...props.user,
            password: ''
        }
    })

    const handleUpdateAccount = () => console.log('Update account')
    const handleUpdatePassword = () => console.log('Update password')

    const logOutHandler = () => {
        props.setUser(null)
        localStorage.removeItem(AUTH_TOKEN)
        window.location.reload()
    }

    return (
        <Box p={24} style={{ width: '90%', maxWidth: 500 }}>
            <Stack>
                <Title order={2}>Profile Settings</Title>
                <TextInput key='FirstNameInput' placeholder={props.user?.firstName || ''} label="First Name" size='md' required {...form.getInputProps('firstName')}/>
                <TextInput key='LastNameInput' placeholder={props.user?.lastName || ''} label="Last Name" size='md' required {...form.getInputProps('lastName')}/>
                <TextInput key='EmailInput' placeholder={props.user?.email || ''} label="Email" size='md' required {...form.getInputProps('email')}/>
                <Space/>
                <Button size="md" onClick={handleUpdateAccount}>Update</Button>
            </Stack>
            <Stack mt={48}>
                <Title order={2}>Change Password</Title>
                <TextInput key='Password' placeholder={'Password'} label="Password" size='md' required {...form.getInputProps('password')}/>
                <Button size="md" onClick={handleUpdatePassword}>Change Password</Button>
            </Stack>
            <Stack mt={48}>
                <Title order={2}>Log Out</Title>
                <Button size="md" color='red' onClick={logOutHandler} variant='light'>Log Out of Eddo</Button>
            </Stack>
        </Box>
    )

}

export default SettingsPage