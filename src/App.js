import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/"  element={<Signup/>} />
          <Route exact path="/login"  element={<Login/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
