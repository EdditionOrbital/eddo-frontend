import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/navigation/AppContainer/AppContainer";
import AllModulesPage from "./pages/ModulesPage/ModulesPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AUTH_TOKEN } from "./utils/constants";
import { CURRENT_USER } from "./queries/currentUser";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { User } from "./types/user.type";
import InitPage from "./pages/InitPage/InitPage";

function App() {

  const [user, setUser] = useState<{user: User | null, dbInitialised: boolean} | undefined>(undefined)
  const {loading, error, data} = useQuery(CURRENT_USER)

  const logOut = () => {
    setUser(undefined)
    localStorage.removeItem(AUTH_TOKEN)
    window.location.reload()
  }

  useEffect(() => {
    if (data === undefined) return
    else setUser(data.currentUser)
  }, [loading, error, data])

  if (user === undefined) return <></>
  if (user.dbInitialised === false) return <InitPage/>
  if (user.user === null) return <LoginPage/>

  const props = {
    user: user.user
  }

  return (
    <AppContainer logout={logOut}>
      <Routes>
        <Route path="/" element={<HomePage {...props}/>}/>
        <Route path="modules" element={<AllModulesPage/>}/>
        <Route path="settings" element={<SettingsPage {...props}/>}/>
      </Routes>
    </AppContainer>
  )

}

export default App;