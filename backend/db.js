const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
});

const initDB = async () => {
  try {
    const client = await pool.connect();

    // SOS Alerts table
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

    // Drug Shortage Reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS drug_shortage_reports (
        id SERIAL PRIMARY KEY,
        staff_id VARCHAR(100),
        item_name VARCHAR(200),
        category VARCHAR(100),
        current_stock VARCHAR(100),
        required_quantity VARCHAR(100),
        urgency VARCHAR(20),
        notes TEXT,
        status VARCHAR(20) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Blood Request Reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blood_request_reports (
        id SERIAL PRIMARY KEY,
        staff_id VARCHAR(100),
        blood_group VARCHAR(50),
        component VARCHAR(100),
        units_required VARCHAR(100),
        urgency VARCHAR(20),
        notes TEXT,
        status VARCHAR(20) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Equipment Fault Reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS equipment_fault_reports (
        id SERIAL PRIMARY KEY,
        staff_id VARCHAR(100),
        category VARCHAR(100),
        equipment_name VARCHAR(200),
        asset_id VARCHAR(100),
        location VARCHAR(200),
        ward VARCHAR(100),
        fault_type VARCHAR(100),
        safety_impact VARCHAR(100),
        description TEXT,
        is_in_use BOOLEAN DEFAULT FALSE,
        priority VARCHAR(20),
        status VARCHAR(20) DEFAULT 'REPORTED',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Facility Hazard Reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS facility_hazard_reports (
        id SERIAL PRIMARY KEY,
        staff_id VARCHAR(100),
        category VARCHAR(100),
        description TEXT,
        building VARCHAR(100),
        block VARCHAR(100),
        floor VARCHAR(50),
        room VARCHAR(100),
        people_at_risk VARCHAR(100),
        immediate_danger BOOLEAN DEFAULT FALSE,
        affected_service VARCHAR(100),
        affected_count INTEGER,
        immediate_action VARCHAR(200),
        priority VARCHAR(20),
        status VARCHAR(20) DEFAULT 'REPORTED',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('CARE ALERT: PostgreSQL Database initialized successfully');
    client.release();
  } catch (err) {
    console.error('CARE ALERT: Error initializing PostgreSQL Database', err);
  }
};

initDB();

module.exports = pool;
