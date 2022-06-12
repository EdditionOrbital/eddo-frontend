import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/navigation/AppContainer/AppContainer";
import AllModulesPage from "./pages/ModulesPage/ModulesPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { APP_CONTEXT } from "./queries/eddoAppContext";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { EddoAppContext } from "./types/eddoAppContext.type";

function App() {

  const [appContext, setAppContext] = useState<EddoAppContext | undefined>(undefined)
  const {loading, error, data} = useQuery(APP_CONTEXT)

  useEffect(() => {
    if (data === undefined) return
    else setAppContext(data.eddoAppContext)
  }, [loading, error, data])

  if (appContext === undefined) return <></>
  if (appContext.currentUser === null) return <LoginPage/>

  const props = {
    user: appContext.currentUser,
    setAppContext: setAppContext
  }

  return (
    <AppContainer {...props}>
      <Routes>
        <Route path="/" element={<HomePage {...props}/>}/>
        <Route path="modules" element={<AllModulesPage/>}/>
        <Route path="settings" element={<SettingsPage {...props}/>}/>
      </Routes>
    </AppContainer>
  )

}

export default App;