import React, { useState } from 'react';
import { 
  Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Badge, TextField, InputAdornment, Avatar,
  IconButton, BottomNavigation, BottomNavigationAction, Paper, SwipeableDrawer,
  Divider, useMediaQuery, useTheme
} from '@mui/material';
import { 
  Dashboard, NotificationsActive, LocalHospital, MedicalServices,
  Bloodtype, Assessment, Assignment, Search, Notifications,
  Warning, Settings, GppGood, AssignmentInd, Explore, Map as MapIcon,
  Home, GridView, Menu as MenuIcon, ExitToApp
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', active: true },
    { text: 'Live SOS Alerts', icon: <NotificationsActive />, path: '/alerts', badge: 8 },
    { text: 'All Alerts', icon: <Warning />, path: '/all-alerts', badge: 24 },
    { text: 'Hospitals', icon: <LocalHospital />, path: '/hospitals' },
    { text: 'Staff / Workers', icon: <AssignmentInd />, path: '/admin/workers' },
    { text: 'Inventory', icon: <MedicalServices />, path: '/inventory', badge: 31 },
    { text: 'Blood Bank', icon: <Bloodtype />, path: '/bloodbank', badge: 18 },
    { text: 'Equipment', icon: <Assessment />, path: '/equipment', badge: 21 },
    { text: 'Ambulances', icon: <Explore />, path: '/ambulances', badge: 'Live' },
    { text: 'Analytics & Reports', icon: <Assessment />, path: '/analytics' },
    { text: 'GIS Map', icon: <MapIcon />, path: '/map' },
    { text: 'Notifications', icon: <Notifications />, path: '/notifications', badge: 12 },
    { text: 'Audit Logs', icon: <Assignment />, path: '/audit' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Logout', icon: <ExitToApp />, path: '/login' },
  ];

  // Map BottomNav routes
  const getCurrentBottomNavValue = () => {
    if (location.pathname === '/dashboard') return 0;
    if (location.pathname === '/alerts') return 1;
    if (location.pathname === '/hospitals') return 2;
    if (location.pathname === '/all-alerts') return 3;
    return 4; // More
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', pb: isMobile ? '80px' : 0 }}>
      
      {/* DESKTOP LEFT SIDEBAR */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid #E2E8F0',
              bgcolor: 'white',
            },
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
            <Box>
              <Typography variant="h3" fontWeight={800} color="#0F172A">CARE ALERT</Typography>
              <Typography variant="caption" display="block">State Health Command Centre</Typography>
            </Box>
          </Box>

          <List sx={{ px: 2, flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#E2E8F0' } }}>
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path) || (item.text === 'Dashboard' && location.pathname === '/');
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.2 }}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2, py: 1, px: 2, mx: 1,
                      bgcolor: isActive ? '#EFF6FF' : 'transparent',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      '&:hover': { bgcolor: isActive ? '#DBEAFE' : '#F8FAFC' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: isActive ? 'primary.main' : 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '13px', fontWeight: isActive ? 600 : 500 }} />
                    {item.badge && (
                      <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, py: 0.2, borderRadius: 10, fontSize: '10px', fontWeight: 600 }}>
                        {item.badge}
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ p: 2 }}>
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', color: 'text.primary' }}>
              <Typography variant="body2" fontWeight={600} mb={1}>System Status</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>All Systems Operational</Typography>
              </Box>
              <Box sx={{ bgcolor: 'white', border: '1px solid #E2E8F0', color: 'text.primary', py: 0.8, px: 1, borderRadius: 2, textAlign: 'center', fontSize: '12px', fontWeight: 600, cursor: 'pointer', '&:hover': { bgcolor: '#F1F5F9' } }}>
                View Health
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}

      {/* RIGHT SIDE MAIN CONTENT AREA */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* TOP HEADER */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #E2E8F0', color: 'text.primary' }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 }, height: { xs: 60, md: 76 } }}>
            
            {/* Mobile Left: Menu Icon & Logo */}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => setMobileMoreOpen(true)} edge="start" sx={{ mr: 1 }}>
                  <MenuIcon />
                </IconButton>
                <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/logo.png" alt="Care Alert Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
              </Box>
            )}

            {/* Desktop Left: Search */}
            {!isMobile && (
              <TextField
                placeholder="Search hospitals, staff, alerts..." variant="outlined" size="small"
                sx={{ width: 400, '& .MuiOutlinedInput-root': { borderRadius: 8, bgcolor: '#F8FAFC', '& fieldset': { borderColor: 'transparent' } } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment> }}
              />
            )}

            {/* Right Side: Notifications, Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
              <IconButton onClick={() => navigate('/notifications')}>
                <Badge badgeContent={12} color="error">
                  <NotificationsActive color="action" />
                </Badge>
              </IconButton>
              
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #E2E8F0', p: 0.5, pr: 2, borderRadius: 8 }}>
                  <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 0.5 }}>
                    <MapIcon sx={{ fontSize: 14 }} />
                  </Box>
                  <Typography variant="body2" fontWeight={600}>Tamil Nadu</Typography>
                </Box>
              )}

              <Box onClick={() => navigate('/settings')} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
                {!isMobile && (
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight={700}>State Admin</Typography>
                    <Typography variant="caption" display="block">Super Administrator</Typography>
                  </Box>
                )}
                <Avatar sx={{ bgcolor: 'primary.main', width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 }, fontWeight: 700, fontSize: { xs: '14px', md: '16px' } }}>SA</Avatar>
              </Box>
            </Box>

          </Toolbar>
        </AppBar>

        {/* SCROLLABLE MAIN CONTENT */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflowY: 'auto' }}>
          {children}
        </Box>
      </Box>

      {/* MOBILE BOTTOM NAVIGATION */}
      {isMobile && (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #E2E8F0', zIndex: 1100 }} elevation={8}>
          <BottomNavigation
            value={getCurrentBottomNavValue()}
            onChange={(event, newValue) => {
              if (newValue === 0) navigate('/dashboard');
              if (newValue === 1) navigate('/alerts');
              if (newValue === 2) navigate('/hospitals');
              if (newValue === 3) navigate('/all-alerts');
              if (newValue === 4) setMobileMoreOpen(true);
            }}
            showLabels
            sx={{ 
              height: 70,
              '& .MuiBottomNavigationAction-root': { minWidth: 0, px: 0.5 },
              '& .MuiBottomNavigationAction-label': { fontSize: '0.65rem', mt: 0.5 }
            }}
          >
            <BottomNavigationAction label="Home" icon={<Home />} sx={{ '&.Mui-selected': { color: 'primary.main' } }} />
            <BottomNavigationAction label="SOS Alerts" icon={<Badge badgeContent={8} color="error"><NotificationsActive /></Badge>} sx={{ '&.Mui-selected': { color: 'primary.main' } }} />
            <BottomNavigationAction label="Hospitals" icon={<LocalHospital />} sx={{ '&.Mui-selected': { color: 'primary.main' } }} />
            <BottomNavigationAction label="Alerts" icon={<Warning />} sx={{ '&.Mui-selected': { color: 'primary.main' } }} />
            <BottomNavigationAction label="More" icon={<GridView />} sx={{ '&.Mui-selected': { color: 'primary.main' } }} />
          </BottomNavigation>
        </Paper>
      )}

      {/* MOBILE "MORE" SIDEBAR */}
      <SwipeableDrawer
        anchor="left"
        open={mobileMoreOpen}
        onClose={() => setMobileMoreOpen(false)}
        onOpen={() => setMobileMoreOpen(true)}
      >
        <Box sx={{ width: 280, role: 'presentation' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>CARE ALERT</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>More Options</Typography>
          </Box>
          <Divider />
          <List sx={{ px: 2, pt: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => {
                    navigate(item.path);
                    setMobileMoreOpen(false);
                  }}
                  sx={{ borderRadius: 2, bgcolor: 'transparent', '&:hover': { bgcolor: '#F1F5F9' } }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600, color: 'text.primary', fontSize: '14px' }} />
                  {item.badge && (
                    <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1.5, py: 0.4, borderRadius: 10, fontSize: '11px', fontWeight: 700 }}>
                      {item.badge}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

    </Box>
  );
}
