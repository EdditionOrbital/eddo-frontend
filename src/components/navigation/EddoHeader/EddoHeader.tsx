import { ActionIcon, Group, Header, MediaQuery } from "@mantine/core"
import Logo from "../../misc/Logo/Logo"
import { Menu2 } from "tabler-icons-react"

const EddoHeader = ({toggle}: {toggle: () => void}) => {
    return (
        <MediaQuery largerThan='sm' styles={{display:'none'}}>
            <Header height={60} p='md'>
                <Group position="apart">
                    <Logo height={30}/>
                    <ActionIcon onClick={toggle}>
                        <Menu2/>
                    </ActionIcon>
                </Group>
            </Header>
        </MediaQuery>
    )
}

export default EddoHeader