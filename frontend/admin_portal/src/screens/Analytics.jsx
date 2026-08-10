import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Paper, Button, MenuItem, TextField, IconButton
} from '@mui/material';
import { 
  Download, FilterList, PictureAsPdf, GridOn
} from '@mui/icons-material';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const alertTrendsData = [
  { name: 'Mon', SOS: 12, Medical: 42, Fire: 5 },
  { name: 'Tue', SOS: 19, Medical: 38, Fire: 2 },
  { name: 'Wed', SOS: 15, Medical: 45, Fire: 0 },
  { name: 'Thu', SOS: 22, Medical: 50, Fire: 8 },
  { name: 'Fri', SOS: 28, Medical: 65, Fire: 12 },
  { name: 'Sat', SOS: 35, Medical: 80, Fire: 15 },
  { name: 'Sun', SOS: 25, Medical: 55, Fire: 4 },
];

const districtData = [
  { name: 'Chennai', alerts: 450 },
  { name: 'Madurai', alerts: 280 },
  { name: 'Coimbatore', alerts: 320 },
  { name: 'Salem', alerts: 190 },
  { name: 'Trichy', alerts: 210 },
];

const bedData = [
  { name: 'Occupied', value: 3800 },
  { name: 'Available', value: 1200 },
  { name: 'Maintenance', value: 150 },
];
const COLORS = ['#DC2626', '#10B981', '#F59E0B'];

const ambulanceData = [
  { name: '00:00', util: 20 },
  { name: '04:00', util: 15 },
  { name: '08:00', util: 65 },
  { name: '12:00', util: 85 },
  { name: '16:00', util: 90 },
  { name: '20:00', util: 50 },
];

const ChartCard = ({ title, children }) => (
  <Paper elevation={0} sx={{ height: '450px', display: 'flex', flexDirection: 'column', borderRadius: 3, border: '1px solid #E2E8F0' }}>
    <Box sx={{ p: 2.5, borderBottom: '1px solid #E2E8F0', bgcolor: '#F8FAFC', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
      <Typography variant="h3">{title}</Typography>
    </Box>
    <Box sx={{ flexGrow: 1, p: 3, minHeight: 0 }}>
      {children}
    </Box>
  </Paper>
);

export default function Analytics() {
  const [district, setDistrict] = useState('All');
  const [dateRange, setDateRange] = useState('Last 7 Days');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h2" color="primary.main" mb={0.5}>Analytics & Reports</Typography>
          <Typography variant="body2" color="text.secondary">Comprehensive statewide operational intelligence</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<PictureAsPdf />} sx={{ borderRadius: 2 }}>PDF</Button>
          <Button variant="outlined" startIcon={<GridOn />} sx={{ borderRadius: 2 }}>Excel</Button>
          <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>CSV</Button>
        </Box>
      </Box>

      {/* FILTERS */}
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #E2E8F0', mb: 4, bgcolor: '#F8FAFC' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField 
              select fullWidth label="Date Range" size="small" 
              value={dateRange} onChange={(e) => setDateRange(e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
              <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              <MenuItem value="This Year">This Year</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField 
              select fullWidth label="District" size="small" 
              value={district} onChange={(e) => setDistrict(e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="All">All Districts</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Madurai">Madurai</MenuItem>
              <MenuItem value="Coimbatore">Coimbatore</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Hospital" size="small" defaultValue="All" sx={{ bgcolor: 'white' }}>
              <MenuItem value="All">All Hospitals</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" fullWidth sx={{ borderRadius: 2 }}>Apply Filters</Button>
          </Grid>
        </Grid>
      </Paper>

      {/* CHARTS GRID (LARGE) */}
      <Grid container spacing={4}>
        {/* Full Width Line Chart */}
        <Grid item xs={12}>
          <ChartCard title="SOS & Medical Alert Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="SOS" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Medical" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Fire" stroke="#F59E0B" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Half Width Bar Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard title="Alerts by District">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} cursor={{ fill: '#F1F5F9' }} />
                <Bar dataKey="alerts" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Half Width Area Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard title="Ambulance Fleet Utilization (%)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ambulanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="util" stroke="#10B981" fill="#D1FAE5" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Half Width Pie Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard title="Statewide Bed Occupancy">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={bedData} cx="50%" cy="50%" 
                  innerRadius={100} outerRadius={140} 
                  paddingAngle={5} dataKey="value" stroke="none"
                >
                  {bedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '14px' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Half Width Horizontal Bar */}
        <Grid item xs={12} lg={6}>
          <ChartCard title="Top Hospitals by Alert Volume">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={districtData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748B' }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#1E293B', fontWeight: 600 }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} cursor={{ fill: '#F1F5F9' }} />
                <Bar dataKey="alerts" fill="#6366F1" radius={[0, 6, 6, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}
