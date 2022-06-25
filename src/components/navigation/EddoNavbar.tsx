import { MediaQuery, Navbar, useMantineTheme } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { User } from "../../types/user.type";
import Logo from "../misc/Logo";
import MainNavigation from "./MainNavigation";
import NavbarProfile from "./NavbarProfile";
import SubpageNavigation from "./SubpageNavigation";

interface EddoNavbarProps {
	user: User
	hidden: boolean
}

export default function EddoNavbar(props: EddoNavbarProps) {

	const theme = useMantineTheme()

	return (
		<Navbar hiddenBreakpoint='sm' hidden={props.hidden} width={{base: 300}}>
			<MediaQuery smallerThan='sm' styles={{display: 'none'}}>
				<Navbar.Section p='lg' style={{borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`}}>
					<Logo height={30}/>
				</Navbar.Section>
			</MediaQuery>
			<NavbarProfile user={props.user}/>
			<MainNavigation/>
			<Routes>
				<Route path="/modules/:id/*" element={<SubpageNavigation/>}/>
				<Route path="*" element={<></>}/>
			</Routes>
		</Navbar>
	)
}