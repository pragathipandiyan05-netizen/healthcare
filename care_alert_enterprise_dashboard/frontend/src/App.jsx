import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import theme from './theme';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import DrugInventory from './screens/DrugInventory';
import BloodBank from './screens/BloodBank';
import LiveAlerts from './screens/LiveAlerts';
import Hospitals from './screens/Hospitals';
import Analytics from './screens/Analytics';
import Reports from './screens/Reports';
import AdminAddStaff from './screens/AdminAddStaff';
import StaffPortal from './screens/StaffPortal';
import Layout from './components/Layout';
import Equipment from './screens/Equipment';
import Ambulances from './screens/Ambulances';
import GISMap from './screens/GISMap';
import Notifications from './screens/Notifications';
import AuditLogs from './screens/AuditLogs';
import Settings from './screens/Settings';
import AllAlerts from './screens/AllAlerts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />

          <Route 
            path="/inventory" 
            element={
              <Layout>
                <DrugInventory />
              </Layout>
            } 
          />
          <Route 
            path="/bloodbank" 
            element={
              <Layout>
                <BloodBank />
              </Layout>
            } 
          />
          <Route 
            path="/alerts" 
            element={
              <Layout>
                <LiveAlerts />
              </Layout>
            } 
          />
          <Route 
            path="/hospitals" 
            element={
              <Layout>
                <Hospitals />
              </Layout>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <Layout>
                <Analytics />
              </Layout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <Layout>
                <Reports />
              </Layout>
            } 
          />
          <Route 
            path="/admin/workers/create" 
            element={
              <Layout>
                <AdminAddStaff />
              </Layout>
            } 
          />
          <Route path="/staff-portal" element={<StaffPortal />} />
          
          {/* Completed Sidebar Modules */}
          <Route path="/all-alerts" element={<Layout><AllAlerts /></Layout>} />
          <Route path="/equipment" element={<Layout><Equipment /></Layout>} />
          <Route path="/ambulances" element={<Layout><Ambulances /></Layout>} />
          <Route path="/map" element={<Layout><GISMap /></Layout>} />
          <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
          <Route path="/audit" element={<Layout><AuditLogs /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
