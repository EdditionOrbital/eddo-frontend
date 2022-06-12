import { Avatar, Group, MediaQuery, Navbar, Text } from "@mantine/core";
import Logo from "../../misc/Logo/Logo";

const routes = [
    { 
		name: "Home", 
		url: '/',
	},
    { name: "Modules", url: '/modules' },
    { name: "Email", url: '/' },
    { name: "Timetable", url: '/' }
]

export default function EddoNavbar({hidden, logout} : {hidden: boolean, logout: () => void}) {
	return (
		<Navbar hiddenBreakpoint='sm' hidden={hidden} width={{base: 280}}>
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
			<Navbar.Section p='xs' grow>
			</Navbar.Section>
		</Navbar>
	)
}