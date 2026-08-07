import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E40AF' }, // Professional healthcare blue
    secondary: { main: '#64748B' }, // Slate grey
    success: { main: '#10B981' }, // Emerald green
    error: { main: '#EF4444' }, // Red (for emergencies only)
    warning: { main: '#F59E0B' }, // Orange
    info: { main: '#06B6D4' }, // Cyan
    background: { default: '#F8FAFC', paper: '#FFFFFF' }, // Very light blue-gray background
    divider: '#E2E8F0',
    text: { primary: '#0F172A', secondary: '#64748B' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '26px', fontWeight: 600, lineHeight: 1.2, color: '#0F172A' },
    h2: { fontSize: '26px', fontWeight: 600, lineHeight: 1.2, color: '#0F172A' },
    h3: { fontSize: '15px', fontWeight: 600, lineHeight: 1.3, color: '#0F172A' },
    h4: { fontSize: '14px', fontWeight: 600, lineHeight: 1.3, color: '#1E293B' },
    body1: { fontSize: '13px', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '13px', fontWeight: 500, lineHeight: 1.5 },
    caption: { fontSize: '11px', fontWeight: 500, lineHeight: 1.4, color: '#64748B' },
    button: { fontSize: '13px', fontWeight: 500, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#F8FAFC' }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 3px 0 rgba(0,0,0,0.02)',
          border: '1px solid #F1F5F9',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 3px 0 rgba(0,0,0,0.02)',
          border: '1px solid #F1F5F9',
        },
        elevation0: {
          boxShadow: 'none',
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          }
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px !important',
        },
      },
    },
  },
});

export default theme;
