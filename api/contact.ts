import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Helper to escape HTML characters
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const EMAIL_USER = 'mithudon7048@gmail.com';
  const EMAIL_PASS = 'jkfe ydzx lnnb btct';

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : 'Not provided';
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    // Hardcoded recipients
    const recipients = 'shivtayal80@gmail.com, furnilabs13@gmail.com, parvjindal4@gmail.com';

    await transporter.sendMail({
      from: EMAIL_USER,
      to: recipients,
      subject: `SALES ENQUIRY`,
      text: `Name: ${name}\nPhone: ${phone || 'N/A'}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h3>SALES ENQUIRY</h3>
        <p><strong>Name :</strong> ${safeName}</p>
        <p><strong>Phone Number :</strong> ${safePhone}</p>
        <p><strong>Email :</strong> ${safeEmail}</p>
        <br/>
        <p><strong>Message :</strong></p>
        <p>${safeMessage}</p>
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
}
