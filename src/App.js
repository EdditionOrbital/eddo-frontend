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
      "50": "#E0E0F5",
      "100": "#CDCDEF",
      "200": "#B9B9E8",
      "300": "#A6A6E2",
      "400": "#9292DB",
      "500": "#7F7FD5",
      "600": "#6C6CC6",
      "700": "#5959B8",
      "800": "#4545A9",
      "900": "#32329A"
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
    }, 
    "charcoal" : {
      "50": "#A3B8CC",
      "100": "#8DA2B6",
      "200": "#778CA0",
      "300": "#60758A",
      "400": "#4A5F74",
      "500": "#34495E",
      "600": "#2D3F50",
      "700": "#253443",
      "800": "#1E2A35",
      "900": "#161F27"
    },
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