import { useQuery } from "@apollo/client";
import { Anchor, Badge, Divider, Group, Space, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { READ_MEDIA } from "../../queries/media";
import { Media } from "../../types/media.type";

interface MediaViewProps {

}

export default function MediaView(props: MediaViewProps) {
	const player = useRef<ReactPlayer | null>(null)
	const [currentTime, setCurrentTime] = useState<number>(0)
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(currentTime => {
				const newTime = player.current?.getCurrentTime() || 0
				if (currentTime !== newTime) return Math.floor(newTime)
				return currentTime
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [])
	const [media, setMedia] = useState<Media | null | undefined>(undefined)
	const { mediaId } = useParams()
	const { data } = useQuery(READ_MEDIA, {
		variables: { _id: mediaId }
	})
	useEffect(() => {
		if (data) setMedia(data.readMedia)
	}, [data])
	const navigate = useNavigate()
	if (media === undefined) return <></>
	if (media === null) return <Text>Error loading video: the video ID is invalid.</Text>
	return (
		<Stack>
			<Anchor onClick={() => navigate(-1)}>Back to Media</Anchor>
			<Divider my='sm'/>
			<Stack spacing='xs'>
				<Title order={3}>{media.title}</Title>
				<Group spacing='xl'>
					<Group spacing={4}>
					{
						media.tags.map(t => <Badge>{t}</Badge>)
					}
					</Group>
					<Text size='sm'>{moment(media.date).format("DD/MM/YYYY, hh:mm A")}</Text>
				</Group>
			</Stack>
			<Space/>
			<ReactPlayer ref={player} url={media.url}/>
		</Stack>
	)
}