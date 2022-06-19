import { Avatar, Group, MantineColor, Text, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function EddoNavbarButton({name, icon, url, color} : {name: string, icon: JSX.Element, url: string, key: string, color: MantineColor}) {
	const navigate = useNavigate()
	return (
		<UnstyledButton key={url} py={6} px='xs' className="fade-hover-card" onClick={() => navigate(url)}>
			<Group>
				<Avatar color={color} radius='sm'>
					{icon}
				</Avatar>
				<Text>{name}</Text>
			</Group>
		</UnstyledButton>
	)
}