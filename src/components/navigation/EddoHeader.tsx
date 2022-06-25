import { ActionIcon, Group, Header, MediaQuery } from "@mantine/core"
import Logo from "../misc/Logo"
import { Menu2 } from "tabler-icons-react"

interface EddoHeaderProps {
    toggle: () => void
}

const EddoHeader = (props: EddoHeaderProps) => {
    return (
        <MediaQuery largerThan='sm' styles={{display:'none'}}>
            <Header height={60} p='md'>
                <Group position="apart">
                    <Logo height={30}/>
                    <ActionIcon onClick={props.toggle}>
                        <Menu2/>
                    </ActionIcon>
                </Group>
            </Header>
        </MediaQuery>
    )
}

export default EddoHeader