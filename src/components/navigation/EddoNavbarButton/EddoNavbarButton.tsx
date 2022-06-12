import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import './EddoNavbarButton.css'

export default function EddoNavbarButton({name, icon, url, key} : {name: string, icon: JSX.Element, url: string, key: string}) {
	const navigate = useNavigate()
	return (
		<UnstyledButton p='xs' className="eddo-navbar-button" onClick={() => navigate(url)}>
			<Group>
				<Avatar color={'blue'} radius='sm'>
					{icon}
				</Avatar>
				<Text>{name}</Text>
			</Group>
		</UnstyledButton>
	)
}