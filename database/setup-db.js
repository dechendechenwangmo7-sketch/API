
require('dotenv').config();
const pool = require('./src/db');

async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM tasks');

    if (rows[0].total === 0) {
      await pool.query(`
        INSERT INTO tasks (title, completed) VALUES
        ('Set up the Node.js project', FALSE),
        ('Install Express and mysql2', TRUE),
        ('Create the database schema', TRUE),
        ('Build the GET /tasks route', FALSE),
        ('Build the POST /tasks route', FALSE),
        ('Test all endpoints in Postman', FALSE)
      `);
    }

    console.log('Database setup successful!');

    const [tasks] = await pool.query('SELECT * FROM tasks');
    console.table(tasks);
  } catch (error) {
    console.error('Database setup failed:', error.message);
  } finally {
    await pool.end();
  }
}

setupDatabase();
