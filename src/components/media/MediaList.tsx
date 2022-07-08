import { useMutation, useQuery } from "@apollo/client";
import { ActionIcon, Badge, Button, Group, Table, TextInput } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash } from "tabler-icons-react";
import { emptyMedia } from "../../constants/emptyTypes";
import { DELETE_MEDIA, READ_MODULE_MEDIA } from "../../queries/media";
import { UserContext } from "../../services/userContextProvider";
import { EddoCallback } from "../../types/callbacks.type";
import { Media } from "../../types/media.type";
import MediaModal from "./MediaModal";

export default function MediaList() {
	const { moduleId } = useParams()
	const { data } = useQuery(READ_MODULE_MEDIA, {
		variables: { moduleId: moduleId }
	})
	const [medias, setMedias] = useState<Media[]>([])
	const [selected, setSelected] = useState<Media | null>(null)
	const [tags, setTags] = useState<string[]>([])
	useEffect(() => {
		if (data && data.readModule) {
			setMedias(data.readModule.media)
		}
	}, [data])
	useEffect(() => {
		const dupTags = medias.flatMap(m => m.tags)
		setTags(dupTags.filter((t, i) => dupTags.indexOf(t) === i))
	}, [medias])
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const close = () => setSelected(null)
	const callbacks: EddoCallback<Media> = {
		create: (x) => setMedias([...medias, x]),
		update: (x) => setMedias(medias.map(m => m._id === x._id ? x : m)),
		delete: (_id) => setMedias(medias.filter(m => m._id !== _id))
	}
	const [deleteMedia] = useMutation(DELETE_MEDIA)
	return (
		<>
		<MediaModal callbacks={callbacks} tags={tags} media={selected} close={close}/>
		<Group>
			<TextInput placeholder="Search"/>
			{	user?.__typename === 'Staff' &&
				<Button variant="light" onClick={() => setSelected(emptyMedia)}>Add New</Button>
			}
		</Group>
		<Table fontSize='sm' verticalSpacing='sm'>
			<thead>
				<tr>
					<th>Date</th>
					<th>Title</th>
					<th>Tags</th>
					{ user?.__typename === 'Staff' && <th>Modify</th>}
				</tr>
			</thead>
			<tbody>
				{
					medias.map(m => (
					<tr className="fade-hover-card">
							<td onClick={() => navigate(m._id || '')} width={200}>{moment(m.date).format('DD/MM/YYYY, hh:mm A')}</td>
							<td onClick={() => navigate(m._id || '')}>{m.title}</td>
							<td onClick={() => navigate(m._id || '')} width={300}>
								{
									<Group spacing='xs'>
										{ m.tags.map(t => <Badge size="xs">{t}</Badge>)}
									</Group>
								}
							</td>
							{
								user?.__typename === 'Staff' &&
								<td width={100}>
									<Group>
										<ActionIcon onClick={() => setSelected(m)}>
											<Pencil/>
										</ActionIcon>
										<ActionIcon onClick={() => deleteMedia({
											variables: m,
											onCompleted: ({ deleteMedia }) => {
												if (deleteMedia.response) {
													callbacks.delete(m._id || '')
												}
											}
										})} color='red'>
											<Trash/>
										</ActionIcon>
									</Group>
								</td>
							}
						</tr>
					))
				}
			</tbody>
		</Table>
		</>
	)
}