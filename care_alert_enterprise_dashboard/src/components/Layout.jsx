import React, { useState } from 'react';
import { 
  Box, AppBar, Toolbar, Typography, Button, IconButton, CssBaseline, Badge,
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme
} from '@mui/material';
import { 
  NotificationsActive, AccountCircle, Dashboard, LocalHospital, 
  Map as MapIcon, MedicalServices, Bloodtype, Assessment, Assignment, Menu as MenuIcon 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const TIER_1_HEIGHT = 64;
const TIER_2_HEIGHT = 48;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const TOTAL_HEADER_HEIGHT = isMobile ? TIER_1_HEIGHT : (TIER_1_HEIGHT + TIER_2_HEIGHT);

  const navLinks = [
    { text: 'Dashboard', icon: <Dashboard fontSize="small"/>, path: '/dashboard' }, 
    { text: 'Alerts', icon: <NotificationsActive fontSize="small"/>, path: '/alerts' }, 
    { text: 'Hospitals', icon: <LocalHospital fontSize="small"/>, path: '/hospitals' }, 
    { text: 'Inventory', icon: <MedicalServices fontSize="small"/>, path: '/inventory' },
    { text: 'Blood', icon: <Bloodtype fontSize="small"/>, path: '/bloodbank' },
    { text: 'Analytics', icon: <Assessment fontSize="small"/>, path: '/analytics' },
    { text: 'Reports', icon: <Assignment fontSize="small"/>, path: '/reports' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'primary.main', height: '100%', color: 'white' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center' }}>
        <Box component="img" src="/logo.png" alt="Logo" sx={{ width: 32, height: 32, mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>Command<br/>Centre</Typography>
      </Box>
      <List>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <ListItem key={link.text} disablePadding>
              <ListItemButton 
                onClick={() => { navigate(link.path); setMobileOpen(false); }}
                sx={{ 
                  bgcolor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderLeft: isActive ? '4px solid white' : '4px solid transparent'
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} primaryTypographyProps={{ fontWeight: isActive ? 'bold' : 'normal' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>
      <CssBaseline />

      {/* FIXED HEADER */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        
        {/* Tier 1: Brand & User Profile */}
        <AppBar position="static" elevation={0} sx={{ height: TIER_1_HEIGHT, bgcolor: '#FFFFFF', color: 'text.primary', borderBottom: '1px solid #E5E7EB' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', px: { xs: 1, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton color="primary" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
                  <MenuIcon />
                </IconButton>
              )}
              {!isMobile && <Box component="img" src="/logo.png" alt="Logo" sx={{ width: 40, height: 40, mr: 1.5 }} />}
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                color="primary" 
                sx={{ letterSpacing: 0.5, fontWeight: 800, display: { xs: 'none', sm: 'block' } }}
              >
                {isMobile ? "COMMAND CENTRE" : "STATE HEALTH COMMAND CENTRE"}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
              <IconButton color="primary">
                <Badge badgeContent={12} color="error">
                  <NotificationsActive />
                </Badge>
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#F8FAFC', px: { xs: 1, md: 2 }, py: 1, borderRadius: 2, border: '1px solid #E5E7EB' }}>
                <AccountCircle color="primary" />
                <Typography variant="body2" fontWeight="bold">{isMobile ? "" : "Admin"}</Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Tier 2: Horizontal Navigation Bar (Desktop Only) */}
        {!isMobile && (
          <AppBar position="static" elevation={0} sx={{ height: TIER_2_HEIGHT, bgcolor: 'primary.main' }}>
            <Toolbar variant="dense" sx={{ display: 'flex', gap: 1, minHeight: TIER_2_HEIGHT, px: 3 }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Button 
                    key={link.text}
                    onClick={() => navigate(link.path)}
                    startIcon={link.icon}
                    sx={{ 
                      color: isActive ? 'primary.main' : 'rgba(255,255,255,0.7)',
                      bgcolor: isActive ? '#FFFFFF' : 'transparent',
                      fontWeight: isActive ? 700 : 500,
                      px: 2.5,
                      py: 0.5,
                      borderRadius: '20px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                        color: isActive ? 'primary.main' : '#FFFFFF',
                      }
                    }}
                  >
                    {link.text}
                  </Button>
                );
              })}
            </Toolbar>
          </AppBar>
        )}
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* SCROLLING PAGE CONTENT */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          pt: `${TOTAL_HEADER_HEIGHT}px`, 
          pb: 4,
          px: { xs: 2, md: 4 },
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1800px', pt: 4 }}>
          {children}
        </Box>
      </Box>

    </Box>
  );
}
