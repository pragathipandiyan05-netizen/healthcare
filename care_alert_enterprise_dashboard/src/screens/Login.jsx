import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Card, CardContent, Typography, TextField, 
  Button, Checkbox, FormControlLabel, Link, Divider, Alert
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function Login() {
  const navigate = useNavigate();
  const [hospitalId, setHospitalId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (hospitalId === 'hospital123' && employeeId === 'emp_1' && password === 'password') {
      navigate('/dashboard');
    } else {
      setError('Invalid Hospital ID, Employee ID, or Password.');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Card sx={{ maxWidth: 450, width: '100%', p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <LocalHospitalIcon color="primary" sx={{ fontSize: 64, mb: 1 }} />
            <Typography variant="h4" color="primary" gutterBottom>
              CARE ALERT
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              State Health Command Centre
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Hospital ID"
              variant="outlined"
              margin="normal"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Employee ID"
              variant="outlined"
              margin="normal"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Remember Me"
              sx={{ mt: 1, mb: 3 }}
            />

            <Button 
              fullWidth 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ py: 1.5, mb: 3 }}
            >
              Secure Login
            </Button>
            
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="#" variant="body2" underline="hover">
                Emergency Support
              </Link>
              <Link href="#" variant="body2" underline="hover">
                Forgot Password
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
