const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g., your-rds-endpoint.rds.amazonaws.com
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit();
  } else {
    console.log('Connected to MySQL RDS');
  }
});

// Create table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    hobbies TEXT
  )
`);

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, hobbies } = req.body;
  db.query('INSERT INTO users (name, hobbies) VALUES (?, ?)', [name, hobbies], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User added' });
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
