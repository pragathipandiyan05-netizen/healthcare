const express = require('express');
const router = express.Router();
const pool = require('../common/db');
const authorizeRole = require('../common/authorize.middleware');

// POST /api/alerts — create an SOS alert
router.post('/', async (req, res) => {
  try {
    const { staff_id, emergency_type, latitude, longitude, building, floor, room } = req.body;
    const sosCode = `SOS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newAlert = await pool.query(
      `INSERT INTO sos_alerts (sos_code, staff_id, emergency_type, latitude, longitude, building, floor, room, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'NEW') RETURNING *`,
      [sosCode, staff_id || 'DEMO_STAFF', emergency_type || 'General Emergency', latitude || 12.9716, longitude || 77.5946, building || 'Emergency Block', floor || '2nd Floor', room || 'Room 204']
    );

    // Legacy table compatibility
    await pool.query(
      'INSERT INTO care_alerts (staff_id, emergency_type, latitude, longitude) VALUES ($1, $2, $3, $4)',
      [staff_id || 'UNKNOWN', emergency_type || 'SOS Emergency', latitude, longitude]
    );

    res.json(newAlert.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error creating SOS alert' });
  }
});

// GET /api/alerts — get active SOS alerts (Scoped by Role)
router.get('/', authorizeRole(['STAFF', 'SECURITY', 'ADMIN']), async (req, res) => {
  try {
    const userRole = req.headers['x-user-role'] || 'DOCTOR';
    const staffId = req.headers['x-staff-id'] || '';

    let query = 'SELECT * FROM sos_alerts ORDER BY created_at DESC';
    let params = [];

    if (!userRole.includes('SECURITY') && !['DEPARTMENT_HEAD', 'HOSPITAL_ADMIN', 'MEDICAL_SUPERINTENDENT', 'SUPER_ADMIN'].includes(userRole)) {
      query = 'SELECT * FROM sos_alerts WHERE staff_id = $1 OR status = $2 ORDER BY created_at DESC';
      params = [staffId, 'NEW'];
    }

    const allAlerts = await pool.query(query, params);
    res.json(allAlerts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error fetching alerts' });
  }
});

// PUT /api/alerts/:id/resolve — resolve an alert
router.put('/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    const updateAlert = await pool.query(
      'UPDATE sos_alerts SET status = $1, resolved_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      ['RESOLVED', id]
    );
    res.json(updateAlert.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/alerts/stats — KPI metrics
router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'NEW') AS active,
        COUNT(*) FILTER (WHERE status = 'RESOLVED') AS resolved,
        COUNT(*) AS total
      FROM sos_alerts
    `);
    const row = result.rows[0];
    res.json({
      active: parseInt(row.active),
      resolved: parseInt(row.resolved),
      total: parseInt(row.total),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
