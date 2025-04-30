import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Typography, Paper, Tabs, Tab, Box
} from '@mui/material';
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp8762647.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 400,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#fff' }}>
          {isRegister ? 'Register' : 'Login'}
        </Typography>

        <Tabs
          value={isRegister ? 1 : 0}
          onChange={(e, val) => setIsRegister(val === 1)}
          centered
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box mt={3}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
