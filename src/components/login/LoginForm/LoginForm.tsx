import { useMutation } from "@apollo/client"
import { Button, PasswordInput, Space, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { LOGIN_MUTATION } from "../../../queries/login"
import { AUTH_TOKEN } from "../../../utils/constants"

const LoginForm = () => {

    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        }
    })

    const [startLogin] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: form.values.email,
            password: form.values.password
        },
        onCompleted: ({ login }) => {
            if (login.response) {
                localStorage.setItem(AUTH_TOKEN, login.response)
                window.location.reload()
            } else {
                setLoading(false)
                showNotification({
                    title: 'Login Failed',
                    message: login.error
                })
            }
        }
    })

    const handleSubmit = () => {
        setLoading(true)
        startLogin()
    }

    return (
        <Stack>
            <TextInput placeholder="xxx.xxx@u.nus.edu" label="Email" size='md' {...form.getInputProps('email')}/>
            <PasswordInput placeholder="Password" label="Password" size='md' {...form.getInputProps('password')}/>
            <Space/>
            <Button radius='md' size="md" onClick={handleSubmit} loading={loading}>Log In</Button>
        </Stack>
    )
}

export default LoginForm