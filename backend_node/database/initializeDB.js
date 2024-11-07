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
    const [rows] = await pool.query(
      `SELECT * FROM information_schema.tables WHERE table_name = ?`,
      [tableName]
    );

    // If the table doesn't exist, create it
    if (rows.length === 0) {
      try {
        switch (tableName) {
          case 'user':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
              );
            `);
            break;

          case 'child':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS child (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                age INT NOT NULL,
                status VARCHAR(20),
                year INT NOT NULL
              );
            `);
            break;

          case 'caregiver':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS caregiver (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                status VARCHAR(20) NOT NULL
              );
            `);
            break;

          case 'attendance':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                child_id INT,
                date DATE NOT NULL,
                status VARCHAR(20) NOT NULL,
                FOREIGN KEY (child_id) REFERENCES child(id)
              );
            `);
            break;

          case 'financial':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS financial (
                id INT AUTO_INCREMENT PRIMARY KEY,
                child_id INT NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                date DATETIME NOT NULL,
                description VARCHAR(255),
                FOREIGN KEY (child_id) REFERENCES child(id)
              );
            `);
            break;

          case 'enrollment':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS enrollment (
                id INT AUTO_INCREMENT PRIMARY KEY,
                child_id INT NOT NULL,
                date DATETIME NOT NULL,
                program VARCHAR(50) NOT NULL,
                FOREIGN KEY (child_id) REFERENCES child(id)
              );
            `);
            break;

          case 'caregiver_child':
            await pool.query(`
              CREATE TABLE IF NOT EXISTS caregiver_child (
                caregiver_id INT,
                child_id INT,
                PRIMARY KEY (caregiver_id, child_id),
                FOREIGN KEY (caregiver_id) REFERENCES caregiver(id),
                FOREIGN KEY (child_id) REFERENCES child(id)
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
    //  to suppress the "already exists" message
    // else {
    //   console.log(`Table '${tableName}' already exists.`);
    // }
  }
};

export default createTables