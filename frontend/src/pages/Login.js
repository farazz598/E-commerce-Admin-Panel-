

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Tabs, Tab, Box } from '@mui/material';
import { api } from '../api/axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const route = isRegister ? '/auth/register' : '/auth/login';
      const res = await api.post(route, form);
      if (!isRegister) {
        localStorage.setItem('token', res.data.token);
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.success('Registration successful. You can now login.');
        setIsRegister(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Tabs value={isRegister ? 1 : 0} onChange={(e, val) => setIsRegister(val === 1)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box mt={2}>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
