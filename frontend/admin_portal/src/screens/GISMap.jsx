import React, { useState } from 'react';
import { 
  Box, Typography, Paper, IconButton, Chip, Drawer, Button, Divider, 
  Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import { 
  Map as MapIcon, LocalHospital, DirectionsCar, NotificationsActive, 
  MedicalServices, Bloodtype, Build, Close, KeyboardArrowRight
} from '@mui/icons-material';

const mockMarkers = [
  { id: 1, type: 'hospital', top: '35%', left: '45%', lat: 13.0827, lng: 80.2707, name: 'Government General Hospital', district: 'Chennai', status: 'Online', beds: '384 / 400', icon: <LocalHospital />, color: '#10B981' },
  { id: 2, type: 'sos', top: '55%', left: '65%', lat: 13.0450, lng: 80.2200, name: 'Critical Road Accident', district: 'Chennai', status: 'Active', time: '5 mins ago', icon: <NotificationsActive />, color: '#EF4444' },
  { id: 3, type: 'ambulance', top: '45%', left: '75%', lat: 13.0550, lng: 80.2400, name: 'TN-01-AB-1234', district: 'Chennai', status: 'On Trip', dest: 'Government General Hospital', icon: <DirectionsCar />, color: '#3B82F6' },
  { id: 4, type: 'inventory', top: '70%', left: '40%', lat: 9.9252, lng: 78.1198, name: 'Oxygen Shortage (O2)', district: 'Madurai', status: 'Warning', hospital: 'Madurai Medical College', icon: <MedicalServices />, color: '#F59E0B' },
  { id: 5, type: 'blood', top: '25%', left: '60%', lat: 11.0168, lng: 76.9558, name: 'O-Negative Urgent', district: 'Coimbatore', status: 'Critical', hospital: 'Coimbatore GH', icon: <Bloodtype />, color: '#EF4444' },
];

export default function GISMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filters, setFilters] = useState({
    hospitals: true, ambul: true, sos: true, inv: true, blood: true, equip: true
  });

  const handleFilterChange = (name) => (event) => {
    setFilters({ ...filters, [name]: event.target.checked });
  };

  const getFilteredMarkers = () => {
    return mockMarkers.filter(m => {
      if (m.type === 'hospital' && !filters.hospitals) return false;
      if (m.type === 'sos' && !filters.sos) return false;
      if (m.type === 'ambulance' && !filters.ambul) return false;
      if (m.type === 'inventory' && !filters.inv) return false;
      if (m.type === 'blood' && !filters.blood) return false;
      return true;
    });
  };

  return (
    <Box sx={{ height: { xs: 'auto', md: 'calc(100vh - 140px)' }, minHeight: 'calc(100vh - 140px)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
      {/* FILTER PANEL */}
      <Paper elevation={0} sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0, p: 3, borderRadius: 3, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" mb={0.5}>Map Layers</Typography>
        <Typography variant="caption" color="text.secondary" mb={3} display="block">Toggle operational data points</Typography>
        
        <FormGroup sx={{ gap: 2 }}>
          <FormControlLabel control={<Checkbox checked={filters.hospitals} onChange={handleFilterChange('hospitals')} sx={{ color: '#10B981', '&.Mui-checked': { color: '#10B981' } }} />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocalHospital fontSize="small" sx={{ color: '#10B981' }}/> Hospitals</Box>} />
          <FormControlLabel control={<Checkbox checked={filters.ambul} onChange={handleFilterChange('ambul')} sx={{ color: '#3B82F6', '&.Mui-checked': { color: '#3B82F6' } }} />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><DirectionsCar fontSize="small" sx={{ color: '#3B82F6' }}/> Ambulances</Box>} />
          <FormControlLabel control={<Checkbox checked={filters.sos} onChange={handleFilterChange('sos')} sx={{ color: '#EF4444', '&.Mui-checked': { color: '#EF4444' } }} />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><NotificationsActive fontSize="small" sx={{ color: '#EF4444' }}/> Active SOS Alerts</Box>} />
          <FormControlLabel control={<Checkbox checked={filters.inv} onChange={handleFilterChange('inv')} sx={{ color: '#F59E0B', '&.Mui-checked': { color: '#F59E0B' } }} />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><MedicalServices fontSize="small" sx={{ color: '#F59E0B' }}/> Inventory Alerts</Box>} />
          <FormControlLabel control={<Checkbox checked={filters.blood} onChange={handleFilterChange('blood')} sx={{ color: '#EF4444', '&.Mui-checked': { color: '#EF4444' } }} />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Bloodtype fontSize="small" sx={{ color: '#EF4444' }}/> Blood Requests</Box>} />
          <FormControlLabel control={<Checkbox checked={filters.equip} onChange={handleFilterChange('equip')} sx={{ color: '#6366F1', '&.Mui-checked': { color: '#6366F1' } }} />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Build fontSize="small" sx={{ color: '#6366F1' }}/> Equipment Faults</Box>} />
        </FormGroup>

        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" fullWidth sx={{ borderRadius: 2 }}>Reset View</Button>
      </Paper>

      {/* MAP AREA */}
      <Paper elevation={0} sx={{ flexGrow: 1, minHeight: { xs: 400, md: 'auto' }, borderRadius: 3, border: '1px solid #E2E8F0', position: 'relative', bgcolor: '#E2E8F0', overflow: 'hidden' }}>
        {/* Mock Map Background Grid */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4, backgroundImage: 'radial-gradient(#94A3B8 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        
        {/* Mock Markers */}
        {getFilteredMarkers().map((marker, i) => (
          <Box 
            key={marker.id}
            onClick={() => setSelectedMarker(marker)}
            sx={{ 
              position: 'absolute', top: marker.top, left: marker.left, 
              width: 48, height: 48, borderRadius: '50%', bgcolor: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
              border: `3px solid ${marker.color}`, zIndex: 10,
              transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' }
            }}
          >
            {React.cloneElement(marker.icon, { sx: { color: marker.color } })}
          </Box>
        ))}

        {/* Map Center Label */}
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', p: 4, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 4, backdropFilter: 'blur(4px)', pointerEvents: 'none' }}>
          <MapIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.8 }} />
          <Typography variant="h2" mb={1}>Statewide GIS Map</Typography>
          <Typography variant="body1" color="text.secondary">Interactive mapping interface will render here.<br/>(Mapbox / Google Maps Integration)</Typography>
        </Box>
      </Paper>

      {/* MARKER DETAILS DRAWER */}
      <Drawer
        anchor="right"
        open={Boolean(selectedMarker)}
        onClose={() => setSelectedMarker(null)}
        PaperProps={{ sx: { width: 350, borderLeft: '1px solid #E2E8F0', elevation: 0 } }}
      >
        {selectedMarker && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: `${selectedMarker.color}15`, color: selectedMarker.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.cloneElement(selectedMarker.icon, { sx: { fontSize: 32 } })}
              </Box>
              <IconButton onClick={() => setSelectedMarker(null)}><Close /></IconButton>
            </Box>

            <Typography variant="h3" mb={1}>{selectedMarker.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Chip size="small" label={selectedMarker.district} sx={{ bgcolor: '#F1F5F9', fontWeight: 600 }} />
              <Chip size="small" label={selectedMarker.status} sx={{ bgcolor: `${selectedMarker.color}15`, color: selectedMarker.color, fontWeight: 700 }} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={2}>DETAILS</Typography>
            
            {selectedMarker.type === 'hospital' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Available Beds</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMarker.beds}</Typography>
              </Box>
            )}
            
            {(selectedMarker.type === 'inventory' || selectedMarker.type === 'blood') && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Hospital</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMarker.hospital}</Typography>
              </Box>
            )}

            {selectedMarker.type === 'ambulance' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Destination</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMarker.dest}</Typography>
              </Box>
            )}

            {selectedMarker.type === 'sos' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Reported Time</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMarker.time}</Typography>
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <Button variant="contained" fullWidth endIcon={<KeyboardArrowRight />} sx={{ borderRadius: 2, py: 1.5 }}>
                View Full Details
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
