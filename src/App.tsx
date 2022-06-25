import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/navigation/AppContainer";
import AllModulesPage from "./pages/ModulesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ModuleSubpage from "./pages/ModuleSubpage";
import { UserContext } from "./services/userContextProvider";

function App() {
	const {user} = useContext(UserContext)
	if (user === undefined) return <></>
	if (user === null) return <LoginPage/>

	return (
		<AppContainer>
			<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="modules" element={<AllModulesPage/>}/>
			<Route path="settings" element={<SettingsPage/>}/>
			<Route path="announcements" element={<AnnouncementsPage/>}/>
			<Route path="modules/:moduleId/*" element={<ModuleSubpage/>}/>
			</Routes>
		</AppContainer>
	)
}

export default App;