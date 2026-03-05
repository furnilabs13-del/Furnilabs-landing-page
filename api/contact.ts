import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// ── Google Sheets config ─────────────────────────────────────────────────────
const SHEET_ID = '1svFVhgei6g16UDOQ2VLQrRc3VJtu9hzGpeNGFVgUD7Y';
const SHEET_NAME = 'Sheet1';

const SERVICE_ACCOUNT_EMAIL = 'landing-page@landing-page-488704.iam.gserviceaccount.com';
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCy3D3dX4u+Uulv\n3eFMmV5J23arj8nSE9TzzmJ3Nq4lpEXB1C9c8VVO09EqZaRMoyojwmAxxHfK3dZH\n887KEzZHG3hAi+ZU1ovA2sOOLVZUYd2P4n2GjnAzQZX+iU9EVif52eAF84MS0Hyu\nKi438MQ4BGcfkCRoStNUCU6q9FYid4/JgASrq8AZM4X2iVcjKDvaiiUbX7htpU1/\nhNi2j3PND5yMbxFUbSxIxfH052zPYeNaDqMb9CLEjP71u/KmlaTUNA5OzVeWnoyX\noz5xwbBSUULUvRzRnUYgRyWWzLDpEVGgOmYijUVlbF4ovKB31M9tLbME0uOzYCFR\nveMNwpW5AgMBAAECggEADAzbVKixJiqZHF6xJQtgrz5sV3jtppwMMPxexSwfjbzs\nb7eDVOJUBmZuLUpxiDHGfygDedrkHLx3KTwXeqUSdzY2MvgR9bWKLx02B2RN0IvS\n5PSkEx6R19wzdjWLS/33fcV0asY6FpiKC+Re3ok3uRPv3DAmicm/xOXHIWyqiHIT\neUCyiiahYyQ2qfg4mG/dbju0nhwDqERoh9CIMeUB6XL2VR4ZzbLJqRYsVopOsaic\ndCxsK1DH54ys7CJxYJoMBSYwuyFhkvOoLgBNUstt+kqJuX4ZQVgj6gfwHLRJ7U3I\nwhpAV9EY3lHxPvkPX0+qEEqK02h9+BK5cdwSclfrEQKBgQDsfQQQnS0/v5z9dcv9\nI6cr0UE/Rr9zumAE5ysv1in7ijBkdtrh7tvhHoQti2ZapqSAFhbi8M1NAqxh+Sxl\nD6tGtfSEp+7UjXaxpu2DyhRFesOa18vGrsaLSYNk8hJWFjkeNXFi9bz/v+AgjsAM\nq7gHVWO7lOYoevFFD2TdwK8wCQKBgQDBngla3qxU7Bh9jHcii9hbqD+myBolnyBV\nY2s4NnKR3mpuvy+56ds5rVfTUJ2MASME0LoMUzByYFR4yiBrtI/PwNiQ+ZATa8PT\ngn/rilUe9qEZnkmS32StTiq8r3W4tVXaS447XDcNHU6/9Uz3nbKsIpEiBMDiaR38\nTz9EdbhEMQKBgQC4mE0X+thbLmKIpe54xd+zoD9h+QNwfkZ9DUT0riNPKWrkwLHS\nMfSIIJ3kPy/CCtnU8Wkj8/sM5c1RHIK+0CBNrbIT6lHOsC26Nian/JEeOtl8gH2b\ntMld6CAcJ6iQcgBbyDOdn1vL9iYow8S9Hz0i3FBhF7UgW/cAhSeiwMj+oQKBgQCr\nWD6TKmh8JwxtXze3XOc2Bil+YauyC6bDql4iuxydNqYeKBgGgYy++Ea2/arPUdo5\n0rYzXhOLxPA8jTQv3PVAODvv4Mu+RCpjLiQiwKMf6cccMtaNoiEotfpgTS7zLZcy\nvpa6tZsKghtFCcL5h5etelHSNz6zn68nsMIexccyoQKBgH1S1imttAPgQUQntQSd\nasNJEX4nerKcDgYJIFpQCiRg5/TMYg/gQ9swlMSIQ63R8KFEUHrbA0fLSELH/ddV\nYVfNX/X1X+wR4OSyU3JAkLfmrZb7lB43kMIARJerVOo5JelKIJDkQ/8Uz2I8exgj\nWNKnbAHMNu3cVY+qVM/HoSOm\n-----END PRIVATE KEY-----\n";

// Helper to escape HTML characters
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

async function appendToSheet(rowData: (string | number)[]) {
  const auth = new google.auth.JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Read column A to find last serial number and next empty row
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:A`,
  });

  const rows = existing.data.values || [];

  let lastSerial = 0;
  for (let i = 1; i < rows.length; i++) {
    const val = parseInt(rows[i][0]);
    if (!isNaN(val) && val > lastSerial) lastSerial = val;
  }
  const serialNumber = lastSerial + 1;
  const nextRow = rows.length + 1; // 1-indexed row number in sheet

  // Write the row — the table's existing column dropdown handles validation
  const newRow = [serialNumber, ...rowData];
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A${nextRow}:H${nextRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [newRow] },
  });
}

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
    // ── 1. Send email ──────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

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
      `,
    });

    // ── 2. Append row to Google Sheet ──────────────────────────────────────
    // Columns: Serial | Name | Phone | Email | Store Name | Status | Reason | Revenue
    await appendToSheet([
      name,
      phone || '',
      email,
      '',               // Store Name — not collected in form
      'not converted',  // Status default — matches dropdown option exactly
      message,          // Reason from message
      '',               // Revenue — filled manually
    ]);

    res.status(200).json({ message: 'Email sent and sheet updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email or update sheet.' });
  }
}
