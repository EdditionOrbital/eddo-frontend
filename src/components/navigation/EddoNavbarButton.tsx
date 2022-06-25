import { Avatar, Group, MantineColor, Text, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface EddoNavbarButtonProps {
	name: string
	icon: JSX.Element
	url: string
	color: MantineColor
}

export default function EddoNavbarButton(props: EddoNavbarButtonProps) {
	const navigate = useNavigate()
	return (
		<UnstyledButton key={props.url} py={6} px='xs' className="fade-hover-card" onClick={() => navigate(props.url)}>
			<Group>
				<Avatar color={props.color} radius='sm'>
					{props.icon}
				</Avatar>
				<Text>{props.name}</Text>
			</Group>
		</UnstyledButton>
	)
}