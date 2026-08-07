import React from 'react';
import { 
  Box, Typography, Grid, Paper, Divider, Button, Avatar, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  useMediaQuery, useTheme, List, ListItem, ListItemText, ListItemIcon, IconButton, LinearProgress
} from '@mui/material';
import { 
  NotificationsActive, Warning, LocalHospital, AssignmentInd, 
  MedicalServices, Bloodtype, Assessment, AccessTime, Add, ChevronRight, Sensors,
  LocationOn, CalendarToday, CheckCircle, ArrowForwardIos, GppGood
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSosWebSocket } from '../hooks/useSosWebSocket';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------
// MOCK DATA for Charts & Tables
// ----------------------------------------------------
const lineData = [
  { name: '01 Aug', sos: 18, inventory: 40, equipment: 20, blood: 10 },
  { name: '02 Aug', sos: 22, inventory: 45, equipment: 22, blood: 12 },
  { name: '03 Aug', sos: 30, inventory: 60, equipment: 35, blood: 15 },
  { name: '04 Aug', sos: 15, inventory: 45, equipment: 18, blood: 8 },
  { name: '05 Aug', sos: 20, inventory: 50, equipment: 25, blood: 14 },
  { name: '06 Aug', sos: 25, inventory: 65, equipment: 30, blood: 16 },
  { name: '07 Aug', sos: 45, inventory: 80, equipment: 24, blood: 18 },
];

const pieData = [
  { name: 'Critical', value: 34, color: '#EF4444' },
  { name: 'High', value: 28, color: '#F59E0B' },
  { name: 'Medium', value: 21, color: '#06B6D4' },
  { name: 'Low', value: 10, color: '#10B981' },
];

const districtData = [
  { district: 'Chennai', hospitals: '28 / 30', sos: 2, critical: 6, inv: 12, blood: 4, response: '3m 22s', status: 'Attention' },
  { district: 'Coimbatore', hospitals: '22 / 24', sos: 1, critical: 4, inv: 8, blood: 2, response: '4m 18s', status: 'Good' },
  { district: 'Madurai', hospitals: '19 / 20', sos: 0, critical: 2, inv: 5, blood: 1, response: '2m 45s', status: 'Good' },
  { district: 'Salem', hospitals: '17 / 18', sos: 0, critical: 3, inv: 6, blood: 2, response: '3m 55s', status: 'Good' },
  { district: 'Trichy', hospitals: '21 / 22', sos: 0, critical: 2, inv: 6, blood: 1, response: '3m 10s', status: 'Good' },
];

// ----------------------------------------------------
// COMPONENT: KPI Card
// ----------------------------------------------------
const KPICard = ({ title, value, subtext, subtextColor, icon, iconColor, iconBg }) => (
  <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '112px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
        <Typography variant="caption" fontWeight={600} color="text.secondary" noWrap sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h2" mb={0.5} noWrap sx={{ lineHeight: 1, fontSize: value.length > 5 ? '24px' : '30px' }}>{value}</Typography>
      </Box>
      <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 2, bgcolor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </Box>
    </Box>
    <Typography variant="caption" fontWeight={500} color={subtextColor} noWrap>{subtext}</Typography>
  </Paper>
);

const MobileKPICard = ({ title, value, subtext, subtextColor, icon, iconColor, iconBg }) => (
  <Paper elevation={0} sx={{ p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h2" mb={0.5} sx={{ lineHeight: 1, fontSize: '24px' }}>{value}</Typography>
        <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 0.5 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {React.cloneElement(icon, { sx: { fontSize: 18 } })}
      </Box>
    </Box>
    <Typography variant="caption" fontWeight={500} color={subtextColor} sx={{ fontSize: '10px' }}>{subtext}</Typography>
  </Paper>
);

// ----------------------------------------------------
// MAIN DASHBOARD COMPONENT
// ----------------------------------------------------
export default function Dashboard() {
  const { liveSosAlerts } = useSosWebSocket();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('xl'));
  const navigate = useNavigate();

  const displayAlerts = liveSosAlerts.length > 0 ? liveSosAlerts : [
    { id: 1, worker: { name: 'Priya Kumar', email: 'priya.kumar@hospital.org', employee_id: 'EMP-9824' }, hospital: { name: 'Government General Hospital' }, department: { name: 'Emergency Ward' }, created_at: new Date(), status: 'LIVE', district: 'Chennai' },
  ];

  // ==========================================
  // MOBILE VIEW
  // ==========================================
  if (isMobile) {
    return (
      <Box sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="body1" color="text.secondary" mb={0.5}>Good morning, Admin 👋</Typography>
            <Typography variant="h2">Overview</Typography>
          </Box>
        </Box>

        <Grid container spacing={1.5} mb={3}>
          <Grid item xs={6}>
            <MobileKPICard title="Active SOS" value="03" subtext="↑ 2 vs yesterday" subtextColor="error.main" icon={<Sensors/>} iconColor="#EF4444" iconBg="#FEE2E2" />
          </Grid>
          <Grid item xs={6}>
            <MobileKPICard title="Critical Alerts" value="24" subtext="↑ 5 unresolved" subtextColor="warning.main" icon={<Warning/>} iconColor="#F59E0B" iconBg="#FEF3C7" />
          </Grid>
          <Grid item xs={6}>
            <MobileKPICard title="Hospitals" value="384" subtext="96% online" subtextColor="primary.main" icon={<LocalHospital/>} iconColor="#1E40AF" iconBg="#EFF6FF" />
          </Grid>
          <Grid item xs={6}>
            <MobileKPICard title="Workers" value="24,812" subtext="↑ 326 active" subtextColor="success.main" icon={<AssignmentInd/>} iconColor="#10B981" iconBg="#D1FAE5" />
          </Grid>
        </Grid>

        {displayAlerts.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" mb={1.5}>Active Emergency</Typography>
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #EF4444' }}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  <Typography variant="caption" fontWeight={600} color="error.main">LIVE SOS</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>10:42 AM</Typography>
                </Box>
                <Typography variant="h3" color="text.primary" mb={0.5}>{displayAlerts[0].worker?.name}</Typography>
                <Typography variant="caption" display="block" color="text.secondary" mb={1.5}>{displayAlerts[0].worker?.employee_id} • {displayAlerts[0].worker?.email}</Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                  <LocalHospital sx={{ fontSize: 16, color: 'primary.main', mt: 0.2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{displayAlerts[0].hospital?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{displayAlerts[0].department?.name} • {displayAlerts[0].district}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', borderTop: '1px solid #F1F5F9' }}>
                <Button fullWidth color="error" sx={{ py: 1.5, borderRadius: 0, borderRight: '1px solid #F1F5F9', fontWeight: 600 }}>Acknowledge</Button>
                <Button fullWidth color="primary" sx={{ py: 1.5, borderRadius: 0, fontWeight: 600 }}>View Details</Button>
              </Box>
            </Paper>
          </Box>
        )}

        <Typography variant="h3" mb={1.5}>Alert Trends</Typography>
        <Paper elevation={0} sx={{ p: 1.5, height: 260, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="sos" stroke="#EF4444" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="inventory" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="equipment" stroke="#1E40AF" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        
        <Typography variant="h3" mb={1.5}>Hospital Status</Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>Hospitals Online</Typography>
            <Typography variant="body2" fontWeight={600}>384 / 400</Typography>
          </Box>
          <LinearProgress variant="determinate" value={96} sx={{ height: 8, borderRadius: 4, mb: 2, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: 'success.main' } }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box><Typography variant="h3">384</Typography><Typography variant="caption" color="text.secondary">Online</Typography></Box>
            <Box><Typography variant="h3">16</Typography><Typography variant="caption" color="text.secondary">Offline</Typography></Box>
            <Box><Typography variant="h3" color="error.main">3</Typography><Typography variant="caption" color="error.main">Critical</Typography></Box>
          </Box>
        </Paper>

        <Typography variant="h3" mb={1.5}>District Overview</Typography>
        {districtData.map(d => (
          <Paper elevation={0} key={d.district} sx={{ p: 1.5, mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight={600}>{d.district}</Typography>
              <Chip label={d.status} size="small" sx={{ height: 20, fontSize: '10px', bgcolor: d.status === 'Good' ? '#D1FAE5' : '#FEF3C7', color: d.status === 'Good' ? '#059669' : '#D97706', fontWeight: 600 }} />
            </Box>
            <Typography variant="caption" display="block" color="text.secondary" mb={1}>{d.hospitals} hospitals</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="caption" sx={{ color: d.sos > 0 ? 'error.main' : 'text.secondary', fontWeight: d.sos > 0 ? 600 : 400 }}>SOS: {d.sos}</Typography>
              <Typography variant="caption" color="text.secondary">Critical: {d.critical}</Typography>
              <Typography variant="caption" color="text.secondary">Response: {d.response}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  // ==========================================
  // DESKTOP VIEW
  // ==========================================
  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="body1" color="text.secondary" mb={0.5}>Good morning, State Admin 👋</Typography>
          <Typography variant="h1" mb={0.5} sx={{ fontSize: '26px' }}>State Operations Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">Real-time overview of healthcare operations across Tamil Nadu</Typography>
        </Box>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, px: 2, borderRadius: 3, border: '1px solid #E2E8F0' }}>
          <CalendarToday sx={{ fontSize: 18, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>07 Aug 2026</Typography>
            <Typography variant="caption" fontWeight={600} color="text.secondary">10:42 AM</Typography>
          </Box>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {/* MAIN DASHBOARD - LEFT COLUMN */}
        <Grid item xs={12} lg={8} xl={9}>
          
          {/* ROW 1: PRIMARY KPIs */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Active SOS" value="03" subtext="↑ 2 vs yesterday" subtextColor="error.main" icon={<Sensors sx={{fontSize:20}}/>} iconColor="#EF4444" iconBg="#FEE2E2" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Critical Alerts" value="24" subtext="↑ 5 unresolved" subtextColor="warning.main" icon={<Warning sx={{fontSize:20}}/>} iconColor="#F59E0B" iconBg="#FEF3C7" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Hospitals Online" value="384 / 400" subtext="96% online" subtextColor="primary.main" icon={<LocalHospital sx={{fontSize:20}}/>} iconColor="#1E40AF" iconBg="#EFF6FF" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Healthcare Workers" value="24,812" subtext="↑ 326 active now" subtextColor="success.main" icon={<AssignmentInd sx={{fontSize:20}}/>} iconColor="#10B981" iconBg="#D1FAE5" />
            </Grid>
          </Grid>

          {/* ROW 2: SECONDARY KPIs */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Inventory Shortages" value="31" subtext="↑ 8 new today" subtextColor="warning.main" icon={<MedicalServices sx={{fontSize:20}}/>} iconColor="#F59E0B" iconBg="#FEF3C7" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Blood Requests" value="18" subtext="↑ 3 urgent" subtextColor="error.main" icon={<Bloodtype sx={{fontSize:20}}/>} iconColor="#EF4444" iconBg="#FEE2E2" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Equipment Faults" value="24" subtext="↑ 4 today" subtextColor="warning.main" icon={<Assessment sx={{fontSize:20}}/>} iconColor="#F59E0B" iconBg="#FEF3C7" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard title="Average Response" value="3m 42s" subtext="↓ Improved" subtextColor="success.main" icon={<AccessTime sx={{fontSize:20}}/>} iconColor="#10B981" iconBg="#D1FAE5" />
            </Grid>
          </Grid>

          {/* ROW 3: CHARTS REMOVED AS REQUESTED */}

          {/* ROW 4: OPERATIONAL PANELS */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={7}>
              <Paper elevation={0} sx={{ p: 2.5, height: 200, display: 'flex', flexDirection: 'column', border: '1px solid #F1F5F9' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3">Live SOS Alerts</Typography>
                  <Typography variant="caption" color="primary.main" fontWeight={600} sx={{ cursor: 'pointer' }}>View All</Typography>
                </Box>
                {displayAlerts.length > 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444', mb: 1, boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
                      <Typography variant="caption" color="error.main" fontWeight={600}>LIVE</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{displayAlerts[0].worker?.name}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">{displayAlerts[0].worker?.employee_id} • {displayAlerts[0].worker?.email}</Typography>
                      <Typography variant="caption" display="block" mt={1}>{displayAlerts[0].hospital?.name} • {displayAlerts[0].department?.name}</Typography>
                      <Typography variant="caption" color="text.secondary">10:42 AM • {displayAlerts[0].district}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button size="small" variant="outlined" color="error" sx={{ height: 28 }}>Acknowledge</Button>
                      <Button size="small" variant="text" color="primary" sx={{ height: 28 }}>View Details</Button>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">No active SOS alerts.</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper elevation={0} sx={{ p: 2.5, height: 200, border: '1px solid #F1F5F9' }}>
                <Typography variant="h3" mb={2}>Hospital System Status</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>Hospitals Online</Typography>
                  <Typography variant="body2" fontWeight={600}>384 / 400 <Typography component="span" variant="caption" color="text.secondary">(96%)</Typography></Typography>
                </Box>
                <LinearProgress variant="determinate" value={96} sx={{ height: 6, borderRadius: 3, mb: 3, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h2" mb={0.5}>384</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10B981' }} />
                      <Typography variant="caption" color="text.secondary">Online</Typography>
                    </Box>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box>
                    <Typography variant="h2" mb={0.5}>16</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#64748B' }} />
                      <Typography variant="caption" color="text.secondary">Offline</Typography>
                    </Box>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box>
                    <Typography variant="h2" mb={0.5} color="error.main">3</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#EF4444' }} />
                      <Typography variant="caption" color="text.secondary">Critical</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* ROW 5: DISTRICT TABLE */}
          <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #F1F5F9' }}>
            <Box sx={{ p: 2.5, borderBottom: '1px solid #F1F5F9' }}>
              <Typography variant="h3">District Overview</Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2, px: 3 }}>District</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2 }}>Hospitals</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2 }}>Active SOS</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2 }}>Critical Alerts</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2 }}>Inventory Alerts</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2 }}>Blood Requests</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2 }}>Avg Response</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', py: 2, px: 3 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {districtData.map((row) => (
                    <TableRow key={row.district} hover sx={{ '& td': { py: 1.5, borderBottom: '1px solid #F8FAFC' } }}>
                      <TableCell sx={{ fontWeight: 500, px: 3 }}>{row.district}</TableCell>
                      <TableCell>{row.hospitals}</TableCell>
                      <TableCell sx={{ color: row.sos > 0 ? 'error.main' : 'inherit', fontWeight: row.sos > 0 ? 600 : 400 }}>{row.sos}</TableCell>
                      <TableCell sx={{ color: row.critical > 2 ? 'error.main' : 'inherit', fontWeight: row.critical > 2 ? 600 : 400 }}>{row.critical}</TableCell>
                      <TableCell>{row.inv}</TableCell>
                      <TableCell>{row.blood}</TableCell>
                      <TableCell>{row.response}</TableCell>
                      <TableCell sx={{ px: 3 }}>
                        <Chip 
                          label={row.status} 
                          size="small" 
                          sx={{ 
                            height: 22, fontSize: '11px', 
                            bgcolor: row.status === 'Good' ? '#D1FAE5' : '#FEF3C7', 
                            color: row.status === 'Good' ? '#059669' : '#D97706', 
                            fontWeight: 600, borderRadius: 1 
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: ACTIONS & NOTIFICATIONS */}
        <Grid item xs={12} lg={4} xl={3}>
          {/* QUICK ACTIONS */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" mb={2}>Quick Actions</Typography>
            <Grid container spacing={2}>
              {[
                { icon: <Add sx={{color:'#1E40AF', fontSize: 24}} />, label: 'Add Staff', bg: '#EFF6FF', action: () => navigate('/admin/workers/create') },
                { icon: <LocalHospital sx={{color:'#1E40AF', fontSize: 24}} />, label: 'Add Hospital', bg: '#EFF6FF' },
                { icon: <NotificationsActive sx={{color:'#06B6D4', fontSize: 24}} />, label: 'Send Alert', bg: '#CFFAFE' },
                { icon: <MedicalServices sx={{color:'#F59E0B', fontSize: 24}} />, label: 'Inventory', bg: '#FEF3C7' },
                { icon: <Bloodtype sx={{color:'#EF4444', fontSize: 24}} />, label: 'Blood Req', bg: '#FEE2E2' },
                { icon: <Assessment sx={{color:'#10B981', fontSize: 24}} />, label: 'Eq Fault', bg: '#D1FAE5' },
              ].map((action) => (
                <Grid item xs={4} sm={3} md={2} lg={6} key={action.label}>
                  <Paper elevation={0} onClick={action.action} sx={{ p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 100, cursor: 'pointer', border: '1px solid #F1F5F9', '&:hover': { borderColor: 'primary.main', bgcolor: '#F8FAFC' } }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: action.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      {action.icon}
                    </Box>
                    <Typography variant="caption" fontWeight={600} sx={{ lineHeight: 1.2 }}>{action.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* RECENT NOTIFICATIONS */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3">Notifications</Typography>
              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
            </Box>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid #F1F5F9', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { icon: <Warning sx={{color:'white', fontSize: 16}}/>, bg: '#EF4444', title: 'SOS: Priya Kumar', sub: 'General Hospital', time: '10:42 AM' },
                  { icon: <MedicalServices sx={{color:'white', fontSize: 16}}/>, bg: '#F59E0B', title: 'Inventory low', sub: 'Salem Hospital', time: '10:35 AM' },
                  { icon: <GppGood sx={{color:'white', fontSize: 16}}/>, bg: '#10B981', title: 'Fault resolved', sub: 'Ventilator #VTL-24', time: '10:28 AM' },
                  { icon: <Warning sx={{color:'white', fontSize: 16}}/>, bg: '#EF4444', title: 'SOS: Arun Raj', sub: 'Salem Hospital', time: '09:12 AM' },
                ].map((notif, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 1.5 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: notif.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.5 }}>
                      {notif.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>{notif.title}</Typography>
                      <Typography variant="caption" display="block" color="text.secondary" noWrap>{notif.sub}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>{notif.time}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
