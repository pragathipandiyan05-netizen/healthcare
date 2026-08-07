import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, Grid, TextField, MenuItem, Button
} from '@mui/material';
import { 
  Download, FilterList, CheckCircle, Error as ErrorIcon 
} from '@mui/icons-material';

const mockLogs = [
  { id: 'AL-901', time: '2026-08-07 10:15:22', user: 'State Admin', role: 'SUPER_ADMIN', action: 'UPDATE', module: 'System Settings', record: 'Password Policy', ip: '192.168.1.45', device: 'Chrome / Windows', result: 'Success' },
  { id: 'AL-902', time: '2026-08-07 09:42:10', user: 'Priya Kumar', role: 'STATE_ADMIN', action: 'CREATE', module: 'Staff Management', record: 'User EMP-8821', ip: '10.0.5.12', device: 'Safari / macOS', result: 'Success' },
  { id: 'AL-903', time: '2026-08-07 09:30:05', user: 'System', role: 'SYSTEM', action: 'DISPATCH', module: 'Ambulance Operations', record: 'TN-01-AB-1234', ip: 'localhost', device: 'Server', result: 'Success' },
  { id: 'AL-904', time: '2026-08-07 08:15:00', user: 'Unknown', role: 'GUEST', action: 'LOGIN_ATTEMPT', module: 'Authentication', record: '-', ip: '114.22.5.101', device: 'Firefox / Linux', result: 'Failed' },
  { id: 'AL-905', time: '2026-08-06 22:45:11', user: 'Dr. Ramesh', role: 'HOSPITAL_ADMIN', action: 'RESOLVE', module: 'SOS Alerts', record: 'Alert #4492', ip: '10.0.12.88', device: 'App / iOS', result: 'Success' },
  { id: 'AL-906', time: '2026-08-06 18:20:00', user: 'Tech. Kumar', role: 'WORKER', action: 'REPORT_FAULT', module: 'Equipment', record: 'EQ-8911', ip: '10.0.8.22', device: 'App / Android', result: 'Success' },
  { id: 'AL-907', time: '2026-08-06 15:10:45', user: 'Priya Kumar', role: 'STATE_ADMIN', action: 'DELETE', module: 'Inventory', record: 'Batch O2-991', ip: '10.0.5.12', device: 'Safari / macOS', result: 'Failed (Permission Denied)' },
];

export default function AuditLogs() {
  const [filterModule, setFilterModule] = useState('All');
  const [filterResult, setFilterResult] = useState('All');

  const getResultChip = (result) => {
    if (result === 'Success') return <Chip size="small" icon={<CheckCircle sx={{fontSize:'12px'}}/>} label={result} sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 600, fontSize: '11px' }} />;
    return <Chip size="small" icon={<ErrorIcon sx={{fontSize:'12px'}}/>} label={result} sx={{ bgcolor: '#FEE2E2', color: '#DC2626', fontWeight: 600, fontSize: '11px' }} />;
  };

  const getActionChip = (action) => {
    let color = '#64748B';
    let bg = '#F1F5F9';
    if (action === 'CREATE') { color = '#059669'; bg = '#D1FAE5'; }
    if (action === 'UPDATE' || action === 'DISPATCH' || action === 'RESOLVE') { color = '#2563EB'; bg = '#DBEAFE'; }
    if (action === 'DELETE') { color = '#DC2626'; bg = '#FEE2E2'; }
    if (action.includes('FAILED') || action.includes('ATTEMPT')) { color = '#D97706'; bg = '#FEF3C7'; }
    
    return <Chip size="small" label={action} sx={{ bgcolor: bg, color: color, fontWeight: 700, fontSize: '10px', borderRadius: 1 }} />;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>System Audit Logs</Typography>
          <Typography variant="body2" color="text.secondary">Immutable record of all system activities and security events</Typography>
        </Box>
        <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>Export Logs</Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', mb: 3, bgcolor: '#F8FAFC' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Search User" size="small" sx={{ bgcolor: 'white' }} />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <TextField 
              select fullWidth label="Module" size="small" 
              value={filterModule} onChange={(e) => setFilterModule(e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="All">All Modules</MenuItem>
              <MenuItem value="Authentication">Authentication</MenuItem>
              <MenuItem value="Staff Management">Staff Management</MenuItem>
              <MenuItem value="System Settings">System Settings</MenuItem>
              <MenuItem value="SOS Alerts">SOS Alerts</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Action" size="small" sx={{ bgcolor: 'white' }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField type="date" fullWidth label="Date" size="small" InputLabelProps={{ shrink: true }} sx={{ bgcolor: 'white' }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField 
              select fullWidth label="Result" size="small" 
              value={filterResult} onChange={(e) => setFilterResult(e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="All">All Results</MenuItem>
              <MenuItem value="Success">Success</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Button variant="contained" fullWidth sx={{ borderRadius: 2 }}>Filter</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 1.5 }}>Date / Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 1.5 }}>User & Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 1.5 }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 1.5 }}>Module & Record</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 1.5 }}>Network & Device</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 1.5 }}>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} whiteSpace="nowrap">{log.time}</Typography>
                    <Typography variant="caption" color="text.secondary">{log.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{log.user}</Typography>
                    <Typography variant="caption" color="text.secondary">{log.role}</Typography>
                  </TableCell>
                  <TableCell>
                    {getActionChip(log.action)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{log.module}</Typography>
                    <Typography variant="caption" color="text.secondary">Record: {log.record}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" fontFamily="monospace">{log.ip}</Typography>
                    <Typography variant="caption" color="text.secondary">{log.device}</Typography>
                  </TableCell>
                  <TableCell>
                    {getResultChip(log.result)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
