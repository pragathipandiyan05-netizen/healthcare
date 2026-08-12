const express = require('express');
const router = express.Router();
const pool = require('../common/db');

// Drug Shortage
router.post('/drug-shortage', async (req, res) => {
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

router.get('/drug-shortage', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drug_shortage_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Blood Request
router.post('/blood-request', async (req, res) => {
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

router.get('/blood-request', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blood_request_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Equipment Fault
router.post('/equipment-fault', async (req, res) => {
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

router.get('/equipment-fault', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment_fault_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Facility Hazard
router.post('/facility-hazard', async (req, res) => {
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

router.get('/facility-hazard', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM facility_hazard_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
