import { MediaQuery, Navbar } from "@mantine/core"
import SiteNavigationButtons from "../SiteNavigationButtons/SiteNavigationButtons"

const NavMenuMobile = ({hide}: {hide: boolean | undefined}) => {
    return (
        <MediaQuery largerThan='sm' styles={{ display: 'none'}}>
            <Navbar p='md' hidden={hide} hiddenBreakpoint='sm' style={{width:200}}>
                <SiteNavigationButtons smallScreen/>
            </Navbar>
        </MediaQuery>
    )
}

export default NavMenuMobile