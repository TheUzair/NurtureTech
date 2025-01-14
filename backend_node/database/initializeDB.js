const createTables = async (pool) => {
  const tableNames = [
    'user',
    'child',
    'caregiver',
    'attendance',
    'financial',
    'enrollment',
    'caregiver_child',
  ];

  for (const tableName of tableNames) {
    // Check if the table exists
    const { rows } = await pool.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = $1
      );`,
      [tableName]
    );

    // If the table doesn't exist, create it
    if (!rows[0].exists) {
      try {
        switch (tableName) {
          case 'user':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "user" (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
              );
            `);
            break;

          case 'child':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "child" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                age INT NOT NULL,
                status VARCHAR(20),
                year INT NOT NULL
              );
            `);
            break;

          case 'caregiver':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "caregiver" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                status VARCHAR(20) NOT NULL
              );
            `);
            break;

          case 'attendance':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "attendance" (
                id SERIAL PRIMARY KEY,
                child_id INT REFERENCES child(id),
                date DATE NOT NULL,
                status VARCHAR(20) NOT NULL
              );
            `);
            break;

          case 'financial':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "financial" (
                id SERIAL PRIMARY KEY,
                child_id INT NOT NULL REFERENCES child(id),
                amount NUMERIC(10, 2) NOT NULL,
                date TIMESTAMPTZ NOT NULL,
                description VARCHAR(255)
              );
            `);
            break;

          case 'enrollment':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "enrollment" (
                id SERIAL PRIMARY KEY,
                child_id INT NOT NULL REFERENCES child(id),
                date TIMESTAMPTZ NOT NULL,
                program VARCHAR(50) NOT NULL
              );
            `);
            break;

          case 'caregiver_child':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "caregiver_child" (
                caregiver_id INT REFERENCES caregiver(id),
                child_id INT REFERENCES child(id),
                PRIMARY KEY (caregiver_id, child_id)
              );
            `);
            break;

          default:
            break;
        }
        console.log(`Table '${tableName}' created successfully.`);
      } catch (error) {
        console.error(`Error creating table '${tableName}':`, error);
      }
    }
  }
};

export default createTables;