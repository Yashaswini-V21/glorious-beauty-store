const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to SQLite database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

// Create tables if not exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS otps (
        phone TEXT PRIMARY KEY,
        otp TEXT NOT NULL,
        expires INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        user_agent TEXT NOT NULL,
        visited_at INTEGER NOT NULL
    )`);
});

// Visitor logging middleware
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const visitedAt = Date.now();

    db.run(
        `INSERT INTO visitors (ip, user_agent, visited_at) VALUES (?, ?, ?)`,
        [ip, userAgent, visitedAt],
        (err) => {
            if (err) {
                console.error('Failed to log visitor:', err);
            }
        }
    );
    next();
});

// API endpoint to get visitor logs
app.get('/api/visitors', (req, res) => {
    db.all(`SELECT ip, user_agent, visited_at FROM visitors ORDER BY visited_at DESC LIMIT 100`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        res.json({ visitors: rows });
    });
});

// API endpoint to get registered users
app.get('/api/users', (req, res) => {
    db.all(`SELECT id, name, email, phone FROM users ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        res.json({ users: rows });
    });
});

// Helper function to generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// API to send OTP for signup/login
app.post('/api/send-otp', (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ message: 'Phone number is required.' });
    }
    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    db.run(
        `INSERT OR REPLACE INTO otps (phone, otp, expires) VALUES (?, ?, ?)`,
        [phone, otp, expires],
        (err) => {
            if (err) {
                console.error('Error inserting OTP:', err);
                return res.status(500).json({ message: 'Database error.' });
            }
            console.log(`[DEMO] OTP for ${phone} is: ${otp}`);
            res.status(200).json({
                message: 'OTP generated successfully. Use this OTP to verify.',
                otp
            });
        }
    );
});

// API to register user with OTP verification
app.post('/api/register', (req, res) => {
    const { name, email, phone, password, otp } = req.body;
    if (!name || !email || !phone || !password || !otp) {
        return res.status(400).json({ message: 'All fields including OTP are required.' });
    }

    db.get(`SELECT otp, expires FROM otps WHERE phone = ?`, [phone], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (!row) {
            return res.status(400).json({ message: 'OTP not requested for this phone number.' });
        }
        if (row.expires < Date.now()) {
            db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        if (row.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // OTP valid, delete it
        db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);

        // Hash password and insert user
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password.' });
            }
            db.run(
                `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`,
                [name, email, phone, hash],
                function (err) {
                    if (err) {
                        if (err.message.includes('UNIQUE constraint failed: users.email')) {
                            return res.status(400).json({ message: 'Email already exists.' });
                        }
                        return res.status(500).json({ message: 'Database error.' });
                    }
                    // Generate JWT token
                    const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '1h' });
                    res.status(201).json({ token });
                }
            );
        });
    });
});

// API to login user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords.' });
            }
            if (!result) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

// API to send OTP for forgot password
app.post('/api/forgot-password/send-otp', (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ message: 'Phone number is required.' });
    }
    db.get(`SELECT * FROM users WHERE phone = ?`, [phone], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (!user) {
            return res.status(404).json({ message: 'No user found with this phone number.' });
        }
        const otp = generateOTP();
        const expires = Date.now() + 5 * 60 * 1000;
        db.run(
            `INSERT OR REPLACE INTO otps (phone, otp, expires) VALUES (?, ?, ?)`,
            [phone, otp, expires],
            (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error.' });
                }
                console.log(`[DEMO] Forgot Password OTP for ${phone} is: ${otp}`);
                res.status(200).json({
                    message: 'OTP sent for password reset. Use this OTP to reset your password.',
                    otp
                });
            }
        );
    });
});

// API to reset password with OTP
app.post('/api/forgot-password/reset', (req, res) => {
    const { phone, otp, newPassword } = req.body;
    if (!phone || !otp || !newPassword) {
        return res.status(400).json({ message: 'Phone, OTP, and new password are required.' });
    }
    db.get(`SELECT otp, expires FROM otps WHERE phone = ?`, [phone], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (!row) {
            return res.status(400).json({ message: 'OTP not requested for this number.' });
        }
        if (row.expires < Date.now()) {
            db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        if (row.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        db.run(`DELETE FROM otps WHERE phone = ?`, [phone]);
        bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password.' });
            }
            db.run(`UPDATE users SET password = ? WHERE phone = ?`, [hash, phone], (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error.' });
                }
                res.status(200).json({ message: 'Password has been reset successfully.' });
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API server is running on http://localhost:${PORT}`);
});

// Global error handler for JSON errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'A server error occurred' });
});

// Export the app for Vercel
module.exports = app;
