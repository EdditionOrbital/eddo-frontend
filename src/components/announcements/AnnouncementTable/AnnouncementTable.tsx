import { Table } from "@mantine/core";
import { useState } from "react";
import { Announcement } from "../../../types/announcement.type";
import AnnouncementModal from "../AnnouncementModal/AnnouncementModal";

const announcements: Announcement[] = [
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 1',
		author: 'Professor 1',
		moduleId: 'CS2100',
		authorId: null,
		content: null
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 1',
		author: 'Professor 2',
		moduleId: 'CS2040',
		authorId: null,
		content: null
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 2',
		author: 'Professor 1',
		moduleId: 'CS2100',
		authorId: null,
		content: null
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 3',
		author: 'Professor 1',
		moduleId: 'CS2100',
		authorId: null,
		content: null
	},
	{
		date: '26th May, 9:02 PM',
		title: 'Lorem Ipsum 1',
		author: 'Professor 3',
		moduleId: 'MA2001',
		authorId: null,
		content: null
	}
]

const AnnouncementTable = () => {

	/*TODO: Add query for context announcements*/

	const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);

	return (
		<>
			<AnnouncementModal announcement={currentAnnouncement} close={() => setCurrentAnnouncement(null)}/>
			<Table verticalSpacing='md' fontSize='md' style={{minWidth: '100%'}}>
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
							<tr onClick={() => setCurrentAnnouncement(a)} className="fade-hover-card">
								<td>{a.date}</td>
								<td>{a.title}</td>
								<td>{a.author}</td>
								<td>{a.moduleId}</td>
							</tr>
						))
					}
				</tbody>
			</Table>
		</>
	);
};

export default AnnouncementTable
