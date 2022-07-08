import { Stack, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Route, Routes } from "react-router-dom";
import MediaList from "../components/media/MediaList";
import MediaView from "../components/media/MediaView";

export default function ModuleMedia() {
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
	useEffect(() => {
		console.log(currentTime)
	}, [currentTime])
	return (
		// <Stack>
		// 	<Title>Hello</Title>
		// 	<ReactPlayer ref={player} url={'https://www.youtube.com/watch?v=1La4QzGeaaQ'}/>
		// </Stack>
		<Routes>
			<Route path="/" element={<MediaList/>}/>
			<Route path="/:mediaId" element={<MediaView/>}/>
		</Routes>
	)
}