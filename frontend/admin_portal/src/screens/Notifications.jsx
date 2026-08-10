import React, { useState } from 'react';
import { 
  Box, Typography, Paper, List, ListItem, IconButton, Button, 
  Chip, Menu, MenuItem, Checkbox
} from '@mui/material';
import { 
  MoreVert, Delete, DoneAll, NotificationImportant, 
  CheckCircle, Warning, Info, ArrowForward
} from '@mui/icons-material';

const initialNotifications = [
  { id: 1, title: 'Critical SOS Alert', desc: 'Multiple casualties reported at Anna Salai junction.', hospital: 'Government General Hospital', time: '10 mins ago', priority: 'Critical', read: false },
  { id: 2, title: 'O2 Inventory Low', desc: 'Oxygen cylinders below 15% threshold.', hospital: 'Madurai Medical College', time: '1 hour ago', priority: 'High', read: false },
  { id: 3, title: 'Ambulance Dispatched', desc: 'TN-01-AB-1234 dispatched to Mount Road.', hospital: 'Government General Hospital', time: '2 hours ago', priority: 'Information', read: true },
  { id: 4, title: 'Equipment Fault Resolved', desc: 'MRI Scanner maintenance completed.', hospital: 'Salem GH', time: 'Yesterday', priority: 'Resolved', read: true },
  { id: 5, title: 'High Blood Demand', desc: 'O-Negative blood required urgently.', hospital: 'Coimbatore GH', time: 'Yesterday', priority: 'Medium', read: true },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return '#DC2626';
      case 'High': return '#F59E0B';
      case 'Medium': return '#3B82F6';
      case 'Information': return '#64748B';
      case 'Resolved': return '#10B981';
      default: return '#64748B';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'Critical': return <NotificationImportant sx={{ color: '#DC2626' }} />;
      case 'High': return <Warning sx={{ color: '#F59E0B' }} />;
      case 'Medium': return <Info sx={{ color: '#3B82F6' }} />;
      case 'Information': return <Info sx={{ color: '#64748B' }} />;
      case 'Resolved': return <CheckCircle sx={{ color: '#10B981' }} />;
      default: return <Info sx={{ color: '#64748B' }} />;
    }
  };

  const handleActionClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };

  const markAsRead = () => {
    setNotifications(prev => prev.map(n => n.id === selectedId ? { ...n, read: true } : n));
    setAnchorEl(null);
  };

  const markAsUnread = () => {
    setNotifications(prev => prev.map(n => n.id === selectedId ? { ...n, read: false } : n));
    setAnchorEl(null);
  };

  const deleteNotification = () => {
    setNotifications(prev => prev.filter(n => n.id !== selectedId));
    setAnchorEl(null);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>Notification Centre</Typography>
          <Typography variant="body2" color="text.secondary">Manage your alerts and system messages</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DoneAll />} sx={{ borderRadius: 2 }} onClick={markAllAsRead}>
          Mark All Read
        </Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0', bgcolor: '#F8FAFC', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Checkbox checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)} />
          <Typography variant="body2" fontWeight={600} color="text.secondary">Select All</Typography>
        </Box>
        
        <List sx={{ p: 0 }}>
          {notifications.map((notif, index) => (
            <Box key={notif.id} sx={{ borderBottom: index < notifications.length - 1 ? '1px solid #E2E8F0' : 'none', bgcolor: notif.read ? 'transparent' : '#EFF6FF', transition: 'background-color 0.2s', '&:hover': { bgcolor: '#F8FAFC' } }}>
              <ListItem sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Checkbox checked={selectAll} sx={{ mt: -1 }} />
                
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${getPriorityColor(notif.priority)}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {getPriorityIcon(notif.priority)}
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="body1" fontWeight={notif.read ? 600 : 800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {notif.title}
                        {!notif.read && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3B82F6' }} />}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{notif.desc}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} whiteSpace="nowrap">
                      {notif.time}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Chip size="small" label={notif.priority} sx={{ bgcolor: `${getPriorityColor(notif.priority)}15`, color: getPriorityColor(notif.priority), fontWeight: 700, fontSize: '11px' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>{notif.hospital}</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                  <IconButton size="small" onClick={(e) => handleActionClick(e, notif.id)}>
                    <MoreVert />
                  </IconButton>
                </Box>
              </ListItem>
            </Box>
          ))}
          {notifications.length === 0 && (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 48, color: '#10B981', mb: 2, opacity: 0.5 }} />
              <Typography variant="h3" color="text.secondary">All caught up!</Typography>
              <Typography variant="body2" color="text.secondary">You have no new notifications.</Typography>
            </Box>
          )}
        </List>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { width: 200, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } }}>
        <MenuItem onClick={markAsRead}><DoneAll sx={{ mr: 1.5, fontSize: 18, color: 'text.secondary' }} /> Mark as Read</MenuItem>
        <MenuItem onClick={markAsUnread}><NotificationImportant sx={{ mr: 1.5, fontSize: 18, color: 'text.secondary' }} /> Mark as Unread</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}><ArrowForward sx={{ mr: 1.5, fontSize: 18, color: 'primary.main' }} /> View Record</MenuItem>
        <MenuItem onClick={deleteNotification} sx={{ color: 'error.main' }}><Delete sx={{ mr: 1.5, fontSize: 18 }} /> Delete</MenuItem>
      </Menu>
    </Box>
  );
}
