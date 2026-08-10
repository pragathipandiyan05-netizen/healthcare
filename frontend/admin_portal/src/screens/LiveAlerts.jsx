import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Chip, Button, IconButton, Card, Drawer, Divider,
  Avatar, Grid, Stepper, Step, StepLabel, StepContent, Paper
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { 
  Visibility, AssignmentInd, DoneAll, Warning, IosShare,
  Close, Person, LocationOn, AccessTime, LocalHospital, Work,
  CheckCircle, DirectionsRun, EscalatorWarning, NotificationsActive
} from '@mui/icons-material';
import { useSosWebSocket } from '../hooks/useSosWebSocket';

export default function LiveAlerts() {
  const { liveSosAlerts } = useSosWebSocket();
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Add mock alerts if none exist for UI testing purposes
    const displayAlerts = liveSosAlerts.length > 0 ? liveSosAlerts : [
      { 
        id: 'SOS-20260807-01', 
        priority: 'CRITICAL',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 5 * 60000).toISOString(),
        worker: { 
          name: 'Priya Kumar', 
          email: 'priya.kumar@hospital.org',
          id: 'HWC-00124',
          role: { name: 'Emergency Nurse' }
        },
        hospital: { name: 'Government General Hospital' },
        district: { name: 'Chennai' },
        department: { name: 'Emergency Ward' }
      },
      { 
        id: 'SOS-20260807-02', 
        priority: 'CRITICAL',
        status: 'ACKNOWLEDGED',
        created_at: new Date(Date.now() - 15 * 60000).toISOString(),
        worker: { 
          name: 'Arun Raj', 
          email: 'arun.raj@hospital.org',
          id: 'HWC-00188',
          role: { name: 'Doctor' }
        },
        hospital: { name: 'Salem Government Hospital' },
        district: { name: 'Salem' },
        department: { name: 'ICU' }
      }
    ];

    const newAlerts = displayAlerts.map(alert => ({
      id: alert.id,
      ...alert,
      timeFormatted: alert.created_at ? new Date(alert.created_at).toLocaleTimeString() : 'N/A',
      dateFormatted: alert.created_at ? new Date(alert.created_at).toLocaleDateString() : 'N/A',
      priority: alert.priority || 'CRITICAL',
      hospital: alert.hospital?.name || 'N/A',
      district: alert.district?.name || 'N/A',
      department: alert.department?.name || 'N/A',
      staff_name: alert.worker?.name || 'N/A'
    }));
    setAlerts(newAlerts);
  }, [liveSosAlerts]);

  const handleOpenDetails = (alert) => {
    setSelectedAlert(alert);
    setDrawerOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'SOS ID', width: 180, renderCell: (params) => <Typography variant="body2" fontWeight={700} color="primary.main">{params.value}</Typography> },
    { field: 'staff_name', headerName: 'Staff Name', width: 180, renderCell: (params) => <Typography variant="body2" fontWeight={600}>{params.value}</Typography> },
    { field: 'hospital', headerName: 'Hospital', width: 250 },
    { field: 'department', headerName: 'Department', width: 160 },
    { field: 'timeFormatted', headerName: 'Time', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => {
        let color = 'default';
        let bg = 'transparent';
        if (params.value === 'ACTIVE') { color = '#EF4444'; bg = '#FEE2E2'; }
        if (params.value === 'ACKNOWLEDGED') { color = '#F59E0B'; bg = '#FEF3C7'; }
        if (params.value === 'ASSIGNED') { color = '#3B82F6'; bg = '#DBEAFE'; }
        if (params.value === 'RESPONDING') { color = '#8B5CF6'; bg = '#EDE9FE'; }
        if (params.value === 'RESOLVED') { color = '#10B981'; bg = '#D1FAE5'; }
        return <Chip label={params.value || 'ACTIVE'} size="small" sx={{ bgcolor: bg, color: color, fontWeight: 700, borderRadius: 1 }} />
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button size="small" variant="contained" color="primary" onClick={() => handleOpenDetails(params.row)} sx={{ borderRadius: 2, fontWeight: 600 }}>
          View SOS
        </Button>
      )
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return '#EF4444';
      case 'ACKNOWLEDGED': return '#F59E0B';
      case 'ASSIGNED': return '#3B82F6';
      case 'RESPONDING': return '#8B5CF6';
      case 'RESOLVED': return '#10B981';
      default: return '#EF4444';
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h1" sx={{ mb: 1 }}>Live SOS Alerts</Typography>
          <Typography variant="body1" color="text.secondary">Statewide emergency operational center</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<IosShare />} sx={{ borderRadius: 2, fontWeight: 600 }}>Export</Button>
        </Box>
      </Box>

      <Card sx={{ flexGrow: 1, p: 0, borderRadius: 3, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <DataGrid
          rows={alerts}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
          pageSizeOptions={[15, 25, 50]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': { fontSize: '14px', borderBottom: '1px solid #F1F5F9' },
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#F8FAFC', fontWeight: 'bold', borderBottom: '1px solid #E2E8F0' },
            '& .MuiDataGrid-row:hover': { bgcolor: '#F8FAFC' }
          }}
        />
      </Card>

      {/* SOS DETAILS DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 500 }, bgcolor: '#F8FAFC' } }}
      >
        {selectedAlert && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* Drawer Header */}
            <Box sx={{ p: 3, bgcolor: 'white', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getStatusColor(selectedAlert.status), boxShadow: `0 0 10px ${getStatusColor(selectedAlert.status)}` }} />
                <Typography variant="h3">SOS Alert Details</Typography>
              </Box>
              <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
              
              {/* STATUS BANNER */}
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" fontWeight={700} color="#B91C1C" display="block">CURRENT STATUS</Typography>
                  <Typography variant="h3" color="#991B1B">{selectedAlert.status || 'ACTIVE'}</Typography>
                </Box>
                <Typography variant="h3" color="#991B1B">{selectedAlert.id}</Typography>
              </Paper>

              {/* STAFF INFORMATION */}
              <Typography variant="h4" mb={2}>Staff Information</Typography>
              <Paper sx={{ p: 2.5, borderRadius: 3, mb: 4, boxShadow: 'none', border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '24px', fontWeight: 700 }}>
                    {selectedAlert.worker?.name?.charAt(0) || 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="h2">{selectedAlert.worker?.name || 'Unknown'}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedAlert.worker?.email || 'N/A'}</Typography>
                    <Chip label={`ID: ${selectedAlert.worker?.id || 'N/A'}`} size="small" sx={{ mt: 1, fontWeight: 700, bgcolor: '#E2E8F0' }} />
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Hospital</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedAlert.hospital || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Department</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedAlert.department || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Role</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedAlert.worker?.role?.name || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">District</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedAlert.district || 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* INCIDENT DETAILS */}
              <Typography variant="h4" mb={2}>Incident Details</Typography>
              <Paper sx={{ p: 2.5, borderRadius: 3, mb: 4, boxShadow: 'none', border: '1px solid #E2E8F0' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Triggered Date</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedAlert.dateFormatted}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Triggered Time</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedAlert.timeFormatted}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined" fullWidth startIcon={<LocationOn />} sx={{ borderRadius: 2, fontWeight: 700 }}>
                    View Live Location on Map
                  </Button>
                </Box>
              </Paper>

              {/* TIMELINE */}
              <Typography variant="h4" mb={2}>Response Timeline</Typography>
              <Paper sx={{ p: 2.5, borderRadius: 3, mb: 2, boxShadow: 'none', border: '1px solid #E2E8F0' }}>
                <Stepper orientation="vertical" activeStep={selectedAlert.status === 'ACTIVE' ? 1 : 2}>
                  <Step active={true} completed={true}>
                    <StepLabel StepIconComponent={() => <Box sx={{width:24, height:24, borderRadius:'50%', bgcolor:'#EF4444', display:'flex', alignItems:'center', justifyContent:'center'}}><Warning sx={{color:'white', fontSize:14}}/></Box>}>
                      <Typography fontWeight={700}>SOS Triggered</Typography>
                      <Typography variant="caption" color="text.secondary">{selectedAlert.timeFormatted}</Typography>
                    </StepLabel>
                  </Step>
                  <Step active={true} completed={true}>
                    <StepLabel StepIconComponent={() => <Box sx={{width:24, height:24, borderRadius:'50%', bgcolor:'#3B82F6', display:'flex', alignItems:'center', justifyContent:'center'}}><NotificationsActive sx={{color:'white', fontSize:14}}/></Box>}>
                      <Typography fontWeight={700}>Admin Notified</Typography>
                      <Typography variant="caption" color="text.secondary">Instant via WebSockets</Typography>
                    </StepLabel>
                  </Step>
                  <Step active={selectedAlert.status !== 'ACTIVE'} completed={selectedAlert.status !== 'ACTIVE'}>
                    <StepLabel>
                      <Typography fontWeight={selectedAlert.status !== 'ACTIVE' ? 700 : 400} color={selectedAlert.status !== 'ACTIVE' ? 'text.primary' : 'text.disabled'}>Acknowledged</Typography>
                    </StepLabel>
                  </Step>
                  <Step active={selectedAlert.status === 'RESOLVED'} completed={selectedAlert.status === 'RESOLVED'}>
                    <StepLabel>
                      <Typography fontWeight={selectedAlert.status === 'RESOLVED' ? 700 : 400} color={selectedAlert.status === 'RESOLVED' ? 'text.primary' : 'text.disabled'}>Resolved</Typography>
                    </StepLabel>
                  </Step>
                </Stepper>
              </Paper>

            </Box>

            {/* ACTION BUTTONS BOTTOM BAR */}
            <Box sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid #E2E8F0' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="warning" startIcon={<CheckCircle />} sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}>
                    Acknowledge
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="primary" startIcon={<DirectionsRun />} sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}>
                    Assign
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" color="error" startIcon={<EscalatorWarning />} sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}>
                    Escalate
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="success" startIcon={<DoneAll />} sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}>
                    Resolve
                  </Button>
                </Grid>
              </Grid>
            </Box>

          </Box>
        )}
      </Drawer>
    </Box>
  );
}
