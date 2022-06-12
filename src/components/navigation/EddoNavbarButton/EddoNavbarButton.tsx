import { Avatar, Group, MantineColor, Text, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import './EddoNavbarButton.css'

export default function EddoNavbarButton({name, icon, url, key, color} : {name: string, icon: JSX.Element, url: string, key: string, color: MantineColor}) {
	const navigate = useNavigate()
	return (
		<UnstyledButton py={6} px='xs' className="eddo-navbar-button" onClick={() => navigate(url)}>
			<Group>
				<Avatar color={color} radius='sm'>
					{icon}
				</Avatar>
				<Text>{name}</Text>
			</Group>
		</UnstyledButton>
	)
}