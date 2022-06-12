import { Navbar, Stack } from "@mantine/core";
import { useParams } from "react-router-dom";
import { Dashboard, File, InfoSquare, Video } from "tabler-icons-react";
import EddoNavbarButton from "../EddoNavbarButton/EddoNavbarButton";

export default function SubpageNavigation() {

	const { id } = useParams()

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
			name: "Resources", 
			url: `/modules/${id}/resources` ,
			icon: <File/>
		}
	]

	return (
		<Navbar.Section p='xs' grow style={{borderTop: '1px solid #ddd'}}>
			<Stack spacing={0}>
				{subpageRoutes.map(o => <EddoNavbarButton key={o.name} color='cyan' {...o}/>)}
			</Stack>
		</Navbar.Section>
	)
}