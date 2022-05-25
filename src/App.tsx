import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer/AppContainer";
import AllModulesPage from "./pages/AllModulesPage/AllModulesPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { CURRENT_USER } from "./queries/CurrentUser";

function App() {

  const [user, setUser] = useState(undefined)
  const {loading, error, data} = useQuery(CURRENT_USER)

  const props = {
    user: user
  }

  const routes = (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage {...props}/>}/>
        <Route path="modules" element={<AllModulesPage/>}/>
      </Routes>
    </AppContainer>
  )

  useEffect(() => {
    if (loading) console.log('Loading data...')
    else if (error) console.log(error)
    else setUser(data.currentUser)
  }, [loading, error, data])

  return (
    user === undefined ? <></> : user === null ? <LoginPage/> : routes
  );
}

export default App;