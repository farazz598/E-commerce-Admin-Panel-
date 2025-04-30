

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { api } from '../api/axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom sx={{ color: '#000' }}>
        Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#d32f2f' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Order ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Customer Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Total Price</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell sx={{ color: '#fff' }}>{order.id}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{order.customer_name}</TableCell>
                <TableCell sx={{ color: '#fff' }}>₹{order.total_price}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Sidebar>
  );
};

export default Orders;
