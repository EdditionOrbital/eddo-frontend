import { Button, MediaQuery, Navbar, Space, Stack } from "@mantine/core"
import SiteNavigationButtons from "../SiteNavigationButtons/SiteNavigationButtons"

const NavMenuMobile = ({hide, logout}: {hide: boolean | undefined, logout: () => void}) => {
    return (
        <MediaQuery largerThan='sm' styles={{ display: 'none'}}>
            <Navbar p='md' hidden={hide} hiddenBreakpoint='sm' style={{width:200}}>
                <Stack>
                    <SiteNavigationButtons smallScreen/>
                    <Space/>
                    <Button variant="light" color='red' onClick={logout}>Log Out</Button>
                </Stack>
            </Navbar>
        </MediaQuery>
    )
}

export default NavMenuMobile