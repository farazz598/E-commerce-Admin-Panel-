

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { api } from '../api/axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [stats, setStats] = useState({ total_products: 0, total_orders: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (err) {
        toast.error('Failed to fetch dashboard stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#2c2c2c', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Products</Typography>
              <Typography variant="h3">{stats.total_products}</Typography>
              <Button onClick={() => navigate('/products')} sx={{ mt: 2 }} variant="contained" color="error">Go to Products</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card sx={{ backgroundColor: '#2c2c2c', color: '#fff' }}>

            <CardContent>
              <Typography variant="h6" gutterBottom>Total Orders</Typography>
              <Typography variant="h3">{stats.total_orders}</Typography>
              <Button onClick={() => navigate('/orders')} sx={{ mt: 2 }} variant="contained" color="error">View Orders</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

export default Dashboard;
