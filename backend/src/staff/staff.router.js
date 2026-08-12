const express = require('express');
const router = express.Router();
const pool = require('../common/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT sp.*, u.full_name, u.email, u.role
      FROM staff_profiles sp
      LEFT JOIN users u ON sp.user_id = u.id
      ORDER BY sp.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
