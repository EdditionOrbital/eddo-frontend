import { useMutation } from "@apollo/client";
import { Button, Group, Modal, MultiSelect, Space, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { emptyMedia } from "../../constants/emptyTypes";
import { CREATE_MEDIA, UPDATE_MEDIA } from "../../queries/media";
import { EddoCallback } from "../../types/callbacks.type";
import { Media } from "../../types/media.type";

interface MediaModalProps {
	media: Media | null
	close: () => void
	tags: string[]
	callbacks: EddoCallback<Media>
}

export default function MediaModal(props: MediaModalProps) {
	const form = useForm<Media>({ initialValues: emptyMedia})
	const { moduleId } = useParams()
	useEffect(() => {
		if (!props.media) {
			form.setValues(emptyMedia)
		} else {
			form.setValues(props.media)
		}
	}, [props.media])
	const [createMedia] = useMutation(CREATE_MEDIA, {
		variables: { ...form.values, moduleId },
		onCompleted: ({ createMedia }) => {
			if (createMedia.response) {
				props.callbacks.create({ ...form.values, _id: createMedia.response })
				props.close()
			}
		}
	})
	const [updateMedia] = useMutation(UPDATE_MEDIA, {
		variables: form.values,
		onCompleted: ({ updateMedia }) => {
			if (updateMedia.response) {
				props.callbacks.update(form.values)
				props.close()
			}
		}
	})
	const title = form.values._id ? form.values.title !== '' ? form.values.title : props.media?.title || '' : 'New Media'
	return (
		<Modal opened={!!props.media} onClose={props.close} title={title} styles={{ title: { fontWeight: 'bold' }}}>
			<Stack>
				<TextInput label="Media Title" {...form.getInputProps('title')}/>
				<TextInput label="Media URL" {...form.getInputProps('url')}/>
				<MultiSelect data={props.tags} label="Tags" searchable creatable {...form.getInputProps('tags')}/>
				<Space/>
				<Group>
					<Button onClick={() => props.media?._id ? updateMedia() : createMedia()}>
						{ props.media?._id ? 'Update' : 'Add' }
					</Button>
				</Group>
			</Stack>
		</Modal>
	)
}