const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'care_alert_db',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
});

const initDB = async () => {
  try {
    const client = await pool.connect();

    // 1. Core Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        phone VARCHAR(50),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Hospitals Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS hospitals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) UNIQUE NOT NULL,
        address TEXT,
        contact_phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Departments Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Staff Profiles Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS staff_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        hospital_id INTEGER REFERENCES hospitals(id),
        department_id INTEGER REFERENCES departments(id),
        staff_code VARCHAR(100) UNIQUE NOT NULL,
        designation VARCHAR(100),
        on_duty BOOLEAN DEFAULT TRUE,
        duty_status VARCHAR(50) DEFAULT 'ON_DUTY',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. SOS Alerts Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sos_alerts (
        id SERIAL PRIMARY KEY,
        sos_code VARCHAR(100) UNIQUE NOT NULL,
        staff_id VARCHAR(100),
        emergency_type VARCHAR(100) NOT NULL,
        building VARCHAR(100),
        floor VARCHAR(50),
        room VARCHAR(100),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        status VARCHAR(50) DEFAULT 'NEW',
        assigned_security_id INTEGER REFERENCES users(id),
        acknowledged_at TIMESTAMP,
        responding_at TIMESTAMP,
        arrived_at TIMESTAMP,
        resolved_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Incidents Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        sos_id INTEGER REFERENCES sos_alerts(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(50) DEFAULT 'HIGH',
        status VARCHAR(50) DEFAULT 'ACTIVE',
        assigned_to INTEGER REFERENCES users(id),
        resolution_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP
      )
    `);

    // 7. Broadcasts Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS broadcasts (
        id SERIAL PRIMARY KEY,
        broadcast_code VARCHAR(100) UNIQUE NOT NULL,
        sender_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        priority VARCHAR(50) DEFAULT 'NORMAL',
        audience VARCHAR(100) DEFAULT 'ALL',
        channels VARCHAR(255) DEFAULT 'PUSH',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 8. Device Tokens Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS device_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        fcm_token TEXT NOT NULL,
        platform VARCHAR(50) DEFAULT 'FLUTTER',
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 9. Legacy Care Alerts Table (backward compatibility)
    await client.query(`
      CREATE TABLE IF NOT EXISTS care_alerts (
        id SERIAL PRIMARY KEY,
        staff_id VARCHAR(100),
        emergency_type VARCHAR(100) NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP
      )
    `);

    // 10. Seed Initial Users if Table Empty
    const userCheck = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO users (email, password_hash, full_name, role, phone) VALUES
        ('doctor@gmail.com', 'password', 'Dr. Madhan', 'DOCTOR', '+91 9876543210'),
        ('nurse@gmail.com', 'password', 'Nurse Priya', 'NURSE', '+91 9876543211'),
        ('security@gmail.com', 'password', 'Security Officer Rahul', 'SECURITY_STAFF', '+91 9876543212'),
        ('supervisor@gmail.com', 'password', 'Supervisor Chief Kumar', 'SECURITY_SUPERVISOR', '+91 9876543213'),
        ('hod@gmail.com', 'password', 'Dr. Anitha (HOD ER)', 'DEPARTMENT_HEAD', '+91 9876543214'),
        ('admin@gmail.com', 'password', 'Admin Rajesh', 'HOSPITAL_ADMIN', '+91 9876543215'),
        ('superintendent@gmail.com', 'password', 'Dr. Sundar', 'MEDICAL_SUPERINTENDENT', '+91 9876543216'),
        ('superadmin@gmail.com', 'password', 'System Super Admin', 'SUPER_ADMIN', '+91 9876543217')
      `);
      console.log('CARE ALERT: Seeded initial users into PostgreSQL database');
    }

    console.log('CARE ALERT: Complete PostgreSQL Database Schema Initialized');
    client.release();
  } catch (err) {
    console.error('CARE ALERT: Database initialization error:', err.message);
  }
};

initDB();

module.exports = pool;
