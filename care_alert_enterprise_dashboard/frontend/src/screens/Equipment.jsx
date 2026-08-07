import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, Button,
  TextField, InputAdornment, Menu, MenuItem
} from '@mui/material';
import { 
  Assessment, Search, FilterList, MoreVert, Add, Build, 
  CheckCircle, Warning, Error as ErrorIcon, Schedule
} from '@mui/icons-material';

const mockEquipment = [
  { id: 'EQ-8012', name: 'MRI Scanner', category: 'Imaging', hospital: 'Government General Hospital', dept: 'Radiology', status: 'Operational', lastMaint: '2023-11-10', nextMaint: '2024-05-10', tech: 'T. Kumar' },
  { id: 'EQ-4421', name: 'Ventilator V800', category: 'Life Support', hospital: 'Government General Hospital', dept: 'ICU', status: 'Fault', lastMaint: '2023-10-01', nextMaint: '2024-04-01', tech: 'S. Raj' },
  { id: 'EQ-5532', name: 'Defibrillator', category: 'Emergency', hospital: 'Madurai Medical College', dept: 'Emergency', status: 'Maintenance Due', lastMaint: '2023-02-15', nextMaint: '2023-08-15', tech: 'M. Anand' },
  { id: 'EQ-1092', name: 'ECG Machine', category: 'Monitoring', hospital: 'Trichy GH', dept: 'Cardiology', status: 'Operational', lastMaint: '2023-12-05', nextMaint: '2024-06-05', tech: 'K. Selvam' },
  { id: 'EQ-3310', name: 'Dialysis Machine', category: 'Treatment', hospital: 'Coimbatore GH', dept: 'Nephrology', status: 'Operational', lastMaint: '2023-09-20', nextMaint: '2024-03-20', tech: 'R. Babu' },
  { id: 'EQ-8911', name: 'Portable X-Ray', category: 'Imaging', hospital: 'Salem GH', dept: 'Radiology', status: 'Fault', lastMaint: '2023-08-10', nextMaint: '2024-02-10', tech: 'T. Kumar' },
];

const KPICard = ({ title, value, icon, color }) => (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h3" sx={{ mb: 0.5 }}>{value}</Typography>
      <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase' }}>{title}</Typography>
    </Box>
  </Paper>
);

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEq, setSelectedEq] = useState(null);

  const handleActionClick = (event, eq) => {
    setAnchorEl(event.currentTarget);
    setSelectedEq(eq);
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'Operational': return <Chip size="small" icon={<CheckCircle sx={{fontSize:'14px'}}/>} label={status} sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 600 }} />;
      case 'Fault': return <Chip size="small" icon={<ErrorIcon sx={{fontSize:'14px'}}/>} label={status} sx={{ bgcolor: '#FEE2E2', color: '#DC2626', fontWeight: 600 }} />;
      case 'Maintenance Due': return <Chip size="small" icon={<Warning sx={{fontSize:'14px'}}/>} label={status} sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 600 }} />;
      default: return <Chip size="small" label={status} />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>Equipment Management</Typography>
          <Typography variant="body2" color="text.secondary">Monitor and maintain medical assets across all facilities</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2, px: 3 }}>Add Equipment</Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}><KPICard title="Total Assets" value="1,248" icon={<Assessment />} color="#0057B8" /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPICard title="Operational" value="1,156" icon={<CheckCircle />} color="#10B981" /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPICard title="Reported Faults" value="42" icon={<ErrorIcon />} color="#EF4444" /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPICard title="Maintenance Due" value="50" icon={<Schedule />} color="#F59E0B" /></Grid>
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField 
            placeholder="Search by ID, Name, or Hospital..." 
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 350, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#F8FAFC' } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
          />
          <Button variant="outlined" startIcon={<FilterList />} sx={{ borderRadius: 2, color: 'text.secondary', borderColor: '#E2E8F0' }}>Filters</Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Asset ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Equipment Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Hospital & Dept</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Next Maint.</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', align: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockEquipment.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase())).map((eq) => (
                <TableRow key={eq.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{eq.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{eq.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{eq.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{eq.hospital}</Typography>
                    <Typography variant="caption" color="text.secondary">{eq.dept}</Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(eq.status)}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color={new Date(eq.nextMaint) < new Date() ? 'error.main' : 'inherit'} fontWeight={new Date(eq.nextMaint) < new Date() ? 600 : 400}>
                      {eq.nextMaint}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Tech: {eq.tech}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => handleActionClick(e, eq)}><MoreVert /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { width: 200, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } }}>
        <MenuItem onClick={() => setAnchorEl(null)}><Search sx={{ mr: 1.5, fontSize: 18, color: 'text.secondary' }} /> View Details</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}><ErrorIcon sx={{ mr: 1.5, fontSize: 18 }} /> Report Fault</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}><Schedule sx={{ mr: 1.5, fontSize: 18, color: 'text.secondary' }} /> Schedule Maint.</MenuItem>
        {selectedEq?.status === 'Fault' && (
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'success.main' }}><Build sx={{ mr: 1.5, fontSize: 18 }} /> Resolve Fault</MenuItem>
        )}
      </Menu>
    </Box>
  );
}
