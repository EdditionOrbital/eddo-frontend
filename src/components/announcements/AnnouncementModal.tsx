import { Modal, Stack, Text, Title } from "@mantine/core";
import { Announcement } from "../../types/announcement.type";

function AnnouncementModal({announcement, close} : {announcement: Announcement | null, close: () => void}) {
	return ( 
		<Modal centered opened={announcement !== null} title={'Announcement'} onClose={close}>
			<Stack spacing='xl'>
				<Stack spacing='xs'>
					<Title order={3}>{announcement?.title}</Title>
					<Text>{announcement?.content ? announcement?.content : 'No content for announcement'}</Text>
				</Stack>
				<Stack spacing={0}>
					<Text>by {announcement?.author}</Text>
					<Text>{announcement?.date}</Text>
				</Stack>
			</Stack>
		</Modal>
	 );
}

export default AnnouncementModal;