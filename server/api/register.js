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

  const { name, email, phone, password, otp } = req.body;
  if (!name || !email || !phone || !password || !otp) {
    res.status(400).json({ message: 'All fields including OTP are required.' });
    return;
  }

  db.get(`SELECT otp, expires FROM otps WHERE phone = ?`, [phone], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Database error.' });
      return;
    }
    if (!row) {
      res.status(400).json({ message: 'OTP not requested for this phone number.' });
      return;
    }
    if (row.expires < Date.now()) {
      db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);
      res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
      return;
    }
    if (row.otp !== otp) {
      res.status(400).json({ message: 'Invalid OTP.' });
      return;
    }

    // OTP valid, delete it
    db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);

    // Hash password and insert user
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ message: 'Error hashing password.' });
        return;
      }
      db.run(
        `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`,
        [name, email, phone, hash],
        function (err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed: users.email')) {
              res.status(400).json({ message: 'Email already exists.' });
              return;
            }
            res.status(500).json({ message: 'Database error.' });
            return;
          }
          // Generate JWT token
          const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({ token });
        }
      );
    });
  });
};
