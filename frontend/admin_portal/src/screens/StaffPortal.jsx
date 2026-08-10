import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, CircularProgress, Alert } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export default function StaffPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sosLoading, setSosLoading] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerSos = async () => {
    setSosLoading(true);
    setSosSent(false);
    try {
      // In a real app we'd fetch the user's hospital/district from their profile
      // But we just need their ID to trigger the SOS
      const payload = {
        worker_id: user.id,
        hospital_id: 'cb6b73a6-b52b-42f5-b3e9-74d193d56f70', // Example placeholder
        district_id: 'a98a0d42-ef48-43d9-a7b3-2b28cf34c442'  // Example placeholder
      };
      
      const res = await fetch(`${API_URL}/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to send SOS');
      setSosSent(true);
      setTimeout(() => setSosSent(false), 5000);
    } catch (err) {
      alert('Error triggering SOS: ' + err.message);
    } finally {
      setSosLoading(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f4f6f8' }}>
        <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight="bold" align="center" mb={1} color="primary.main">
            Care Alert Staff Portal
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={3}>
            Log in to access your safety dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField 
              fullWidth label="Email Address" variant="outlined" margin="normal"
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
            <TextField 
              fullWidth label="Password" type="password" variant="outlined" margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
            <Button 
              fullWidth type="submit" variant="contained" size="large" 
              sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#121212', color: 'white', p: 3 }}>
      <Typography variant="h5" mb={1}>Welcome, <strong>{user.name}</strong></Typography>
      <Typography variant="body1" sx={{ opacity: 0.7 }} mb={6}>Your safety is our priority.</Typography>
      
      {sosSent && <Alert severity="success" sx={{ mb: 4, width: '100%', maxWidth: 350 }}>SOS Alert Sent Successfully! Help is on the way.</Alert>}

      <Button
        onClick={triggerSos}
        disabled={sosLoading}
        sx={{
          width: 250,
          height: 250,
          borderRadius: '50%',
          bgcolor: '#ff3333',
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 900,
          boxShadow: '0 0 30px rgba(255, 51, 51, 0.6), inset 0 0 20px rgba(0,0,0,0.2)',
          border: '10px solid #cc0000',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: '#ff1a1a',
            boxShadow: '0 0 50px rgba(255, 51, 51, 0.9)',
            transform: 'scale(1.05)'
          },
          '&:active': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 10px rgba(255, 51, 51, 0.9)',
          }
        }}
      >
        {sosLoading ? <CircularProgress color="inherit" size={60} /> : 'SOS'}
      </Button>

      <Typography variant="body2" sx={{ mt: 6, opacity: 0.5 }}>
        Pressing this button will instantly alert the State Command Centre.
      </Typography>
    </Box>
  );
}
