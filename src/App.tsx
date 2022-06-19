import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/navigation/AppContainer";
import AllModulesPage from "./pages/ModulesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ModuleSubpage from "./pages/ModuleSubpage";
import { User } from "./types/user.type";
import { CURRENT_USER } from "./queries/auth";

function App() {
	const [user, setUser] = useState<User | null | undefined>(undefined)
	const {loading, error, data} = useQuery(CURRENT_USER)

	useEffect(() => {
		if (data !== undefined) setUser(data.currentUser)
	}, [loading, error, data])

	if (user === undefined) return <></>
	if (user === null) return <LoginPage/>

	const props = {
		user: user,
		setUser: setUser
	}

	return (
		<AppContainer {...props}>
			<Routes>
			<Route path="/" element={<HomePage {...props}/>}/>
			<Route path="modules" element={<AllModulesPage/>}/>
			<Route path="settings" element={<SettingsPage {...props}/>}/>
			<Route path="announcements" element={<AnnouncementsPage/>}/>
			<Route path="modules/:moduleId/*" element={<ModuleSubpage {...props}/>}/>
			</Routes>
		</AppContainer>
	)
}

export default App;