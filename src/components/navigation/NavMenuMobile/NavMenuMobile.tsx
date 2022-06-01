import { Button, MediaQuery, Navbar, Space, Stack } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import SiteNavigationButtons from "../SiteNavigationButtons/SiteNavigationButtons"

const NavMenuMobile = ({hide, logout}: {hide: boolean | undefined, logout: () => void}) => {

    const navigate = useNavigate()

    return (
        <MediaQuery largerThan='sm' styles={{ display: 'none'}}>
            <Navbar p='md' hidden={hide} hiddenBreakpoint='sm' style={{width:200}}>
                <Stack>
                    <SiteNavigationButtons smallScreen/>
                    <Space/>
                    <Button variant="light" color='gray' onClick={() => navigate('/settings', { replace: true })}>Settings</Button>
                    <Button variant="light" color='red' onClick={logout}>Log Out</Button>
                </Stack>
            </Navbar>
        </MediaQuery>
    )
}

export default NavMenuMobile