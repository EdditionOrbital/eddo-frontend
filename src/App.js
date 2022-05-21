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
import Navbar from './components/Navbar/Navbar';

const theme = extendTheme({
  "colors": {
    "purple": {
      "50": "#D1D1F0",
      "100": "#C8C8ED",
      "200": "#BFBFEA",
      "300": "#B6B6E7",
      "400": "#ADADE4",
      "500": "#A3A3E1",
      "600": "#9A9ADE",
      "700": "#9191DB",
      "800": "#8888D8",
      "900": "#7F7FD5"
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
      <Navbar/>
      <Box p={12}>
      <Routes>
        <Route path='/' element={<HomePage {...props}/>}/>
        <Route path='/modules' element={<AllModulesPage {...props}/>}/>
      </Routes>
      </Box>
    </Box>
    
  )
  
  return (
    <ChakraProvider theme={theme}>
        {user === undefined ? <></> : user === null ? <LoginPage {...props}/> : routes }
    </ChakraProvider>
  );
}

export default App;