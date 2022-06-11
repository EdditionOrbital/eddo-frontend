import { useMutation } from "@apollo/client";
import { Button, Center, PasswordInput, Space, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../components/misc/Logo/Logo";
import { ADMIN_REGISTER_MUTATION } from "../../queries/Login";
import { AUTH_TOKEN } from "../../utils/constants";

export default function InitPage() {

	const form = useForm({
		initialValues: {
			email: '',
			password: ''
		}
	})

	const [startAdminRegister] = useMutation(ADMIN_REGISTER_MUTATION, {
		variables: form.values,
		onCompleted: ({ newAdmin }) => {
			if (newAdmin.response) {
				localStorage.setItem(AUTH_TOKEN, newAdmin.token)
				window.location.reload()
			}
		}
	})

	return (
		<Center style={{ height: '100vh' }}>
			<Stack style={{ width: '90%', maxWidth: 500 }}>
				<Stack align='center'>
					<Center>
						<Logo height={50}/>
					</Center>
					<Title>Welcome to Eddo</Title>
					<Text size="xl">Set up an admin account</Text>
				</Stack>
				<TextInput size="md" label='Email' placeholder="xxx@yyy.com" {...form.getInputProps('email')}/>
				<PasswordInput size="md" label='Password' placeholder="Password" {...form.getInputProps('password')}/>
				<Space/>
				<Button size="md" onClick={() => startAdminRegister()}>Create Admin Account</Button>
			</Stack>
		</Center>
	)
}