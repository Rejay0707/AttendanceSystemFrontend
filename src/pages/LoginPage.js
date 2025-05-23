// LoginPage.js
import React from 'react';
import { Paper } from '@mui/material';
import LoginContainer from '../container/LoginContainer';


const LoginPage = ({ setIsAuthenticated, setRole }) => {
  <Paper elevation={3} style={{ padding: '20px' }}></Paper>
  return <LoginContainer setIsAuthenticated={setIsAuthenticated} setRole={setRole} />;
};

export default LoginPage;
