const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // This now matches your .env file!
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false // Aiven requires this
  }
});

const promisePool = pool.promise();

promisePool.query('SELECT 1')
  .then(() => console.log('✅ Connected to MySQL Database Successfully!'))
  .catch((err) => console.error('❌ Database connection failed:', err.message));

module.exports = promisePool;