import React from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Chip, Divider, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function DrugInventory() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="text.primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        Drug Inventory Dashboard
      </Typography>

      <TextField
        fullWidth
        placeholder="Search Medicine..."
        variant="outlined"
        sx={{ mb: 4, bgcolor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {/* Available Medicine */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Paracetamol 650mg</Typography>
                <Chip label="🟢 Available" color="success" variant="outlined" />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary" variant="body2">Available Stock</Typography>
                  <Typography variant="h5">1280 Tablets</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary" variant="body2">Remaining Days</Typography>
                  <Typography variant="h5">21 Days</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Critical Stock */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid #d32f2f' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="error">Noradrenaline</Typography>
                <Chip label="🔴 Auto Escalation" color="error" />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary" variant="body2">Available Stock</Typography>
                  <Typography variant="h5" color="error">2 Vials (Critical)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary" variant="body2">Remaining Days</Typography>
                  <Typography variant="h5" color="error">{"< 1 Day"}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
