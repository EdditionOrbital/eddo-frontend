import { Route, Routes } from "react-router-dom";
import MediaList from "../components/media/MediaList";
import MediaView from "../components/media/MediaView";

export default function ModuleMedia() {
	return (
		<Routes>
			<Route path="/" element={<MediaList/>}/>
			<Route path="/:mediaId" element={<MediaView/>}/>
		</Routes>
	)
}