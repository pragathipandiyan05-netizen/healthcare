import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, IconButton, Button, TextField, InputAdornment, MenuItem, Grid
} from '@mui/material';
import { 
  Search, FilterList, MoreVert, Download, 
  NotificationsActive, MedicalServices, Bloodtype, Build
} from '@mui/icons-material';

const mockAlerts = [
  { id: 'ALT-10492', type: 'SOS', priority: 'Critical', status: 'Active', location: 'Anna Salai, Chennai', hospital: 'Government General Hospital', time: '10:42 AM' },
  { id: 'ALT-10491', type: 'Inventory', priority: 'High', status: 'Assigned', location: 'Pharmacy Dept', hospital: 'Madurai Medical College', time: '09:15 AM' },
  { id: 'ALT-10490', type: 'Blood', priority: 'Critical', status: 'Active', location: 'Blood Bank', hospital: 'Coimbatore GH', time: '08:30 AM' },
  { id: 'ALT-10489', type: 'Equipment', priority: 'Medium', status: 'Resolved', location: 'Radiology Dept', hospital: 'Salem GH', time: 'Yesterday' },
  { id: 'ALT-10488', type: 'SOS', priority: 'High', status: 'Resolved', location: 'Guindy, Chennai', hospital: 'Government General Hospital', time: 'Yesterday' },
  { id: 'ALT-10487', type: 'Inventory', priority: 'Information', status: 'Resolved', location: 'ICU Ward A', hospital: 'Trichy GH', time: '2 Days Ago' },
];

export default function AllAlerts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const getTypeIcon = (type) => {
    switch(type) {
      case 'SOS': return <NotificationsActive sx={{ fontSize: 16, color: '#EF4444' }} />;
      case 'Inventory': return <MedicalServices sx={{ fontSize: 16, color: '#F59E0B' }} />;
      case 'Blood': return <Bloodtype sx={{ fontSize: 16, color: '#EF4444' }} />;
      case 'Equipment': return <Build sx={{ fontSize: 16, color: '#3B82F6' }} />;
      default: return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'High': return { bg: '#FEF3C7', text: '#D97706' };
      case 'Medium': return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'Information': return { bg: '#F1F5F9', text: '#475569' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'Active': return <Chip size="small" label={status} sx={{ bgcolor: '#FEE2E2', color: '#DC2626', fontWeight: 700 }} />;
      case 'Assigned': return <Chip size="small" label={status} sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 700 }} />;
      case 'Resolved': return <Chip size="small" label={status} sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 700 }} />;
      default: return <Chip size="small" label={status} />;
    }
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    if (typeFilter !== 'All' && alert.type !== typeFilter) return false;
    if (statusFilter !== 'All' && alert.status !== statusFilter) return false;
    if (searchTerm && !alert.id.toLowerCase().includes(searchTerm.toLowerCase()) && !alert.hospital.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>All System Alerts</Typography>
          <Typography variant="body2" color="text.secondary">Comprehensive view of all historical and active events</Typography>
        </Box>
        <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>Export Data</Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField 
                placeholder="Search Alert ID or Hospital..." 
                size="small" fullWidth
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ bgcolor: 'white' }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField 
                select fullWidth size="small" label="Alert Type" 
                value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ bgcolor: 'white' }}
              >
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="SOS">SOS Alerts</MenuItem>
                <MenuItem value="Inventory">Inventory Shortages</MenuItem>
                <MenuItem value="Blood">Blood Requests</MenuItem>
                <MenuItem value="Equipment">Equipment Faults</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField 
                select fullWidth size="small" label="Status" 
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ bgcolor: 'white' }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Assigned">Assigned</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" fullWidth startIcon={<FilterList />} sx={{ height: '100%', borderRadius: 2, bgcolor: 'white' }}>More Filters</Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Alert ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Type & Priority</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Location & Hospital</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Created At</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlerts.map((alert) => {
                const priorityColors = getPriorityColor(alert.priority);
                return (
                  <TableRow key={alert.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{alert.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        {getTypeIcon(alert.type)}
                        <Typography variant="body2" fontWeight={600}>{alert.type}</Typography>
                      </Box>
                      <Chip size="small" label={alert.priority} sx={{ bgcolor: priorityColors.bg, color: priorityColors.text, fontWeight: 700, fontSize: '10px', height: 20 }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{alert.location}</Typography>
                      <Typography variant="caption" color="text.secondary">{alert.hospital}</Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(alert.status)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>{alert.time}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><MoreVert /></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
