const express = require('express');
const router = express.Router();
const pool = require('../common/db');
const authorizeRole = require('../common/authorize.middleware');

router.post('/', authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const { title, message, priority, audience, channels } = req.body;
    const broadcastCode = `BRD-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO broadcasts (broadcast_code, title, message, priority, audience, channels)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [broadcastCode, title, message, priority || 'NORMAL', audience || 'ALL', channels || 'PUSH']
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error creating broadcast' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM broadcasts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
