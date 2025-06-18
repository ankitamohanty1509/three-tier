const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
app.use(bodyParser.json());

app.get('/api/items', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM items');
  res.json(rows);
});

app.post('/api/items', async (req, res) => {
  const { text } = req.body;
  await db.execute('INSERT INTO items (text) VALUES (?)', [text]);
  res.sendStatus(200);
});

app.listen(5000, () => console.log('Backend listening on 5000'));
