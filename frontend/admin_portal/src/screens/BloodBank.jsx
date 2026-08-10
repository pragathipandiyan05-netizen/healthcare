import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const bloodData = [
  { group: 'A+', units: 120 },
  { group: 'A-', units: 15 },
  { group: 'B+', units: 80 },
  { group: 'B-', units: 10 },
  { group: 'AB+', units: 12 },
  { group: 'AB-', units: 2 },
  { group: 'O+', units: 180 },
  { group: 'O-', units: 5 },
];

export default function BloodBank() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="text.primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        Blood Bank Network
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>Blood Availability</Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {bloodData.map((blood) => (
          <Card 
            key={blood.group}
            sx={{ 
              width: '140px',
              borderTop: `4px solid ${blood.units < 15 ? '#DC2626' : '#16A34A'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BloodtypeIcon 
                sx={{ 
                  fontSize: 28, 
                  color: blood.units < 15 ? '#DC2626' : '#DC2626', 
                  opacity: blood.units < 15 ? 1 : 0.5,
                  mr: 1
                }} 
              />
              <Typography variant="h2" fontWeight="bold">{blood.group}</Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" color={blood.units < 15 ? 'error' : 'text.secondary'}>
              {blood.units} Units {blood.units < 15 && '(Low)'}
            </Typography>
          </Card>
        ))}
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h6" sx={{ mb: 2 }}>Emergency Requests (Live)</Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">Listening for incoming blood requests from State Hospitals...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
