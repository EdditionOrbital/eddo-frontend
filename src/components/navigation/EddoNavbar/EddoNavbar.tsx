import { Avatar, Group, MediaQuery, Navbar, Text } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Logo from "../../misc/Logo/Logo";
import MainNavigation from "../MainNavigation/MainNavigation";
import SubpageNavigation from "../SubpageNavigation/SubpageNavigation";

export default function EddoNavbar({hidden, logout} : {hidden: boolean, logout: () => void}) {

	const siteNavigation = (
		<>
			<MainNavigation/>
			<Routes>
				<Route path="/modules/:id/*" element={<SubpageNavigation/>}/>
				<Route path="*" element={<></>}/>
			</Routes>
		</>
	)

	return (
		<Navbar hiddenBreakpoint='sm' hidden={hidden} width={{base: 300}}>
			<MediaQuery smallerThan='sm' styles={{display: 'none'}}>
				<Navbar.Section p='lg' style={{borderBottom: '1px solid #ddd'}}>
					<Logo height={30}/>
				</Navbar.Section>
			</MediaQuery>
			<Navbar.Section p='lg' style={{borderBottom: '1px solid #ddd'}}>
				<Group>
					<Avatar color='blue'>A</Avatar>
					<div>
						<Text>Ellen</Text>
						<Text size="xs" style={{opacity: 0.3}}>ellen_sanders@u.nus.edu</Text>
					</div>
				</Group>
			</Navbar.Section>
			{siteNavigation}
		</Navbar>
	)
}