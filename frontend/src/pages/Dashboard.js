import React, { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  const [stats, setStats] = useState({ total_products: 0, total_orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">Total Products</Typography>
            <Typography variant="h4">{stats.total_products}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">Total Orders</Typography>
            <Typography variant="h4">{stats.total_orders}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
