import { useQuery } from "@apollo/client"
import { Button, Container, Group, SimpleGrid, Space, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"
import { User } from "../../types/user.type"

const SettingsPage = ({user} : { user : User | undefined } ) => {

    const form = useForm({
        initialValues: {
            ...user,
            password: ''
        }
    })

    const handleUpdateAccount = () => console.log('Update account')
    const handleUpdatePassword = () => console.log('Update password')

    return (
        <Container p={24} style={{ width: '90%', maxWidth: 700 }}>
            <Stack>
                <Title order={2}>Profile Settings</Title>
                <Space/>
                <TextInput key='FirstNameInput' placeholder={user?.firstName || ''} label="First Name" size='md' required {...form.getInputProps('firstName')}/>
                <TextInput key='LastNameInput' placeholder={user?.lastName || ''} label="Last Name" size='md' required {...form.getInputProps('lastName')}/>
                <TextInput key='EmailInput' placeholder={user?.email || ''} label="Email" size='md' required {...form.getInputProps('email')}/>
                <Space/>
                <Button size="md" onClick={handleUpdateAccount}>Update</Button>
            </Stack>
            <Stack mt={48}>
                <Title order={2}>Change Password</Title>
                <Space/>
                <TextInput key='Password' placeholder={'Password'} label="Password" size='md' required {...form.getInputProps('password')}/>
                <Button size="md" onClick={handleUpdatePassword}>Change Password</Button>
            </Stack>
        </Container>
    )

}

export default SettingsPage