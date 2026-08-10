import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Paper, Chip, IconButton, Button,
  TextField, InputAdornment, List, ListItem, Divider
} from '@mui/material';
import { 
  Search, FilterList, Add, DirectionsCar, 
  Map as MapIcon, LocalHospital, Person, LocationOn, AccessTime
} from '@mui/icons-material';

const mockAmbulances = [
  { id: 'TN-01-AB-1234', hospital: 'Government General Hospital', driver: 'K. Rajan', crew: '2 Paramedics', location: 'Mount Road, Chennai', status: 'Available', dest: '-', eta: '-' },
  { id: 'TN-09-CD-5678', hospital: 'Government General Hospital', driver: 'S. Velu', crew: '1 Paramedic', location: 'Guindy', status: 'On Trip', dest: 'Apollo Greams Rd', eta: '12 mins' },
  { id: 'TN-22-EF-9012', hospital: 'Madurai Medical College', driver: 'M. Kannan', crew: '2 Paramedics', location: 'Anna Nagar', status: 'Available', dest: '-', eta: '-' },
  { id: 'TN-55-GH-3456', hospital: 'Trichy GH', driver: 'R. Babu', crew: '1 Paramedic', location: 'Cantonment', status: 'Maintenance', dest: 'Workshop', eta: '-' },
  { id: 'TN-38-IJ-7890', hospital: 'Coimbatore GH', driver: 'T. Murugan', crew: '2 Paramedics', location: 'Peelamedu', status: 'On Trip', dest: 'Coimbatore GH', eta: '5 mins' },
];

const KPICard = ({ title, value, color }) => (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', borderTop: `4px solid ${color}`, textAlign: 'center' }}>
    <Typography variant="h3" sx={{ mb: 0.5 }}>{value}</Typography>
    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase' }}>{title}</Typography>
  </Paper>
);

export default function Ambulances() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusChip = (status) => {
    switch(status) {
      case 'Available': return <Chip size="small" label={status} sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 600 }} />;
      case 'On Trip': return <Chip size="small" label={status} sx={{ bgcolor: '#DBEAFE', color: '#1D4ED8', fontWeight: 600 }} />;
      case 'Maintenance': return <Chip size="small" label={status} sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 600 }} />;
      case 'Offline': return <Chip size="small" label={status} sx={{ bgcolor: '#FEE2E2', color: '#DC2626', fontWeight: 600 }} />;
      default: return <Chip size="small" label={status} />;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>Ambulance Fleet Operations</Typography>
          <Typography variant="body2" color="text.secondary">Real-time tracking and dispatch management</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<MapIcon />} sx={{ borderRadius: 2 }}>Full Map</Button>
          <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2 }}>Dispatch Unit</Button>
        </Box>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={2.4}><KPICard title="Total Fleet" value="450" color="#64748B" /></Grid>
        <Grid item xs={6} md={2.4}><KPICard title="Available" value="284" color="#10B981" /></Grid>
        <Grid item xs={6} md={2.4}><KPICard title="On Trip" value="132" color="#3B82F6" /></Grid>
        <Grid item xs={6} md={2.4}><KPICard title="Maintenance" value="24" color="#F59E0B" /></Grid>
        <Grid item xs={6} md={2.4}><KPICard title="Offline" value="10" color="#EF4444" /></Grid>
      </Grid>

      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Left Side: List */}
        <Grid item xs={12} lg={5} sx={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 1 }}>
              <TextField 
                placeholder="Search vehicles..." size="small" fullWidth
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#F8FAFC' } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              />
              <IconButton sx={{ border: '1px solid #E2E8F0', borderRadius: 2 }}><FilterList /></IconButton>
            </Box>
            
            <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
              {mockAmbulances.filter(a => a.id.toLowerCase().includes(searchTerm.toLowerCase()) || a.location.toLowerCase().includes(searchTerm.toLowerCase())).map((amb, i) => (
                <React.Fragment key={amb.id}>
                  <ListItem sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ p: 0.5, bgcolor: '#F1F5F9', borderRadius: 1 }}><DirectionsCar sx={{ color: '#64748B' }} /></Box>
                        <Typography variant="body1" fontWeight={700}>{amb.id}</Typography>
                      </Box>
                      {getStatusChip(amb.status)}
                    </Box>
                    
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mb: 0.5 }}>
                          <LocalHospital sx={{ fontSize: 14 }} /> <Typography variant="caption" noWrap>{amb.hospital}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <Person sx={{ fontSize: 14 }} /> <Typography variant="caption" noWrap>{amb.driver} ({amb.crew})</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mb: 0.5 }}>
                          <LocationOn sx={{ fontSize: 14 }} /> <Typography variant="caption" noWrap>{amb.location}</Typography>
                        </Box>
                        {amb.status === 'On Trip' && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                            <AccessTime sx={{ fontSize: 14, color: 'primary.main' }} /> 
                            <Typography variant="caption" color="primary.main" fontWeight={600}>ETA: {amb.eta}</Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" sx={{ flex: 1, borderRadius: 2 }}>Details</Button>
                      <Button variant="contained" size="small" sx={{ flex: 1, borderRadius: 2 }} disabled={amb.status !== 'Available'}>Dispatch</Button>
                    </Box>
                  </ListItem>
                  {i < mockAmbulances.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Side: Map */}
        <Grid item xs={12} lg={7} sx={{ height: { xs: '400px', lg: '600px' } }}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', height: '100%', overflow: 'hidden', position: 'relative', bgcolor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Mock Map Background */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5, backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <Box sx={{ textAlign: 'center', zIndex: 1, p: 4, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 4, backdropFilter: 'blur(4px)' }}>
              <MapIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2, opacity: 0.8 }} />
              <Typography variant="h3" mb={1}>Live Map Interface</Typography>
              <Typography variant="body2" color="text.secondary">
                This section will render the interactive Mapbox/Google Maps <br/> component with live GPS tracking for all 450 vehicles.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
