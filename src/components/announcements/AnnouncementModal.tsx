import { Modal, Stack, Text, Title } from "@mantine/core"
import { Announcement } from "../../types/announcement.type"

interface AnnouncementModalProps {
	announcement: Announcement | null
	close: () => void
}

function AnnouncementModal(props: AnnouncementModalProps) {
	return ( 
		<Modal centered opened={props.announcement !== null} title={'Announcement'} onClose={props.close}>
			<Stack spacing='xl'>
				<Stack spacing='xs'>
					<Title order={3}>{props.announcement?.title}</Title>
					<Text>{props.announcement?.content ? props.announcement?.content : 'No content for announcement'}</Text>
				</Stack>
				<Stack spacing={0}>
					<Text>by {props.announcement?.author}</Text>
					<Text>{props.announcement?.date}</Text>
				</Stack>
			</Stack>
		</Modal>
	 )
}

export default AnnouncementModal