const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'express_mysql'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.get('/', (req, res) => {
  return res.json('the backend side!');
});

// Get all users
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, userId, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(data[0]);
  });
});

// Create a user
app.post('/users', (req, res) => {
  const { nom, prenom, adresse } = req.body;
  const newUser = { nom, prenom, adresse };

  const sql = "INSERT INTO users SET ?";
  db.query(sql, newUser, (err, result) => {
    if (err) return res.json(err);
    newUser.id = result.insertId;
    return res.json(newUser);
  });
});

// Update a user by ID
app.patch('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { nom, prenom, adresse } = req.body;
  const updatedUser = { nom, prenom, adresse };

  const sql = "UPDATE users SET ? WHERE id = ?";
  db.query(sql, [updatedUser, userId], (err, result) => {
    if (err) return res.json(err);
    // Check if the user was found and updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User updated successfully" });
  });
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, userId, (err, result) => {
    if (err) return res.json(err);
    // Check if the user was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  });
});

app.listen(3001, () => {
  console.log('Server works!!');
});