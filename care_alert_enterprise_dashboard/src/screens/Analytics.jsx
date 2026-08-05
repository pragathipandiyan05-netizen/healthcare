import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const alertTrendsData = [
  { name: 'Mon', SOS: 4, Medical: 12, Fire: 0 },
  { name: 'Tue', SOS: 2, Medical: 15, Fire: 1 },
  { name: 'Wed', SOS: 6, Medical: 10, Fire: 0 },
  { name: 'Thu', SOS: 1, Medical: 18, Fire: 0 },
  { name: 'Fri', SOS: 5, Medical: 14, Fire: 2 },
  { name: 'Sat', SOS: 8, Medical: 20, Fire: 1 },
  { name: 'Sun', SOS: 3, Medical: 11, Fire: 0 },
];

const bedData = [
  { name: 'General', value: 4200 },
  { name: 'ICU', value: 850 },
  { name: 'Ventilator', value: 320 },
  { name: 'Isolation', value: 150 },
];
const COLORS = ['#0057B8', '#DC2626', '#F59E0B', '#00897B'];

const districtData = [
  { name: 'Chennai', incidents: 120 },
  { name: 'Madurai', incidents: 80 },
  { name: 'Coimbatore', incidents: 95 },
  { name: 'Salem', incidents: 40 },
  { name: 'Trichy', incidents: 65 },
];

const kpis = [
  { title: 'SLA Compliance', value: '98.4%', trend: '+1.2%', color: '#16A34A' },
  { title: 'Incident Resolution Rate', value: '94.2%', trend: '+0.8%', color: '#16A34A' },
  { title: 'Average Response Time', value: '4m 12s', trend: '-30s', color: '#16A34A' },
];

const ChartCard = ({ title, children }) => (
  <Card sx={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
      <Typography variant="h3">{title}</Typography>
    </Box>
    <Box sx={{ flexGrow: 1, p: 2, minHeight: 0 }}>
      {children}
    </Box>
  </Card>
);

export default function Analytics() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h1" color="primary">Executive Analytics Dashboard</Typography>
        <Typography variant="body1" color="text.secondary">Real-time intelligence and state-wide operational metrics</Typography>
      </Box>

      {/* KPI ROW */}
      <Grid container spacing={2}>
        {kpis.map((kpi, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{kpi.title}</Typography>
                <Typography variant="h2" color="primary.main">{kpi.value}</Typography>
              </Box>
              <Typography variant="h3" color={kpi.color}>{kpi.trend}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CHARTS GRID */}
      <Grid container spacing={3}>
        {/* Row 1 */}
        <Grid item xs={12} md={4}>
          <ChartCard title="Alert Trends (7 Days)">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Line type="monotone" dataKey="SOS" stroke="#DC2626" strokeWidth={3} />
                <Line type="monotone" dataKey="Medical" stroke="#0057B8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="District Incident Comparison">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="incidents" fill="#0057B8" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="Statewide Bed Occupancy">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bedData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {bedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={4}>
          <ChartCard title="Ambulance Utilization">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="Medical" stroke="#00897B" fill="#00897B" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="ICU Usage vs Capacity">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="incidents" fill="#DC2626" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="Drug & Blood Consumption">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="SOS" stroke="#F59E0B" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}
