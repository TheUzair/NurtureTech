import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import createTables from '../database/initializeDB.js';

const envPath = process.env.NODE_ENV === 'production' ? './.env.production' : './.env';
dotenv.config({ path: envPath });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const initializeDB = async () => {
  try {
    await createTables(pool);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

initializeDB();

export default pool;
