import { Navbar, Stack, useMantineTheme } from "@mantine/core";
import { useParams } from "react-router-dom";
import { Dashboard, File, InfoSquare, Paperclip, Video } from "tabler-icons-react";
import EddoNavbarButton from "./EddoNavbarButton";

export default function SubpageNavigation() {

	const { id } = useParams()
	const theme = useMantineTheme()

	const subpageRoutes = [
		{ 
			name: "Module Dashboard", 
			icon: <Dashboard/>,
			url: `/modules/${id}/`,
		},
		{ 
			name: "Module Details", 
			url: `/modules/${id}/details`,
			icon: <InfoSquare/>
		},
		{ 
			name: "Media", 
			url: `/modules/${id}/media`,
			icon: <Video/>
		},
		{ 
			name: "Assignments", 
			url: `/modules/${id}/assignments` ,
			icon: <Paperclip/>
		},
		{ 
			name: "Resources", 
			url: `/modules/${id}/resources` ,
			icon: <File/>
		}
	]

	return (
		<Navbar.Section p='xs' grow style={{borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`}}>
			<Stack spacing={0}>
				{subpageRoutes.map(o => <EddoNavbarButton key={o.name} color='cyan' {...o}/>)}
			</Stack>
		</Navbar.Section>
	)
}