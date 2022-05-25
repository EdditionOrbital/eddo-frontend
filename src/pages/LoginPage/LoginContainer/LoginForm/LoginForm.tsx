import { useMutation } from "@apollo/client"
import { Button, PasswordInput, Space, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { LOGIN_MUTATION } from "../../../../queries/Login"
import { AUTH_TOKEN } from "../../../../utils/constants"

const LoginForm = () => {

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
            if (login.token) {
                localStorage.setItem(AUTH_TOKEN, login.token)
                window.location.reload()
            } else {
                showNotification({
                    title: 'Login Failed',
                    message: login.error
                })
            }
        }
    })

    const handleSubmit = () => startLogin()

    return (
        <Stack>
            <TextInput placeholder="xxx.xxx@u.nus.edu" label="Email" size='md' {...form.getInputProps('email')}/>
            <PasswordInput placeholder="Password" label="Password" size='md' {...form.getInputProps('password')}/>
            <Space/>
            <Button radius='md' size="md" onClick={handleSubmit}>Log In</Button>
        </Stack>
    )
}

export default LoginForm