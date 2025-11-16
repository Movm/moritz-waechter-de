import type { IMailgunClient } from '../config/email.js';
import type { EmailTemplateData, EmailRequest } from '../types/index.js';

// Generate email template HTML
const generateEmailHTML = (data: EmailTemplateData): string => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Nachricht von Website</title>
  <style>
    body {
      font-family: 'Open Sans', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #005538, #004429);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .content {
      padding: 30px;
    }
    .field {
      margin-bottom: 20px;
    }
    .field-label {
      font-weight: 700;
      color: #005538;
      font-size: 14px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .field-value {
      font-size: 16px;
      color: #333;
      background-color: #f9f9f9;
      padding: 12px;
      border-left: 4px solid #5F8575;
      border-radius: 4px;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 20px;
      border-left: 4px solid #5F8575;
      border-radius: 4px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      background-color: #f4f4f4;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      background-color: #5F8575;
      color: #ffffff;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Neue Nachricht von deiner Website</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Art der Anfrage</div>
        <div class="field-value">
          <span class="badge">${data.topicLabel}</span>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${data.name}</div>
      </div>

      <div class="field">
        <div class="field-label">E-Mail</div>
        <div class="field-value">
          <a href="mailto:${data.email}" style="color: #005538; text-decoration: none;">
            ${data.email}
          </a>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Nachricht</div>
        <div class="message-box">${data.message}</div>
      </div>

      <div class="field">
        <div class="field-label">Zeitstempel</div>
        <div class="field-value">${data.timestamp}</div>
      </div>
    </div>
    <div class="footer">
      Diese Nachricht wurde über das Kontaktformular auf moritz-waechter.de gesendet.
    </div>
  </div>
</body>
</html>
  `.trim();
};

// Generate plain text version of email
const generateEmailText = (data: EmailTemplateData): string => {
  return `
Neue Nachricht von deiner Website
${'='.repeat(50)}

Art der Anfrage: ${data.topicLabel}
Name: ${data.name}
E-Mail: ${data.email}

Nachricht:
${'-'.repeat(50)}
${data.message}
${'-'.repeat(50)}

Zeitstempel: ${data.timestamp}

---
Diese Nachricht wurde über das Kontaktformular auf moritz-waechter.de gesendet.
  `.trim();
};

// Send email using Mailgun
export const sendEmail = async (
  mailgunClient: IMailgunClient,
  emailData: EmailRequest
): Promise<string> => {
  const { EMAIL_FROM, EMAIL_TO, MAILGUN_DOMAIN } = process.env;

  if (!EMAIL_FROM || !EMAIL_TO || !MAILGUN_DOMAIN) {
    throw new Error('Email configuration environment variables are not set.');
  }

  // Prepare template data
  const templateData: EmailTemplateData = {
    topic: emailData.topic,
    topicLabel: emailData.topic === 'frage' ? 'Frage' : 'Webinar-Buchung',
    message: emailData.message,
    name: emailData.name,
    email: emailData.email,
    timestamp: new Date().toLocaleString('de-DE', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Europe/Berlin',
    }),
  };

  // Email subject
  const subject = `${templateData.topicLabel} von ${emailData.name}`;

  // Send email via Mailgun
  const response = await mailgunClient.messages.create(MAILGUN_DOMAIN, {
    from: EMAIL_FROM,
    to: [EMAIL_TO],
    'h:Reply-To': emailData.email,
    subject,
    text: generateEmailText(templateData),
    html: generateEmailHTML(templateData),
  });

  if (!response.id) {
    throw new Error('Failed to send email: No message ID returned');
  }

  return response.id;
};
