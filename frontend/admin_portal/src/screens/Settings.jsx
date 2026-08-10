import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Switch, 
  FormControlLabel, Tabs, Tab, Divider, useMediaQuery, useTheme,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip
} from '@mui/material';
import { 
  Save, Business, NotificationsActive, Security, MonitorHeart,
  CheckCircle, Error as ErrorIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other} style={{ flexGrow: 1 }}>
      {value === index && <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>}
    </div>
  );
}

export default function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = true; // Forced mobile interface

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>System Settings</Typography>
          <Typography variant="body2" color="text.secondary">Manage organization, security, and global configuration</Typography>
        </Box>
        <Button variant="contained" startIcon={<Save />} sx={{ borderRadius: 2 }}>Save Changes</Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '600px', overflow: 'hidden' }}>
        
        {/* TABS SIDEBAR (Vertical on Desktop, Horizontal on Mobile) */}
        <Box sx={{ borderRight: { xs: 'none', md: '1px solid #E2E8F0' }, borderBottom: { xs: '1px solid #E2E8F0', md: 'none' }, width: { xs: '100%', md: 250 }, bgcolor: '#F8FAFC', flexShrink: 0 }}>
          <Tabs 
            orientation={isMobile ? 'horizontal' : 'vertical'} 
            variant="scrollable"
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ '& .MuiTab-root': { alignItems: { xs: 'center', md: 'flex-start' }, textAlign: 'left', minHeight: 60, px: 3, fontWeight: 600, textTransform: 'none', fontSize: '14px' } }}
          >
            <Tab icon={<Business sx={{ mr: { xs: 0, md: 1.5 }, mb: { xs: 0.5, md: 0 } }} />} iconPosition={isMobile ? 'top' : 'start'} label="Organization" />
            <Tab icon={<NotificationsActive sx={{ mr: { xs: 0, md: 1.5 }, mb: { xs: 0.5, md: 0 } }} />} iconPosition={isMobile ? 'top' : 'start'} label="Alert Config" />
            <Tab icon={<Security sx={{ mr: { xs: 0, md: 1.5 }, mb: { xs: 0.5, md: 0 } }} />} iconPosition={isMobile ? 'top' : 'start'} label="Security" />
            <Tab icon={<MonitorHeart sx={{ mr: { xs: 0, md: 1.5 }, mb: { xs: 0.5, md: 0 } }} />} iconPosition={isMobile ? 'top' : 'start'} label="System Health" />
          </Tabs>
        </Box>

        {/* TAB 0: ORGANIZATION */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h3" mb={3}>Organization Details</Typography>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" fontWeight={600} mb={1}>State Health Department</Typography>
              <TextField fullWidth size="small" defaultValue="Tamil Nadu Health Systems Project" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" fontWeight={600} mb={1}>Command Centre Location</Typography>
              <TextField fullWidth size="small" defaultValue="DMS Campus, Chennai" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" fontWeight={600} mb={1}>Total Districts Monitored</Typography>
              <TextField fullWidth size="small" defaultValue="38" disabled />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" fontWeight={600} mb={1}>Total Registered Hospitals</Typography>
              <TextField fullWidth size="small" defaultValue="1,245" disabled />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" fontWeight={600} mb={1}>Emergency Contact Email</Typography>
              <TextField fullWidth size="small" defaultValue="emergency@tnhealth.gov.in" />
            </Grid>
          </Grid>
        </TabPanel>

        {/* TAB 1: ALERT CONFIGURATION */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h3" mb={3}>SOS & Escalation Rules</Typography>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 2, borderBottom: '1px solid #E2E8F0' }}>
              <ListItemText primary="Auto-Escalate Critical SOS" secondary="Automatically escalate unacknowledged Critical SOS alerts after 3 minutes." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction><Switch defaultChecked color="primary" /></ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, py: 2, borderBottom: '1px solid #E2E8F0' }}>
              <ListItemText primary="Inventory Warning Threshold" secondary="Trigger warnings when oxygen or essential drugs fall below this percentage." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction sx={{ width: 100 }}><TextField size="small" defaultValue="15" InputProps={{ endAdornment: '%' }} /></ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, py: 2, borderBottom: '1px solid #E2E8F0' }}>
              <ListItemText primary="SMS Notifications" secondary="Send SMS alerts to Command Centre admins for Critical SOS events." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction><Switch defaultChecked color="primary" /></ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, py: 2 }}>
              <ListItemText primary="Push Notifications" secondary="Enable browser push notifications for incoming live alerts." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction><Switch defaultChecked color="primary" /></ListItemSecondaryAction>
            </ListItem>
          </List>
        </TabPanel>

        {/* TAB 2: SECURITY */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h3" mb={3}>Security & Access Control</Typography>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 2, borderBottom: '1px solid #E2E8F0' }}>
              <ListItemText primary="Enforce Strong Passwords" secondary="Require 12+ characters, numbers, and symbols for all worker accounts." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction><Switch defaultChecked color="primary" /></ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, py: 2, borderBottom: '1px solid #E2E8F0' }}>
              <ListItemText primary="Session Timeout (Minutes)" secondary="Automatically log out users after inactivity." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction sx={{ width: 100 }}><TextField size="small" defaultValue="30" /></ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, py: 2 }}>
              <ListItemText primary="Two-Factor Authentication (2FA)" secondary="Require OTP verification for State and District Administrators." primaryTypographyProps={{ fontWeight: 600 }} />
              <ListItemSecondaryAction><Switch defaultChecked color="primary" /></ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Box sx={{ mt: 4 }}>
            <Button variant="outlined" color="error" sx={{ borderRadius: 2 }}>Revoke All Active Sessions</Button>
          </Box>
        </TabPanel>

        {/* TAB 3: SYSTEM HEALTH */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h3" mb={3}>Infrastructure Status</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" fontWeight={700}>Core API Server</Typography>
                  <Chip size="small" icon={<CheckCircle sx={{fontSize:'14px'}}/>} label="Healthy" sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 600 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>Uptime: 99.99%</Typography>
                <Typography variant="body2" color="text.secondary">Latency: 45ms</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" fontWeight={700}>PostgreSQL Database</Typography>
                  <Chip size="small" icon={<CheckCircle sx={{fontSize:'14px'}}/>} label="Healthy" sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 600 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>Connections: 42/100</Typography>
                <Typography variant="body2" color="text.secondary">Query Time: 12ms</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" fontWeight={700}>WebSocket Server (SOS)</Typography>
                  <Chip size="small" icon={<CheckCircle sx={{fontSize:'14px'}}/>} label="Healthy" sx={{ bgcolor: '#D1FAE5', color: '#059669', fontWeight: 600 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>Active Connections: 12,450</Typography>
                <Typography variant="body2" color="text.secondary">Message Rate: 45/sec</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" fontWeight={700}>Third-Party SMS Gateway</Typography>
                  <Chip size="small" icon={<ErrorIcon sx={{fontSize:'14px'}}/>} label="Degraded" sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 600 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>Delivery Rate: 85%</Typography>
                <Typography variant="body2" color="text.secondary">Latency: 2500ms</Typography>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

      </Paper>
    </Box>
  );
}
