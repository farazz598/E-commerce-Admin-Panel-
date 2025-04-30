

import React, { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image_url: ''
  });
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await api.post('/products', form);
      toast.success('Product added');
      setForm({ name: '', description: '', price: '', quantity: '', image_url: '' });
      fetchProducts();
    } catch (err) {
      toast.error('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleOpenEdit = (product) => {
    setForm(product);
    setEditId(product.id);
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/products/${editId}`, form);
      toast.success('Product updated');
      setOpen(false);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>Manage Products</Typography>

      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
        <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
        <TextField label="Image URL" name="image_url" value={form.image_url} onChange={handleChange} />
        <Button variant="contained" onClick={handleAdd}>Add Product</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell><img src={p.image_url} alt={p.name} width="40" /></TableCell>
                <TableCell align="right">
                  <Button color="primary" onClick={() => handleOpenEdit(p)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(p.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Image URL" name="image_url" value={form.image_url} onChange={handleChange} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Sidebar>
  );
};

export default Products;
