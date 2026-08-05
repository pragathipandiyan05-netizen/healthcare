import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Button, IconButton, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Visibility, AssignmentInd, DoneAll, Warning, IosShare 
} from '@mui/icons-material';

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'care_alerts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Transform data for DataGrid
        timeFormatted: doc.data().timestamp ? new Date(doc.data().timestamp.toDate()).toLocaleString() : 'N/A',
        priority: doc.data().distress_type === 'Fire / Hazard' ? 'Critical' : 'High',
        hospital: 'Govt General Hospital',
        district: 'Chennai',
        department: 'Cardiology',
      }));
      setAlerts(newAlerts);
    });
    return () => unsubscribe();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Alert ID', width: 130 },
    { field: 'timeFormatted', headerName: 'Timestamp', width: 180 },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          color={params.value === 'Critical' ? 'error' : 'warning'} 
          sx={{ fontWeight: 'bold' }}
        />
      )
    },
    { 
      field: 'distress_type', 
      headerName: 'Category', 
      width: 160,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">{params.value?.toUpperCase() || 'SOS'}</Typography>
      )
    },
    { field: 'hospital', headerName: 'Hospital', width: 220 },
    { field: 'district', headerName: 'District', width: 130 },
    { field: 'department', headerName: 'Department', width: 140 },
    { field: 'staff_id', headerName: 'Reporter ID', width: 130 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => (
        <Chip label={params.value || 'UNASSIGNED'} size="small" variant="outlined" color="error" />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 280,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          <Button size="small" variant="outlined" startIcon={<AssignmentInd />}>Assign</Button>
          <Button size="small" variant="contained" color="success" startIcon={<DoneAll />}>Resolve</Button>
          <IconButton size="small" color="primary"><Visibility /></IconButton>
        </Box>
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
          <Typography variant="h1" color="primary" sx={{ mb: 1 }}>Live Alerts Management</Typography>
          <Typography variant="body1" color="text.secondary">Operational incident management center</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<IosShare />}>Export Report</Button>
          <Button variant="contained" color="error" startIcon={<Warning />}>Broadcast Emergency</Button>
        </Box>
      </Box>

      <Card sx={{ flexGrow: 1, p: 0 }}>
        <DataGrid
          rows={alerts}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          pageSizeOptions={[15, 25, 50]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': { fontSize: '14px' },
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#F5F7FB', fontWeight: 'bold' }
          }}
        />
      </Card>
    </Box>
  );
}
