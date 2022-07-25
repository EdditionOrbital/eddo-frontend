import { useLazyQuery } from "@apollo/client";
import { Group, Table, Text } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Plus } from "tabler-icons-react";
import { emptyAnnouncement } from "../../constants/emptyTypes";
import { READ_CURRENT_USER_ANNOUNCEMENTS } from "../../queries/announcement";
import { UserContext } from "../../services/userContextProvider";
import { Announcement } from "../../types/announcement.type";
import AnnouncementModal from "./AnnouncementModal";

interface AnnouncementTableProps {
	limit?: number
	module?: string
}

const AnnouncementTable = (props: AnnouncementTableProps) => {

	const { user, setUser } = useContext(UserContext)

	const [getAnnouncements] = useLazyQuery(READ_CURRENT_USER_ANNOUNCEMENTS, {
		onCompleted: ({ currentUser }) => {
			if (user && currentUser) {
				setUser({ ...user, ...currentUser })
			}
		}
	})

	useEffect(() => {
		if (user && !user?.announcements) getAnnouncements()
		// eslint-disable-next-line
	}, [user])

	const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);

	if (!user?.announcements) return <></>

	return (
		<>
			<AnnouncementModal announcement={currentAnnouncement} close={() => setCurrentAnnouncement(null)}/>
			<Table verticalSpacing='md' fontSize='md' style={{minWidth: '100%'}}>
				<thead>
					<tr>
						<th>Date</th>
						<th>Announcement Title</th>
						<th>Author</th>
						{!props.module && <th>Module</th>}
					</tr>
				</thead>
				<tbody>
					{
						user.__typename === 'Staff' && (
							<tr className="fade-hover-card" onClick={() => setCurrentAnnouncement(emptyAnnouncement(user.modules && user.modules.length > 0 ? user.modules[0].moduleId : ''))}>
								<td colSpan={4}><Group><Plus size={16}/><Text>New</Text></Group></td>
							</tr>
						)
					}
					{
						user?.announcements.filter(a => props.module ? a.moduleId === props.module : true).slice(0, props.limit || user.announcements.length).map(a => (
							<tr key={`${a.date}-${a.title}`} onClick={() => setCurrentAnnouncement(a)} className="fade-hover-card">
								<td>{moment(a.date).format("DD/MM/YY, hh:mm A")}</td>
								<td>{a.title}</td>
								<td>{a.author}</td>
								{!props.module && <td>{a.moduleId.split('-')[0]}</td>}
							</tr>
						))
					}
				</tbody>
			</Table>
		</>
	);
};

export default AnnouncementTable
