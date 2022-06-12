import { Avatar, Group, MediaQuery, Navbar, Stack, Text } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { Book2, Calendar, Home2, Mail } from "tabler-icons-react";
import Logo from "../../misc/Logo/Logo";
import EddoNavbarButton from "../EddoNavbarButton/EddoNavbarButton";

const routes = [
    { 
		name: "Home", 
		icon: <Home2/>,
		url: '/',
	},
    { 
		name: "Modules", 
		url: '/modules',
		icon: <Book2/>
	},
    { 
		name: "Email", 
		url: '/' ,
		icon: <Mail/>
	},
    { 
		name: "Timetable", 
		url: '/' ,
		icon: <Calendar/>
	}
]

export default function EddoNavbar({hidden, logout} : {hidden: boolean, logout: () => void}) {

	const moduleSubpageSidebar = (
		<Routes>
			<Route path="/modules" element={(
				<Navbar.Section p='xs' grow style={{borderTop: '1px solid #ddd'}}>
					<div>Hello</div>
				</Navbar.Section>
			)}/>
			<Route path="*" element={<></>}/>
		</Routes>
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
					<Avatar color='purple'>A</Avatar>
					<div>
						<Text>Ellen</Text>
						<Text size="xs" style={{opacity: 0.3}}>ellen_sanders@u.nus.edu</Text>
					</div>
				</Group>
			</Navbar.Section>
			<Navbar.Section p='xs'>
				<Stack spacing={0}>
					{routes.map(o => <EddoNavbarButton key={o.name} {...o}/>)}
				</Stack>
			</Navbar.Section>
			{moduleSubpageSidebar}
		</Navbar>
	)
}