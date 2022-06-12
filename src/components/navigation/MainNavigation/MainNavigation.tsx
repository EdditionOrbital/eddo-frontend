import { Navbar, Stack } from "@mantine/core"
import { Book2, Calendar, Home2, Mail } from "tabler-icons-react"
import EddoNavbarButton from "../EddoNavbarButton/EddoNavbarButton"

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

export default function MainNavigation() {
	return (
		<Navbar.Section p='xs'>
			<Stack spacing={0}>
				{routes.map(o => <EddoNavbarButton key={o.name} color='purple' {...o}/>)}
			</Stack>
		</Navbar.Section>
	)
}