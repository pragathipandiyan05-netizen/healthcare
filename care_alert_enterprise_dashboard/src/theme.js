import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0057B8' },
    secondary: { main: '#00897B' },
    success: { main: '#16A34A' },
    error: { main: '#DC2626' },
    warning: { main: '#F59E0B' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    divider: '#E5E7EB',
    text: { primary: '#1a1a1a', secondary: '#5e6c84' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '42px', fontWeight: 800, lineHeight: 1.2 },
    h2: { fontSize: '30px', fontWeight: 700, lineHeight: 1.2 },
    h3: { fontSize: '22px', fontWeight: 600, lineHeight: 1.3 },
    body1: { fontSize: '16px', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '14px', fontWeight: 500, lineHeight: 1.5 },
    caption: { fontSize: '12px', fontWeight: 500, lineHeight: 1.4, color: '#5e6c84' },
    button: { fontSize: '14px', fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
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
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
          transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
          backgroundColor: '#FFFFFF',
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
