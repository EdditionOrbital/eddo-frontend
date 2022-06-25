import { useMutation } from "@apollo/client"
import { Button, Group, PasswordInput, Select, Space, Stack, Stepper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { STAFF_REGISTER_MUTATION, STUDENT_REGISTER_MUTATION } from "../../queries/auth"
import { AUTH_TOKEN } from "../../constants/authToken"

const RegisterForm = () => {

    const [active, setActive] = useState(0)

    const back = () => setActive(active > 0 ? active - 1 : active)
    const next = () => setActive(active < 2 ? active + 1 : active)

    const form = useForm({
        initialValues: {
            role: 'Student',
            firstName: '',
            lastName: '',
            matricNo: '',
            email: '',
            password: '',
            yearOrTitle: ''
        }
    })

    const [startRegisterStudent] = useMutation(STUDENT_REGISTER_MUTATION, {
        variables: {
            id: form.values.matricNo,
            firstName: form.values.firstName,
            lastName: form.values.lastName,
            email: form.values.email,
            password: form.values.password,
            mYear: parseInt(form.values.yearOrTitle)
        },
        onCompleted: ({ registerStudent }) => {
            if (registerStudent.response) {
                localStorage.setItem(AUTH_TOKEN, registerStudent.response)
                window.location.reload()
            } else {
                showNotification({
                    title: 'Student Register Failed',
                    message: registerStudent.error
                })
            }
        }
    })

    const [startRegisterStaff] = useMutation(STAFF_REGISTER_MUTATION, {
        variables: {
            id: form.values.matricNo,
            firstName: form.values.firstName,
            lastName: form.values.lastName,
            email: form.values.email,
            password: form.values.password,
            title: form.values.yearOrTitle
        },
        onCompleted: ({ registerStaff }) => {
            if (registerStaff.response) {
                localStorage.setItem(AUTH_TOKEN, registerStaff.response)
                window.location.reload()
            } else {
                showNotification({
                    title: 'Staff Register Failed',
                    message: registerStaff.error
                })
            }
        }
    })

    const handleSubmit = () => form.values.role === 'Student' ? startRegisterStudent() : startRegisterStaff()

    return (
        <>
        <Stepper active={active} onStepClick={setActive} size='xs'>
            <Stepper.Step label="Name" allowStepSelect={active > 0}>
                <Stack>
                    <Space/>
                    <Select size="md" key="Role" label="Register as" data={['Student', 'Staff']} {...form.getInputProps('role')}/>
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
                    {
                        form.values.role === 'Student' ? 
                            <Select size="md" key='MatricSelect' label="Matriculation Year" placeholder="Year" data={['2018', '2019', '2020', '2021']} {...form.getInputProps('yearOrTitle')}/> :
                            <Select size="md" key='TitleSelect' label="Staff Title" placeholder="Title" data={['AProf', 'Prof', 'Dr', 'Mr', 'Ms']} {...form.getInputProps('yearOrTitle')}/>
                    }
                    
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