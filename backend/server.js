const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// AUTH
// ============================================================

// POST /api/auth/login — simple credential check
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Static credential map (can be replaced with DB lookup later)
  const users = {
    'staff@gmail.com':      { password: 'password', role: 'Staff (Doctor/Nurse)', name: 'Staff User' },
    'security@gmail.com':   { password: 'password', role: 'SECURITY_STAFF',       name: 'Security Staff' },
    'supervisor@gmail.com': { password: 'password', role: 'SECURITY_SUPERVISOR',  name: 'Supervisor' },
  };

  const user = users[email.toLowerCase().trim()];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ success: true, role: user.role, name: user.name, email });
});

// ============================================================
// SOS ALERTS
// ============================================================

// POST /api/alerts — create an SOS alert
app.post('/api/alerts', async (req, res) => {
  try {
    const { staff_id, emergency_type, latitude, longitude } = req.body;
    const newAlert = await pool.query(
      'INSERT INTO care_alerts (staff_id, emergency_type, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
      [staff_id || 'UNKNOWN', emergency_type || 'SOS Emergency', latitude, longitude]
    );
    res.json(newAlert.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/alerts — get all active SOS alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const allAlerts = await pool.query(
      'SELECT * FROM care_alerts ORDER BY created_at DESC'
    );
    res.json(allAlerts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT /api/alerts/:id/resolve — resolve an alert
app.put('/api/alerts/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    const updateAlert = await pool.query(
      'UPDATE care_alerts SET status = $1, resolved_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      ['RESOLVED', id]
    );
    res.json(updateAlert.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ============================================================
// REPORTS — Drug Shortage
// ============================================================

// POST /api/reports/drug-shortage
app.post('/api/reports/drug-shortage', async (req, res) => {
  try {
    const { staff_id, item_name, category, current_stock, required_quantity, urgency, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO drug_shortage_reports
        (staff_id, item_name, category, current_stock, required_quantity, urgency, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [staff_id, item_name, category, current_stock, required_quantity, urgency, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/reports/drug-shortage
app.get('/api/reports/drug-shortage', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drug_shortage_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ============================================================
// REPORTS — Blood Request
// ============================================================

// POST /api/reports/blood-request
app.post('/api/reports/blood-request', async (req, res) => {
  try {
    const { staff_id, blood_group, component, units_required, urgency, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO blood_request_reports
        (staff_id, blood_group, component, units_required, urgency, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [staff_id, blood_group, component, units_required, urgency, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/reports/blood-request
app.get('/api/reports/blood-request', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blood_request_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ============================================================
// REPORTS — Equipment Fault
// ============================================================

// POST /api/reports/equipment-fault
app.post('/api/reports/equipment-fault', async (req, res) => {
  try {
    const { staff_id, category, equipment_name, asset_id, location, ward, fault_type, safety_impact, description, is_in_use, priority } = req.body;
    const result = await pool.query(
      `INSERT INTO equipment_fault_reports
        (staff_id, category, equipment_name, asset_id, location, ward, fault_type, safety_impact, description, is_in_use, priority)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [staff_id, category, equipment_name, asset_id, location, ward, fault_type, safety_impact, description, is_in_use, priority]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/reports/equipment-fault
app.get('/api/reports/equipment-fault', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment_fault_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ============================================================
// REPORTS — Facility Hazard
// ============================================================

// POST /api/reports/facility-hazard
app.post('/api/reports/facility-hazard', async (req, res) => {
  try {
    const { staff_id, category, description, building, block, floor, room, people_at_risk, immediate_danger, affected_service, affected_count, immediate_action, priority } = req.body;
    const result = await pool.query(
      `INSERT INTO facility_hazard_reports
        (staff_id, category, description, building, block, floor, room, people_at_risk, immediate_danger, affected_service, affected_count, immediate_action, priority)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [staff_id, category, description, building, block, floor, room, people_at_risk, immediate_danger, affected_service, affected_count, immediate_action, priority]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/reports/facility-hazard
app.get('/api/reports/facility-hazard', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM facility_hazard_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CARE ALERT backend running on port ${PORT}`);
});
