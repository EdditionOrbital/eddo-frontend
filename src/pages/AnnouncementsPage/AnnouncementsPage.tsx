import { Box, Stack, Table, Title } from "@mantine/core";
import { Announcement } from "../../types/announcement.type";

const announcements = [
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 1',
		name: 'Professor 1',
		module: 'CS2100'
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 1',
		name: 'Professor 2',
		module: 'CS2040'
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 2',
		name: 'Professor 1',
		module: 'CS2100'
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 3',
		name: 'Professor 1',
		module: 'CS2100'
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 1',
		name: 'Professor 3',
		module: 'MA2001'
	}
]

export default function AnnouncementsPage() {
	return (
		<Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
			<Stack style={{width: '100%'}}>
                <Title order={2}>Announcements</Title>
				<Table verticalSpacing='md' highlightOnHover fontSize='md' style={{minWidth: '100%'}}>
					<thead>
						<tr>
							<th>Date</th>
							<th>Announcement Title</th>
							<th>Author</th>
							<th>Module</th>
						</tr>
					</thead>
					<tbody>
						{
							announcements.map(a => (
								<tr>
									<td>{a.date}</td>
									<td>{a.title}</td>
									<td>{a.name}</td>
									<td>{a.module}</td>
								</tr>
							))
						}
					</tbody>
				</Table>
			</Stack>
		</Box>
	)
}