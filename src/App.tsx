import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/navigation/AppContainer/AppContainer";
import AllModulesPage from "./pages/ModulesPage/ModulesPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AUTH_TOKEN } from "./utils/constants";
import { APP_CONTEXT } from "./queries/eddoAppContext";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { User } from "./types/user.type";
import { EddoAppContext } from "./types/eddoAppContext.type";

function App() {

  const [user, setUser] = useState<EddoAppContext | undefined>(undefined)
  const {loading, error, data} = useQuery(APP_CONTEXT)

  const logOut = () => {
    setUser(undefined)
    localStorage.removeItem(AUTH_TOKEN)
    window.location.reload()
  }

  useEffect(() => {
    if (data === undefined) return
    else setUser(data.eddoAppContext)
  }, [loading, error, data])

  if (user === undefined) return <></>
  if (user.currentUser === null) return <LoginPage/>

  const props = {
    user: user.currentUser
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