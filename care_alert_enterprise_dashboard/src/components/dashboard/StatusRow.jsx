import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';

const SimpleCard = ({ title, content }) => (
  <Card sx={{ height: '100%' }}>
    <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <Typography variant="h4">{title}</Typography>
    </Box>
    <CardContent>
      {content.map((item, idx) => (
        <Box key={idx} sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2">{item.label}</Typography>
            <Typography variant="body2" fontWeight="bold">{item.val}</Typography>
          </Box>
          {idx !== content.length - 1 && <Divider />}
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default function StatusRow() {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <SimpleCard 
          title="Hospital Status" 
          content={[{label: 'Optimal', val: '280'}, {label: 'Warning', val: '65'}, {label: 'Critical', val: '12'}]} 
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SimpleCard 
          title="Drug Inventory (Critical)" 
          content={[{label: 'Paracetamol', val: 'Low'}, {label: 'Adrenaline', val: 'Stock Out'}, {label: 'Insulin', val: 'Low'}]} 
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SimpleCard 
          title="Blood Availability" 
          content={[{label: 'O-ve (Universal)', val: '14 Units'}, {label: 'A+ve', val: '120 Units'}, {label: 'B-ve', val: '8 Units'}]} 
        />
      </Grid>
    </Grid>
  );
}
