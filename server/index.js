import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import initSqlJs from 'sql.js';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

let db;

const initializeDb = async () => {
  const SQL = await initSqlJs();

  // Optional: Load from disk if you want persistence
  // const filebuffer = fs.existsSync('./mock.sqlite') ? fs.readFileSync('./mock.sqlite') : null;
  db = new SQL.Database(); // or new SQL.Database(filebuffer);

  db.run(`
    CREATE TABLE IF NOT EXISTS subscribers (
      phone_number TEXT PRIMARY KEY,
      notification_threshold REAL NOT NULL,
      subscribed INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
};

await initializeDb();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/subscribe', (req, res) => {
  try {
    const { phoneNumber, notificationThreshold } = req.body;

    if (!phoneNumber || !notificationThreshold) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    db.run(
      `INSERT OR REPLACE INTO subscribers (phone_number, notification_threshold, subscribed, created_at)
       VALUES (?, ?, 1, datetime('now'))`,
      [phoneNumber, notificationThreshold]
    );

    const welcomeMessage = `Welcome to GBP Tracker! 🎉\n\nYou'll receive notifications when GBP/USD reaches ${notificationThreshold}.\n\nYou can unsubscribe at any time by visiting our website.`;

    twilioClient.messages
      .create({
        body: welcomeMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phoneNumber}`
      })
      .then(() => res.json({ success: true }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to send WhatsApp message' });
      });
  } catch (err) {
    console.error('Subscribe Error:', err);
    res.status(500).json({ error: 'Failed to subscribe user' });
  }
});

app.post('/api/unsubscribe', (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Missing phone number' });
    }

    db.run(`UPDATE subscribers SET subscribed = 0 WHERE phone_number = ?`, [phoneNumber]);

    res.json({ success: true });
  } catch (err) {
    console.error('Unsubscribe Error:', err);
    res.status(500).json({ error: 'Failed to unsubscribe user' });
  }
});

app.get('/api/subscribers', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM subscribers WHERE subscribed = 1`);
    const results = [];

    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }

    res.json(results);
  } catch (err) {
    console.error('Fetch Subscribers Error:', err);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

app.post('/api/notifications/whatsapp', (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    twilioClient.messages
      .create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${to}`
      })
      .then(notification => {
        res.json({ success: true, messageId: notification.sid });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to send notification' });
      });
  } catch (err) {
    console.error('Notification Error:', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
