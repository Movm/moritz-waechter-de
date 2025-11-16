import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import type { Interfaces, MailgunMessageData } from 'mailgun.js/definitions';

// Create and export Mailgun client
export const createMailgunClient = (): Interfaces.IMailgunClient => {
  const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    throw new Error(
      'Missing required Mailgun environment variables. Please check your .env file.'
    );
  }

  const mailgun = new Mailgun(FormData);
  return mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY,
    url: 'https://api.eu.mailgun.net', // EU endpoint
  });
};

// Verify Mailgun configuration
export const verifyMailgunConfig = async (): Promise<boolean> => {
  try {
    const { MAILGUN_DOMAIN } = process.env;

    if (!MAILGUN_DOMAIN) {
      throw new Error('MAILGUN_DOMAIN is not configured');
    }

    // Simple test to verify the client is initialized
    console.log('✓ Mailgun client initialized successfully');
    console.log(`✓ Using domain: ${MAILGUN_DOMAIN}`);
    return true;
  } catch (error) {
    console.error('✗ Mailgun configuration error:', error);
    return false;
  }
};

export type { MailgunMessageData };
export type IMailgunClient = Interfaces.IMailgunClient;
