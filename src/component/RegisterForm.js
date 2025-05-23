import React from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const roles = ['student', 'admin', 'teacher'];

const RegisterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        type="email"
      />
      <TextField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        type="password"
      />
      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#4d1a00' }}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
