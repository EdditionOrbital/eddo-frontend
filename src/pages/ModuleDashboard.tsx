import { Button, Group, Stack, Table, Text, Title } from "@mantine/core";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AnnouncementTable from "../components/announcements/AnnouncementTable";
import { UserContext } from "../services/userContextProvider";
import { Module } from "../types/module.type";

interface ModuleDashboardProps {
	module: Module
}

const LIMIT_CONST = 3

function StudentDashboard(props: ModuleDashboardProps) {
	const [limit, setLimit] = useState<number | undefined>(LIMIT_CONST)
	return (
		<Stack spacing='xl'>
			<Stack>
				<Group position="apart">
					<Title order={3}>Latest Announcements</Title>
					<Button onClick={() => setLimit(limit ? undefined : LIMIT_CONST)}>{limit ? 'View All' : 'Collapse'}</Button>
				</Group>
				<AnnouncementTable module={props.module.id} limit={limit}/>
			</Stack>
			{/* <Stack>
				<Title order={3}>Assignments/Quizzes Due Soon</Title>
				<Table>
					<thead>
						<tr>
							<th>Type</th>
							<th>Title</th>
							<th>Closes</th>
							<th>Status</th>
						</tr>
					</thead>
				</Table>
			</Stack> */}
		</Stack>
	)
}

function StaffDashboard(props: ModuleDashboardProps) {
	return (
		<Stack>
			<Text>Staff</Text>
		</Stack>
	)
}

export default function ModuleDashboard(props: ModuleDashboardProps) {
	const { user } = useContext(UserContext)
	return user?.__typename === 'Staff' ? <StaffDashboard {...props}/> : <StudentDashboard {...props}/>
}