import React, { useState } from 'react';
import { 
  Box, Typography, Chip, Button, IconButton, Card, 
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Divider
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Visibility, AddBusiness, Map as MapIcon } from '@mui/icons-material';

// Realistic sample data for Hospitals
const hospitalData = [
  { id: 1, name: 'Govt General Hospital', code: 'TN-GH-001', district: 'Chennai', type: 'Tertiary', status: 'Online', beds: 1200, icu: 150, doctors: 450, nurses: 1200, ambulances: 12, alerts: 3 },
  { id: 2, name: 'District Hospital Madurai', code: 'TN-DH-042', district: 'Madurai', type: 'Secondary', status: 'Online', beds: 500, icu: 50, doctors: 120, nurses: 300, ambulances: 4, alerts: 0 },
  { id: 3, name: 'Coimbatore Medical College', code: 'TN-MC-012', district: 'Coimbatore', type: 'Tertiary', status: 'Offline', beds: 800, icu: 100, doctors: 250, nurses: 600, ambulances: 8, alerts: 1 },
  { id: 4, name: 'Taluk Hospital Salem', code: 'TN-TH-115', district: 'Salem', type: 'Primary', status: 'Online', beds: 100, icu: 10, doctors: 25, nurses: 60, ambulances: 2, alerts: 0 },
];

export default function Hospitals() {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const columns = [
    { field: 'code', headerName: 'Code', width: 120 },
    { field: 'name', headerName: 'Hospital Name', width: 250, renderCell: (p) => <Typography fontWeight="bold" variant="body2">{p.value}</Typography> },
    { field: 'district', headerName: 'District', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { 
      field: 'status', 
      headerName: 'Live Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          color={params.value === 'Online' ? 'success' : 'error'} 
          variant={params.value === 'Online' ? 'filled' : 'outlined'}
        />
      )
    },
    { field: 'beds', headerName: 'Total Beds', type: 'number', width: 110 },
    { field: 'icu', headerName: 'ICU Beds', type: 'number', width: 100 },
    { field: 'doctors', headerName: 'Doctors', type: 'number', width: 100 },
    { 
      field: 'alerts', 
      headerName: 'Active Alerts', 
      width: 130,
      renderCell: (params) => (
        params.value > 0 ? <Chip label={`${params.value} Active`} size="small" color="error" /> : <Typography variant="body2" color="text.secondary">None</Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button 
          size="small" 
          variant="outlined" 
          startIcon={<Visibility />}
          onClick={() => setSelectedHospital(params.row)}
        >
          Profile
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ minHeight: 600, height: { xs: '75vh', md: 'calc(100vh - 160px)' }, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        gap: { xs: 2, md: 0 }
      }}>
        <Box>
          <Typography variant="h1" color="primary" sx={{ mb: 1 }}>Hospital Directory</Typography>
          <Typography variant="body1" color="text.secondary">Master registry of all healthcare facilities in the state</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<MapIcon />}>View on Map</Button>
          <Button variant="contained" color="primary" startIcon={<AddBusiness />}>Register Hospital</Button>
        </Box>
      </Box>

      <Card sx={{ flexGrow: 1, p: 0 }}>
        <DataGrid
          rows={hospitalData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          pageSizeOptions={[15, 25, 50]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: { showQuickFilter: true },
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': { fontSize: '14px' },
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#F5F7FB', fontWeight: 'bold' }
          }}
        />
      </Card>

      {/* Hospital Detailed Profile Dialog */}
      <Dialog open={!!selectedHospital} onClose={() => setSelectedHospital(null)} maxWidth="md" fullWidth>
        {selectedHospital && (
          <>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h3">{selectedHospital.name}</Typography>
              <Typography variant="caption">{selectedHospital.code} | {selectedHospital.district} District</Typography>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" color="primary" sx={{ mb: 2 }}>Infrastructure</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Total Beds:</Typography><Typography fontWeight="bold">{selectedHospital.beds}</Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }}/>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>ICU Beds:</Typography><Typography fontWeight="bold">{selectedHospital.icu}</Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }}/>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Ambulances:</Typography><Typography fontWeight="bold">{selectedHospital.ambulances}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" color="primary" sx={{ mb: 2 }}>Staffing</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Doctors on Duty:</Typography><Typography fontWeight="bold">{selectedHospital.doctors}</Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }}/>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Nurses on Duty:</Typography><Typography fontWeight="bold">{selectedHospital.nurses}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedHospital(null)} color="inherit">Close</Button>
              <Button variant="contained" color="primary">Full Dashboard</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
