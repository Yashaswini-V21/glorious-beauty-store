const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

module.exports = function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { phone, otp, newPassword } = req.body;
  if (!phone || !otp || !newPassword) {
    res.status(400).json({ message: 'Phone, OTP, and new password are required.' });
    return;
  }

  db.get(`SELECT otp, expires FROM otps WHERE phone = ?`, [phone], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Database error.' });
      return;
    }
    if (!row) {
      res.status(400).json({ message: 'OTP not requested for this number.' });
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
    db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ message: 'Error hashing password.' });
        return;
      }
      db.run(`UPDATE users SET password = ? WHERE phone = ?`, [hash, phone], (err) => {
        if (err) {
          res.status(500).json({ message: 'Database error.' });
          return;
        }
        res.status(200).json({ message: 'Password has been reset successfully.' });
      });
    });
  });
};
