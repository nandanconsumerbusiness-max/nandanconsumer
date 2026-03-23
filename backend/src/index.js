import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// In-memory store (demo only)
const users = new Map();
const otpStore = new Map();

app.post('/api/register', (req, res) => {
  const { firstName, middleName, lastName, email, mobile, password, businessOwnerKnown } = req.body || {};

  if (!firstName || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (users.has(mobile)) {
    return res.status(409).json({ error: 'User already exists.' });
  }

  users.set(mobile, {
    firstName,
    middleName: middleName || '',
    lastName: lastName || '',
    email,
    mobile,
    password,
    businessOwnerKnown: businessOwnerKnown ?? null,
  });

  return res.json({ status: 'registered' });
});

app.post('/api/login', (req, res) => {
  const { mobile, password } = req.body || {};

  if (!mobile || !password) {
    return res.status(400).json({ error: 'Missing credentials.' });
  }

  const user = users.get(mobile);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid mobile or password.' });
  }

  return res.json({ status: 'ok', user: { firstName: user.firstName, mobile: user.mobile } });
});

app.post('/api/otp/request', (req, res) => {
  const { mobile } = req.body || {};
  if (!mobile) {
    return res.status(400).json({ error: 'Mobile number required.' });
  }
  if (!users.has(mobile)) {
    return res.status(404).json({ error: 'User not found.' });
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  return res.json({ status: 'otp_sent', otp });
});

app.post('/api/otp/reset', (req, res) => {
  const { mobile, otp, newPassword } = req.body || {};
  if (!mobile || !otp || !newPassword) {
    return res.status(400).json({ error: 'Missing fields.' });
  }
  const record = otpStore.get(mobile);
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }
  const user = users.get(mobile);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  user.password = newPassword;
  otpStore.delete(mobile);
  return res.json({ status: 'password_reset' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
