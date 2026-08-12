const express = require('express');
const router = express.Router();
const pool = require('../common/db');

router.post('/register', async (req, res) => {
  try {
    const { user_id, fcm_token, platform } = req.body;
    const result = await pool.query(
      `INSERT INTO device_tokens (user_id, fcm_token, platform) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, fcm_token, platform || 'FLUTTER']
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
