import { ActionIcon, Burger, Group, Header, MediaQuery } from "@mantine/core"
import Logo from "../../misc/Logo/Logo"
import { MdLogout } from 'react-icons/md'
import SiteNavigationButtons from "../SiteNavigationButtons/SiteNavigationButtons"

const EddoHeader = ({opened, toggle, logout}: {opened: boolean, toggle: () => void, logout: () => void}) => {

    return (
        <Header height={84} p='xl'>
            <Group position="apart">
                <Logo height={32.4}/>
                <MediaQuery smallerThan='sm' styles={{display: 'none'}}>
                    <Group>
                        <SiteNavigationButtons smallScreen={false}/>
                        <ActionIcon onClick={logout} color='red' variant='light'>
                            <MdLogout/>
                        </ActionIcon>
                    </Group>
                </MediaQuery>
                <MediaQuery largerThan='sm' styles={{display: 'none'}}>
                    <Burger opened={opened} onClick={toggle}/>
                </MediaQuery>
            </Group>
        </Header>
    )
}

export default EddoHeader