import React from 'react';
import { Box, Typography } from '@mui/material';
import KPIRow from '../components/dashboard/KPIRow';
import MapFeedRow from '../components/dashboard/MapFeedRow';
import StatusRow from '../components/dashboard/StatusRow';

// Additional placeholder rows to complete the 5-row spec
const DummyRow = ({ title }) => (
  <Box sx={{ height: '200px', bgcolor: 'white', borderRadius: 3, mb: 3, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
    <Typography variant="h3" color="text.secondary">{title} (Module pending integration)</Typography>
  </Box>
);

export default function Dashboard() {
  return (
    <Box>
      {/* Page Title */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" color="primary" sx={{ mb: 1 }}>State Operations Dashboard</Typography>
        <Typography variant="body1" color="text.secondary">Real-time Enterprise Health Command Center</Typography>
      </Box>

      {/* Row 1: KPI Cards */}
      <KPIRow />

      {/* Row 2: Map & Incident Feed */}
      <MapFeedRow />

      {/* Row 3: Status & Inventory */}
      <StatusRow />

      {/* Row 4: Performance */}
      <DummyRow title="Performance & Trends Row" />

      {/* Row 5: Audit & Activity */}
      <DummyRow title="Recent Activity & Audit Logs Row" />

    </Box>
  );
}
