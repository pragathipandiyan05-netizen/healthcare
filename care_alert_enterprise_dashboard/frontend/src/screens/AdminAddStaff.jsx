import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem, Alert, CircularProgress } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export default function AdminAddStaff() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Hardcoded for the hackathon demo, typically fetched from API
    hospital_id: 'cb6b73a6-b52b-42f5-b3e9-74d193d56f70',
    district_id: 'a98a0d42-ef48-43d9-a7b3-2b28cf34c442',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/users/worker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to create staff');
      
      setSuccess(true);
      setFormData({ ...formData, name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} color="primary.main" mb={1}>
        Add New Staff
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Register a new healthcare worker in the system. They will use these credentials to log in to the Staff Portal.
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 800 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>Staff member registered successfully!</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Full Name" name="name" required
                value={formData.name} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Email Address" name="email" type="email" required
                value={formData.email} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Password" name="password" type="password" required
                value={formData.password} onChange={handleChange}
              />
            </Grid>
            
            {/* These would normally be dynamically populated from the /hospitals endpoint */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth select label="Assign Hospital" name="hospital_id"
                value={formData.hospital_id} onChange={handleChange}
              >
                <MenuItem value="cb6b73a6-b52b-42f5-b3e9-74d193d56f70">Government General Hospital</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                type="submit" variant="contained" size="large" 
                sx={{ px: 5, py: 1.5, fontWeight: 'bold' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register Staff Member'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
