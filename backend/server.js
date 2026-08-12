const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRouter = require('./src/auth/auth.router');
const usersRouter = require('./src/users/users.router');
const staffRouter = require('./src/staff/staff.router');
const hospitalsRouter = require('./src/hospitals/hospitals.router');
const departmentsRouter = require('./src/departments/departments.router');
const sosRouter = require('./src/sos/sos.router');
const incidentsRouter = require('./src/incidents/incidents.router');
const deviceRouter = require('./src/device/device.router');
const reportsRouter = require('./src/reports/reports.router');
const broadcastsRouter = require('./src/broadcasts/broadcasts.router');

const app = express();
app.use(cors());
app.use(express.json());

// Set standard CORS & Security headers to prevent DevTools CSP warnings
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Security-Policy', "default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src *;");
  next();
});

// Root welcome handler
app.get('/', (req, res) => {
  res.json({ message: 'CARE ALERT Enterprise API Server is Running', docs: '/api/health' });
});

// Handle Chrome DevTools auto-probe request cleanly
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.json({ status: 'ok' });
});

// Enterprise API Routers
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/staff', staffRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/alerts', sosRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/device', deviceRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/broadcasts', broadcastsRouter);

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CARE ALERT Enterprise Backend running on port ${PORT}`);
});
