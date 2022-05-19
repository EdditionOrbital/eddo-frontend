import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  theme,
  Box,
} from '@chakra-ui/react';
import LoginPage from './views/LoginPage/LoginPage';
import { useQuery } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import { CURRENT_USER } from './_queries';
import AllModulesPage from './views/AllModulesPage/AllModulesPage';

function App() {

  const [user, setUser] = useState(null)
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
    <Routes>
      <Route path='/' element={<HomePage {...props}/>}/>
      <Route path='/modules' element={<AllModulesPage {...props}/>}/>
    </Routes>
  )
  
  return (
    <ChakraProvider theme={theme}>
      <Box>
        {loading ? <></> : user ? routes : <LoginPage {...props}/> }
      </Box>
    </ChakraProvider>
  );
}

export default App;