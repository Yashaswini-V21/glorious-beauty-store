const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ message: 'Phone number is required.' });
    return;
  }

  db.get(`SELECT * FROM users WHERE phone = ?`, [phone], (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Database error.' });
      return;
    }
    if (!user) {
      res.status(404).json({ message: 'No user found with this phone number.' });
      return;
    }
    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000;
    db.run(
      `INSERT OR REPLACE INTO otps (phone, otp, expires) VALUES (?, ?, ?)`,
      [phone, otp, expires],
      (err) => {
        if (err) {
          res.status(500).json({ message: 'Database error.' });
          return;
        }
        console.log("[DEMO] Forgot Password OTP for " + phone + " is: " + otp);
        res.status(200).json({
          message: 'OTP sent for password reset. Use this OTP to reset your password.',
          otp: otp
        });
      }
    );
  });
};
