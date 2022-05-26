import { useMutation } from "@apollo/client"
import { Button, Group, PasswordInput, Select, Space, Stack, Stepper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { REGISTER_MUTATION } from "../../../queries/login"
import { AUTH_TOKEN } from "../../../utils/constants"

const RegisterForm = () => {

    const [active, setActive] = useState(0)

    const back = () => setActive(active > 0 ? active - 1 : active)
    const next = () => setActive(active < 2 ? active + 1 : active)

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            matricNo: '',
            email: '',
            password: '',
            year: ''
        }
    })

    const [startRegister] = useMutation(REGISTER_MUTATION, {
        variables: {
            id: form.values.matricNo,
            firstName: form.values.firstName,
            lastName: form.values.lastName,
            email: form.values.email,
            password: form.values.password,
            mYear: parseInt(form.values.year)
        },
        onCompleted: ({ register }) => {
            if (register.token) {
                localStorage.setItem(AUTH_TOKEN, register.token)
                window.location.reload()
            } else {
                showNotification({
                    title: 'Register Failed',
                    message: register.error
                })
            }
        }
    })

    const handleSubmit = () => startRegister()

    return (
        <>
        <Stepper active={active} onStepClick={setActive} size='xs'>
            <Stepper.Step label="Name" allowStepSelect={active > 0}>
                <Stack>
                    <Space/>
                    <TextInput key='FirstNameInput' placeholder="eg. John" label="First Name" size='md' required {...form.getInputProps('firstName')}/>
                    <TextInput key='LastNameInput' placeholder="eg. Doe" label="Last Name" size='md' required {...form.getInputProps('lastName')}/>
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Credentials" allowStepSelect={active > 1}>
                <Stack>
                    <Space/>
                    <TextInput key='MatricInput' placeholder="eg. A1234567Z" label="Matric. No." size='md' required {...form.getInputProps('matricNo')}/>
                    <TextInput key='EmailInput' placeholder="eg. xxx.xxx@u.nus.edu" label="Email" size='md' required {...form.getInputProps('email')}/>
                    <PasswordInput key='PasswordInput' placeholder="Password" label="Password" size='md' required {...form.getInputProps('password')}/>
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Finish" allowStepSelect={active > 2}>
                <Stack>
                    <Select size="md" key='MatricSelect' label="Matriculation Year" placeholder="Year" data={['2018', '2019', '2020', '2021']} {...form.getInputProps('year')}/>
                    <Space/>
                    <Button size="md" onClick={handleSubmit}>Register</Button>
                </Stack>
            </Stepper.Step>
        </Stepper>
        <Space h='xl'/>
        <Group position="apart">
            <Button variant="outline" size="sm" onClick={back} disabled={active <= 0}>Back</Button>
            <Button variant="outline" size="sm" onClick={next} disabled={active >= 2}>Next</Button>
        </Group>
        </>
    )
}

export default RegisterForm