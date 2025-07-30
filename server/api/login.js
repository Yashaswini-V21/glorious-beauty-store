const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

module.exports = function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Database error.' });
      return;
    }
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials.' });
      return;
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error comparing passwords.' });
        return;
      }
      if (!result) {
        res.status(400).json({ message: 'Invalid credentials.' });
        return;
      }
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};
