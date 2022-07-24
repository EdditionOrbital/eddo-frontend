import { useMutation } from "@apollo/client"
import { ActionIcon, Button, Group, Modal, Select, Space, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import RichTextEditor from "@mantine/rte"
import moment from "moment"
import { useContext, useEffect } from "react"
import { Trash } from "tabler-icons-react"
import { emptyAnnouncement } from "../../constants/emptyTypes"
import { CREATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT } from "../../queries/announcement"
import { UserContext } from "../../services/userContextProvider"
import { Announcement } from "../../types/announcement.type"

interface AnnouncementModalProps {
	announcement: Announcement | null
	close: () => void
}

function AnnouncementModal(props: AnnouncementModalProps) {
	const { user, setUser } = useContext(UserContext)
	const form = useForm<Announcement>({ initialValues: emptyAnnouncement('') })
	const title = form.values.title === '' ? form.values._id && props.announcement ? props.announcement.title : 'New Announcement' : form.values.title
	const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT, {
		variables: form.values,
		onCompleted: ({ createAnnouncement }) => {
			const _id: string | null | undefined = createAnnouncement.response
			if (user && user.announcements && _id) {
				setUser({ ...user, announcements: [...user.announcements, ({ ...form.values, _id: _id, author: `${user.firstName} ${user.lastName}`})]})
				props.close()
			}
		}
	}) 
	const [updateAnnouncement] = useMutation(UPDATE_ANNOUNCEMENT, {
		variables: form.values,
		onCompleted: ({ updateAnnouncement }) => {
			const _id: string | null | undefined = updateAnnouncement.response
			if (user && user.announcements && _id) {
				setUser({ ...user, announcements: user.announcements.map(a => a._id === props.announcement?._id ? form.values : a)})
				props.close()
			}
		}
	}) 
	const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT, {
		variables: form.values,
		onCompleted: ({ deleteAnnouncement }) => {
			const response: string | null | undefined = deleteAnnouncement.response
			if (user && user.announcements && response) {
				setUser({ ...user, announcements: user.announcements.filter(a => a._id !== props.announcement?._id )})
				props.close()
			}
		}
	}) 
	useEffect(() => {
		if (props.announcement) form.setValues(props.announcement)
		else form.setValues(emptyAnnouncement(''))
		// eslint-disable-next-line
	}, [props.announcement])
	return ( 
		<Modal centered opened={props.announcement !== null} title={title} onClose={props.close} styles={{ title: { fontSize: 18, fontWeight: 'bold' }}}>
			<Stack spacing='xl'>
				{
					user?.__typename === 'Staff' && (
						<>
							<TextInput label="Title" {...form.getInputProps('title')}/>
							<RichTextEditor {...form.getInputProps('content')}/>
							<Select label="Module" data={user.modules?.map(m => ({ label: m.moduleId.split('-')[0], value: m.moduleId })) || []} {...form.getInputProps('moduleId')}/>
							<Space/>
							<Group position="apart">
								<Button onClick={() => form.values._id ? updateAnnouncement() : createAnnouncement()}>Publish</Button>
								{
									form.values._id && (
										<ActionIcon onClick={() => deleteAnnouncement()} color='red'>
											<Trash/>
										</ActionIcon>
									)
								}
							</Group>
						</>
					)
				}
				{
					user?.__typename === 'Student' && (
						<>
							<div className="dangSetHTML" dangerouslySetInnerHTML={{__html: props.announcement?.content || ''}}/>
							<Stack spacing={0}>
								<Text>by {props.announcement?.author}</Text>
								<Text>{moment(props.announcement?.date).format("DD/MM/YY, hh:mm A")}</Text>
							</Stack>
						</>
					)
				}
			</Stack>
		</Modal>
	 )
}

export default AnnouncementModal