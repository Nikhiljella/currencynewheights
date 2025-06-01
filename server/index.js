import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
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