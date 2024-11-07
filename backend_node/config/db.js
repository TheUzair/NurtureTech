import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import createTables from '../database/initializeDB.js';

dotenv.config({ path: './.env' });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Initialize the database and create tables
const initializeDB = async () => {
  try {
    await createTables(pool); // Pass the pool to the createTables function
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Immediately invoke the initializeDB function
initializeDB();

export default pool;
