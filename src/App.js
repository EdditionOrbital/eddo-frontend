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
  
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Routes>
          <Route path='/' element={loading ? <></> : user ? <HomePage {...props}/> : <LoginPage {...props}/>}/>
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;