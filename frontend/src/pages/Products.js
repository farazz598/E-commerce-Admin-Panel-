

import React, { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';

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
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Product Management</Typography>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
        <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} fullWidth />
        <TextField label="Image URL" name="image_url" value={form.image_url} onChange={handleChange} fullWidth />
        <Button variant="contained" onClick={handleAdd}>Add Product</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell><img src={p.image_url} alt={p.name} width="50" /></TableCell>
                <TableCell>
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
    </div>
  );
};

export default Products;
