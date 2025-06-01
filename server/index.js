import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize SQLite database
let db;
const initializeDb = async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone_number TEXT UNIQUE NOT NULL,
      notification_threshold REAL NOT NULL,
      subscribed BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

initializeDb().catch(console.error);

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { phoneNumber, notificationThreshold } = req.body;

    if (!phoneNumber || !notificationThreshold) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Add subscriber to database
    await db.run(
      'INSERT OR REPLACE INTO subscribers (phone_number, notification_threshold) VALUES (?, ?)',
      [phoneNumber, notificationThreshold]
    );

    // Send welcome message
    const welcomeMessage = `Welcome to GBP Tracker! 🎉\n\nYou'll receive notifications when GBP/USD reaches ${notificationThreshold}.\n\nCurrent rate: ${notificationThreshold}\n\nYou can unsubscribe at any time by visiting our website.`;
    
    await twilioClient.messages.create({
      body: welcomeMessage,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to subscribe user:', error);
    res.status(500).json({ error: 'Failed to subscribe user' });
  }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Missing phone number' });
    }

    await db.run(
      'UPDATE subscribers SET subscribed = false WHERE phone_number = ?',
      [phoneNumber]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to unsubscribe user:', error);
    res.status(500).json({ error: 'Failed to unsubscribe user' });
  }
});

// Get all subscribers
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await db.all('SELECT * FROM subscribers WHERE subscribed = true');
    res.json(subscribers);
  } catch (error) {
    console.error('Failed to fetch subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// WhatsApp notification endpoint
app.post('/api/notifications/whatsapp', async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Send message using Twilio
    const notification = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });

    res.json({ success: true, messageId: notification.sid });
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});