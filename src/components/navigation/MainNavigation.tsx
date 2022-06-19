import { Navbar, Stack } from "@mantine/core"
import { Bell, Book2, Calendar, Home2 } from "tabler-icons-react"
import EddoNavbarButton from "./EddoNavbarButton"

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
		name: "Announcements", 
		url: '/announcements' ,
		icon: <Bell/>
	},
    { 
		name: "Timetable", 
		url: '/timetable' ,
		icon: <Calendar/>
	}
]

export default function MainNavigation() {
	return (
		<Navbar.Section p='xs'>
			<Stack spacing={0}>
				{routes.map(o => <EddoNavbarButton key={o.name} color='purple' {...o}/>)}
			</Stack>
		</Navbar.Section>
	)
}