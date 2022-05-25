import { Burger, Group, Header, MediaQuery } from "@mantine/core"
import Logo from "../../Logo/Logo"
import SiteNavigationButtons from "../SiteNavigationButtons/SiteNavigationButtons"

const EddoHeader = ({opened, toggle}: {opened: boolean, toggle: () => void}) => {

    return (
        <Header height={84} p='xl'>
            <Group position="apart">
                <Logo height={32.4}/>
                <MediaQuery smallerThan='sm' styles={{display: 'none'}}>
                    <Group>
                        <SiteNavigationButtons smallScreen={false}/>
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