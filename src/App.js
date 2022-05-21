import React, { useEffect, useState } from 'react';
import {
  Box,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import LoginPage from './views/LoginPage/LoginPage';
import { useQuery } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import { CURRENT_USER } from './_queries';
import AllModulesPage from './views/AllModulesPage/AllModulesPage';
import NavbarAlt from './components/Navbar/NavbarAlt';

const theme = extendTheme({
  "colors": {
    "purple": {
      "50": "#ECECF9",
      "100": "#C9C9ED",
      "200": "#A7A7E2",
      "300": "#8484D7",
      "400": "#6262CB",
      "500": "#3F3FC0",
      "600": "#32329A",
      "700": "#262673",
      "800": "#19194D",
      "900": "#0D0D26"
    },
    "cyan": {
      "50": "#EAFBFA",
      "100": "#C3F4F0",
      "200": "#9DECE7",
      "300": "#76E5DD",
      "400": "#4FDDD4",
      "500": "#29D6CA",
      "600": "#21ABA2",
      "700": "#198079",
      "800": "#105651",
      "900": "#082B28"
    },
    "gray": {
      "50": "#EFF2F6",
      "100": "#D1DBE6",
      "200": "#B3C4D5",
      "300": "#96ADC5",
      "400": "#7896B5",
      "500": "#5B7FA4",
      "600": "#496683",
      "700": "#364C63",
      "800": "#243342",
      "900": "#121921"
    }
  }
})

function App() {

  const [user, setUser] = useState(undefined)
  const {loading, error, data} = useQuery(CURRENT_USER)
  
  useEffect(() => {
    if (loading) console.log('Loading data')
    else if (error) console.log(error)
    else if (data) setUser(data.currentUser)
  }, [loading, error, data])

  const props = {
    user: user,
    setUser: setUser
  }

  const routes = (
    <Box>
      <NavbarAlt/>
      <Routes>
        <Route path='/' element={<HomePage {...props}/>}/>
        <Route path='/modules' element={<AllModulesPage {...props}/>}/>
      </Routes>
    </Box>
    
  )
  
  return (
    <ChakraProvider theme={theme}>
        {user === undefined ? <></> : user === null ? <LoginPage {...props}/> : routes }
    </ChakraProvider>
  );
}

export default App;