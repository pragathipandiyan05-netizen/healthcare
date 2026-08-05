import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Button, Tabs, Tab, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import { PictureAsPdf, Description, TableView, Print, Timeline } from '@mui/icons-material';

export default function Reports() {
  const [tabIndex, setTabIndex] = useState(0);

  const exportButtons = (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Button variant="outlined" color="error" startIcon={<PictureAsPdf />} size="small">PDF</Button>
      <Button variant="outlined" color="success" startIcon={<TableView />} size="small">Excel</Button>
      <Button variant="outlined" color="primary" startIcon={<Description />} size="small">CSV</Button>
      <Button variant="outlined" color="inherit" startIcon={<Print />} size="small">Print</Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h1" color="primary">Command Centre Reports</Typography>
          <Typography variant="body1" color="text.secondary">Generate official state health department documentation</Typography>
        </Box>
        {exportButtons}
      </Box>

      <Card sx={{ p: 0 }}>
        <Tabs 
          value={tabIndex} 
          onChange={(e, v) => setTabIndex(v)} 
          variant="scrollable" 
          scrollButtons="auto"
          sx={{ borderBottom: '1px solid #E5E7EB', px: 2 }}
        >
          <Tab label="Daily Summary" sx={{ fontWeight: 'bold' }} />
          <Tab label="Weekly Performance" sx={{ fontWeight: 'bold' }} />
          <Tab label="Monthly District Report" sx={{ fontWeight: 'bold' }} />
          <Tab label="Custom Range" sx={{ fontWeight: 'bold' }} />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" color="primary.main" sx={{ mb: 2 }}>Incident & Alert Summary</Typography>
              <Card sx={{ bgcolor: '#F8FAFC', border: 'none' }}>
                <List disablePadding>
                  <ListItem divider>
                    <ListItemText primary="Total SOS Alerts Responded" secondary="Auto-dispatched within 3 minutes" />
                    <Chip label="12 Incidents" color="error" size="small" />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary="Critical Equipment Failures" secondary="Biomedical tickets raised" />
                    <Chip label="4 Tickets" color="warning" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Inter-Hospital Transfers" secondary="Ambulance dispatch completed" />
                    <Chip label="84 Transfers" color="primary" size="small" />
                  </ListItem>
                </List>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h3" color="primary.main" sx={{ mb: 2 }}>Resource Consumption</Typography>
              <Card sx={{ bgcolor: '#F8FAFC', border: 'none' }}>
                <List disablePadding>
                  <ListItem divider>
                    <ListItemText primary="Total Hospital Admissions" secondary="State-wide OP/IP Load" />
                    <Typography variant="h4">12,450</Typography>
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary="Blood Units Dispatched" secondary="State Blood Bank Network" />
                    <Typography variant="h4">450 Units</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Critical Drug Consumption" secondary="Schedule H & X drugs" />
                    <Typography variant="h4">1.2 Tons</Typography>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, border: '2px dashed #E5E7EB', borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Timeline sx={{ fontSize: 60, color: 'text.secondary', mb: 1, opacity: 0.5 }} />
              <Typography variant="h3" color="text.secondary">Detailed Table Generation Complete</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Ready for PDF/Excel Export</Typography>
              <Button variant="contained" color="primary">Preview Full Report</Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
