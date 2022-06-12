import { MediaQuery, Navbar, useMantineTheme } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { User } from "../../../types/user.type";
import Logo from "../../misc/Logo/Logo";
import MainNavigation from "../MainNavigation/MainNavigation";
import NavbarProfile from "../NavbarProfile/NavbarProfile";
import SubpageNavigation from "../SubpageNavigation/SubpageNavigation";

export default function EddoNavbar({hidden, user} : {hidden: boolean, user: User}) {

	const theme = useMantineTheme()

	return (
		<Navbar hiddenBreakpoint='sm' hidden={hidden} width={{base: 300}}>
			<MediaQuery smallerThan='sm' styles={{display: 'none'}}>
				<Navbar.Section p='lg' style={{borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`}}>
					<Logo height={30}/>
				</Navbar.Section>
			</MediaQuery>
			<NavbarProfile user={user}/>
			<MainNavigation/>
			<Routes>
				<Route path="/modules/:id/*" element={<SubpageNavigation/>}/>
				<Route path="*" element={<></>}/>
			</Routes>
		</Navbar>
	)
}