import React, { useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Admin Login</Typography>
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} /><br /><br />
      <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} /><br /><br />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
