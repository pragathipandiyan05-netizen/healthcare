import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import DrugInventory from './screens/DrugInventory';
import BloodBank from './screens/BloodBank';
import LiveAlerts from './screens/LiveAlerts';
import Hospitals from './screens/Hospitals';
import Analytics from './screens/Analytics';
import Reports from './screens/Reports';
import Layout from './components/Layout';

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
          
          {/* Fallback routes for unimplemented sidebar links removed */}

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
