const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create an alert
app.post('/api/alerts', async (req, res) => {
  try {
    const { staff_id, emergency_type, latitude, longitude } = req.body;
    const newAlert = await pool.query(
      'INSERT INTO care_alerts (staff_id, emergency_type, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
      [staff_id || 'UNKNOWN', emergency_type, latitude, longitude]
    );
    res.json(newAlert.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all active alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const allAlerts = await pool.query('SELECT * FROM care_alerts WHERE status = $1 ORDER BY created_at DESC', ['ACTIVE']);
    res.json(allAlerts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Resolve an alert
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
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
