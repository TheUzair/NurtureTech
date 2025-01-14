import pkg from 'pg';
import dotenv from 'dotenv';
import createTables from '../database/initializeDB.js';

const envPath = process.env.NODE_ENV === 'production' ? './.env.production' : './.env';
dotenv.config({ path: envPath });

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Add connection status check
pool.on('connect', () => {
  const environment = process.env.NODE_ENV === 'production' ? 'Cloud' : 'Local';
  const host = process.env.DB_HOST || 'localhost';

  console.log(`✅ Connected to PostgreSQL (Environment: ${environment})`);
  console.log(`📍 Host: ${host}`);
  console.log(`🗄️ Database: ${process.env.DB_NAME}`);
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

const initializeDB = async () => {
  try {
    await createTables(pool);
    console.log('🚀 Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
};

initializeDB();

export default pool;