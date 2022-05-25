import { Avatar, Group, Stack, Text, Title } from "@mantine/core"

const HomeWelcome = ({firstName, lastName} : {firstName: string | undefined, lastName: string | undefined}) => {
    return (
        <Group>
            <Avatar size='lg' color='dark' radius='xl'>{firstName?.charAt(0)}{lastName?.charAt(0)}</Avatar>
            <Stack spacing={0}>
                <Text>Welcome back,</Text>
                <Title order={2}>{firstName}</Title>
            </Stack>
        </Group>
    )
}

export default HomeWelcome