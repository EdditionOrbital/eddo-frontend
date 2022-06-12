import { Avatar, Group, Navbar, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user.type";

export default function NavbarProfile({user} : {user: User}) {

	const [popoverOpened, setPopoverOpened] = useState(false)
	const navigate = useNavigate()
	const theme = useMantineTheme()

	return (
		<Navbar.Section className="fade-hover-card" p='lg' style={{borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`}} onClick={() => navigate('/settings')}>
			<Group>
				<Avatar onClick={() => setPopoverOpened(!popoverOpened)} color='blue'>{user.firstName.charAt(0)}</Avatar>
				<div>
					<Text>{user.firstName}</Text>
					<Text size="xs" style={{opacity: 0.3}}>{user.email}</Text>
				</div>
			</Group>
		</Navbar.Section>
	)
}