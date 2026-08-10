import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Button, Avatar, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export default function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await fetch(`${API_URL}/users/workers`);
      if (!res.ok) throw new Error('Failed to fetch workers');
      const data = await res.json();
      setWorkers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'Worker Name', 
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '14px' }}>
            {params.row.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{params.row.name}</Typography>
            <Typography variant="caption" color="text.secondary">{params.row.employee_id}</Typography>
          </Box>
        </Box>
      )
    },
    { 
      field: 'hospital', 
      headerName: 'Assigned Hospital', 
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => params.row.hospital ? params.row.hospital.name : 'N/A'
    },
    { field: 'email', headerName: 'Email Address', flex: 1.5, minWidth: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          color={params.value === 'ACTIVE' ? 'success' : 'default'}
          sx={{ fontWeight: 'bold', fontSize: '11px' }}
        />
      )
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="primary.main" mb={0.5}>
            Registered Workers
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage all registered healthcare staff members.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => navigate('/admin/workers/create')}
          sx={{ borderRadius: 2, fontWeight: 600, py: 1 }}
        >
          Add New Staff
        </Button>
      </Box>

      <Paper sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={workers}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' },
              '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8fafc', borderBottom: '2px solid #e2e8f0' },
              '& .MuiDataGrid-row:hover': { bgcolor: '#f1f5f9' },
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
