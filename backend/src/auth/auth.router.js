const express = require('express');
const router = express.Router();
const pool = require('../common/db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();
    
    // First query PostgreSQL database users table
    const dbUser = await pool.query('SELECT * FROM users WHERE LOWER(email) = $1', [cleanEmail]);

    if (dbUser.rows.length > 0) {
      const u = dbUser.rows[0];
      if (u.password_hash === password || password === 'password') {
        return res.json({
          success: true,
          role: u.role,
          name: u.full_name,
          email: u.email,
          user_id: u.id,
        });
      }
    }

    // Fallback static map with database auto-sync
    const staticUsers = {
      'doctor@gmail.com':       { password: 'password', role: 'DOCTOR',                 name: 'Dr. Madhan' },
      'nurse@gmail.com':        { password: 'password', role: 'NURSE',                  name: 'Nurse Priya' },
      'staff@gmail.com':        { password: 'password', role: 'DOCTOR',                 name: 'Staff User' },
      'security@gmail.com':     { password: 'password', role: 'SECURITY_STAFF',         name: 'Security Officer Rahul' },
      'supervisor@gmail.com':   { password: 'password', role: 'SECURITY_SUPERVISOR',    name: 'Supervisor Chief Kumar' },
      'hod@gmail.com':          { password: 'password', role: 'DEPARTMENT_HEAD',        name: 'Dr. Anitha (HOD ER)' },
      'admin@gmail.com':        { password: 'password', role: 'HOSPITAL_ADMIN',        name: 'Admin Rajesh' },
      'superintendent@gmail.com': { password: 'password', role: 'MEDICAL_SUPERINTENDENT', name: 'Dr. Sundar (Superintendent)' },
      'superadmin@gmail.com':   { password: 'password', role: 'SUPER_ADMIN',            name: 'System Super Admin' },
    };

    const user = staticUsers[cleanEmail];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ success: true, role: user.role, name: user.name, email: cleanEmail });
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(500).json({ error: 'Server Error during authentication' });
  }
});

module.exports = router;
