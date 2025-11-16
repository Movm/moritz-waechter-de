import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the api directory's .env file
config({ path: resolve(__dirname, '../.env') });

import { createMailgunClient } from './config/email.js';
import { sendEmail } from './services/emailService.js';
import type { EmailRequest } from './types/index.js';

const testEmailSending = async () => {
  console.log('🧪 Testing Mailgun Email Integration\n');
  console.log('═══════════════════════════════════════════════════════════════');

  try {
    // Create Mailgun client
    console.log('📧 Creating Mailgun client...');
    const mailgunClient = createMailgunClient();
    console.log('✓ Mailgun client created successfully\n');

    // Prepare test email data
    const testEmailData: EmailRequest = {
      topic: 'frage',
      name: 'Test User',
      email: 'test@example.com',
      message: 'Dies ist eine Testnachricht, um die Mailgun-Integration zu überprüfen.',
    };

    console.log('📤 Sending test email with the following data:');
    console.log(`   Topic: ${testEmailData.topic}`);
    console.log(`   Name: ${testEmailData.name}`);
    console.log(`   Email: ${testEmailData.email}`);
    console.log(`   Message: ${testEmailData.message}\n`);

    // Send email
    console.log('⏳ Sending email via Mailgun...');
    const messageId = await sendEmail(mailgunClient, testEmailData);

    console.log('\n✅ SUCCESS! Email sent successfully!');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`Message ID: ${messageId}`);
    console.log(`\nCheck your inbox at: ${process.env.EMAIL_TO}`);
    console.log('═══════════════════════════════════════════════════════════════\n');
  } catch (error) {
    console.error('\n❌ ERROR: Email sending failed!');
    console.error('═══════════════════════════════════════════════════════════════');

    if (error instanceof Error) {
      console.error(`Error Message: ${error.message}`);
      if (error.stack) {
        console.error(`\nStack Trace:\n${error.stack}`);
      }
    } else {
      console.error('Unknown error:', error);
    }

    console.error('═══════════════════════════════════════════════════════════════\n');
    process.exit(1);
  }
};

// Run the test
testEmailSending();
