import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the reverse proxy (required for Cloud Run / Nginx)
  app.set('trust proxy', 1);

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for development/preview compatibility if needed, or configure strictly
  }));

  // Rate limiter: Allow 5 requests per hour per IP
  const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 5, // Limit each IP to 5 requests per `window` (here, per hour)
    message: { error: 'Too many requests from this IP, please try again after an hour' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Parse JSON bodies
  app.use(express.json());

  // API Routes
  app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for missing credentials before attempting to send
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration error: EMAIL_USER or EMAIL_PASS is missing.');
      return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
    }

    // Helper to escape HTML characters
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : 'Not provided';
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    try {
      // Configure transporter with environment variables
      // For Gmail, you might need an App Password if 2FA is enabled
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS  // Your email password or App Password
        }
      });

      // Get recipients from environment variable or default to the list
      const recipients = process.env.RECIPIENT_EMAILS || 'shivtayal80@gmail.com, furnilabs13@gmail.com, parvjindal4@gmail.com';
      console.log(`Attempting to send email to: ${recipients}`);

      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: recipients,               // Multiple receivers (comma-separated)
        subject: `SALES ENQUIRY`,
        text: `
Name : ${name}
Phone Number : ${phone || 'Not provided'}
Email : ${email}

Message : ${message}
        `,
        html: `
<h3>SALES ENQUIRY</h3>
<p><strong>Name :</strong> ${safeName}</p>
<p><strong>Phone Number :</strong> ${safePhone}</p>
<p><strong>Email :</strong> ${safeEmail}</p>
<br/>
<p><strong>Message :</strong></p>
<p>${safeMessage}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if needed later)
    // app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
