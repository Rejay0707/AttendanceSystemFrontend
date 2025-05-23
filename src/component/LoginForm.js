import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
  Don't have an account? <Link to="/register">Register here</Link>
</Typography>
    </form>
  );
};

export default LoginForm;
