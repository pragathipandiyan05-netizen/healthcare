import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function KPIRow() {
  const kpiData = [
    { title: 'Hospitals Online', value: '384', color: '#0057B8' },
    { title: 'Active Alerts', value: '45', color: '#F59E0B' },
    { title: 'Critical Alerts', value: '12', color: '#DC2626' },
    { title: 'Emergency SOS', value: '3', color: '#DC2626' },
    { title: 'Drug Shortages', value: '31', color: '#F59E0B' },
    { title: 'Blood Requests', value: '18', color: '#DC2626' },
    { title: 'Available Beds', value: '4,120', color: '#16A34A' },
    { title: 'ICU Occupancy', value: '92%', color: '#DC2626' },
    { title: 'Ambulances Ready', value: '120', color: '#16A34A' },
    { title: 'Doctors on Duty', value: '840', color: '#0057B8' },
    { title: 'Nurses on Duty', value: '2,100', color: '#0057B8' },
    { title: 'Equipment Faults', value: '24', color: '#F59E0B' },
    { title: 'Avg Response', value: '3m 42s', color: '#16A34A' },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {kpiData.map((kpi, index) => (
        <Grid item xs={6} sm={4} md={2} xl={1.5} key={index}>
          <Card sx={{ borderLeft: `4px solid ${kpi.color}`, height: '100%' }}>
            <CardContent sx={{ p: '12px !important' }}>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                {kpi.title}
              </Typography>
              <Typography variant="h2" sx={{ color: 'text.primary' }}>
                {kpi.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
