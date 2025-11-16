import type { Transporter } from 'nodemailer';

// Error categories for better diagnostics
export enum EmailErrorType {
  CONNECTION = 'CONNECTION',
  AUTHENTICATION = 'AUTHENTICATION',
  SENDER_VERIFICATION = 'SENDER_VERIFICATION',
  RATE_LIMIT = 'RATE_LIMIT',
  CONFIGURATION = 'CONFIGURATION',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}

export interface EmailDiagnosticResult {
  success: boolean;
  errorType?: EmailErrorType;
  errorCode?: string;
  errorMessage?: string;
  suggestion?: string;
  details?: Record<string, string>;
}

// Validate SMTP configuration before attempting connection
export const validateSmtpConfig = (): EmailDiagnosticResult => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  // Check required variables
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return {
      success: false,
      errorType: EmailErrorType.CONFIGURATION,
      errorMessage: 'Missing required SMTP environment variables',
      suggestion:
        'Check your .env file and ensure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are set',
      details: {
        SMTP_HOST: SMTP_HOST ? '✓' : '✗ Missing',
        SMTP_PORT: SMTP_PORT ? '✓' : '✗ Missing',
        SMTP_USER: SMTP_USER ? '✓' : '✗ Missing',
        SMTP_PASS: SMTP_PASS ? '✓' : '✗ Missing',
        SMTP_FROM: SMTP_FROM ? '✓' : '(Optional)',
      },
    };
  }

  // Validate port number
  const port = parseInt(SMTP_PORT, 10);
  const validPorts = [25, 465, 587, 2525];
  if (isNaN(port) || !validPorts.includes(port)) {
    return {
      success: false,
      errorType: EmailErrorType.CONFIGURATION,
      errorMessage: `Invalid SMTP port: ${SMTP_PORT}`,
      suggestion: `Use a standard SMTP port (25, 465, 587, or 2525). For Brevo, use 587.`,
      details: {
        'Current port': SMTP_PORT,
        'Valid ports': validPorts.join(', '),
      },
    };
  }

  // Validate email format for SMTP_USER and SMTP_FROM
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(SMTP_USER)) {
    return {
      success: false,
      errorType: EmailErrorType.CONFIGURATION,
      errorMessage: `Invalid email format for SMTP_USER: ${SMTP_USER}`,
      suggestion: 'SMTP_USER must be a valid email address',
      details: {
        SMTP_USER,
      },
    };
  }

  if (SMTP_FROM && !emailRegex.test(SMTP_FROM)) {
    return {
      success: false,
      errorType: EmailErrorType.CONFIGURATION,
      errorMessage: `Invalid email format for SMTP_FROM: ${SMTP_FROM}`,
      suggestion: 'SMTP_FROM must be a valid email address',
      details: {
        SMTP_FROM,
      },
    };
  }

  // Brevo-specific validation
  if (SMTP_HOST.includes('brevo.com') || SMTP_HOST.includes('sendinblue.com')) {
    if (!SMTP_PASS.startsWith('xsmtpsib-') && !SMTP_PASS.startsWith('smtk_')) {
      return {
        success: false,
        errorType: EmailErrorType.CONFIGURATION,
        errorMessage: 'SMTP_PASS does not match Brevo API key format',
        suggestion:
          'For Brevo, SMTP_PASS should be your SMTP key starting with "xsmtpsib-" or "smtk_". Get it from Brevo dashboard: Settings > SMTP & API',
        details: {
          'Key format': SMTP_PASS.substring(0, 10) + '...',
          'Expected prefix': 'xsmtpsib-... or smtk_...',
        },
      };
    }
  }

  return {
    success: true,
  };
};

// Parse nodemailer error and categorize it
export const parseEmailError = (error: unknown): EmailDiagnosticResult => {
  if (!error || typeof error !== 'object') {
    return {
      success: false,
      errorType: EmailErrorType.UNKNOWN,
      errorMessage: String(error),
    };
  }

  const err = error as any;
  const errorCode = err.code || err.responseCode?.toString() || '';
  const errorMessage = err.message || err.response || '';

  // Connection errors
  if (
    errorCode === 'ETIMEDOUT' ||
    errorCode === 'ECONNREFUSED' ||
    errorCode === 'ENOTFOUND' ||
    errorCode === 'ECONNRESET'
  ) {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;

    return {
      success: false,
      errorType: EmailErrorType.CONNECTION,
      errorCode,
      errorMessage: `Cannot connect to SMTP server: ${errorMessage}`,
      suggestion: `Check network connectivity, firewall rules, and verify SMTP server is accessible. Test with: curl -v telnet://${host}:${port}`,
      details: {
        Host: host || 'Not set',
        Port: port || 'Not set',
        'Error code': errorCode,
      },
    };
  }

  // Authentication errors
  if (
    errorCode === 'EAUTH' ||
    errorMessage.includes('authentication') ||
    errorMessage.includes('535') ||
    errorMessage.includes('Username and Password not accepted')
  ) {
    const user = process.env.SMTP_USER;
    const isBrevo =
      process.env.SMTP_HOST?.includes('brevo.com') ||
      process.env.SMTP_HOST?.includes('sendinblue.com');

    return {
      success: false,
      errorType: EmailErrorType.AUTHENTICATION,
      errorCode: errorCode || '535',
      errorMessage: `SMTP authentication failed for ${user}`,
      suggestion: isBrevo
        ? 'Brevo authentication failed. Check:\n' +
          '  1. SMTP_USER is correct (usually your Brevo account email)\n' +
          '  2. SMTP_PASS is your SMTP key from Brevo dashboard (Settings > SMTP & API)\n' +
          '  3. SMTP is enabled for your Brevo account\n' +
          '  4. Your Brevo account is not suspended'
        : 'Check SMTP_USER and SMTP_PASS credentials are correct',
      details: {
        'SMTP User': user || 'Not set',
        'API Key format': process.env.SMTP_PASS
          ? process.env.SMTP_PASS.substring(0, 10) + '...'
          : 'Not set',
        Provider: isBrevo ? 'Brevo (Sendinblue)' : 'Generic SMTP',
      },
    };
  }

  // Sender verification errors
  if (
    errorMessage.includes('550') ||
    errorMessage.includes('sender') ||
    errorMessage.includes('not verified') ||
    errorMessage.includes('not authorized')
  ) {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    return {
      success: false,
      errorType: EmailErrorType.SENDER_VERIFICATION,
      errorCode: errorCode || '550',
      errorMessage: `Sender email not verified: ${from}`,
      suggestion:
        'Verify the sender email in your email service provider:\n' +
        '  • For Brevo: Go to Senders > Add a sender and complete verification\n' +
        '  • Ensure SMTP_FROM exactly matches the verified email address',
      details: {
        'Sender email': from || 'Not set',
        'SMTP_FROM': process.env.SMTP_FROM || '(Using SMTP_USER)',
      },
    };
  }

  // Rate limit errors
  if (
    errorMessage.includes('rate limit') ||
    errorMessage.includes('quota') ||
    errorMessage.includes('too many')
  ) {
    return {
      success: false,
      errorType: EmailErrorType.RATE_LIMIT,
      errorCode,
      errorMessage: 'Email rate limit exceeded',
      suggestion:
        'You have exceeded your email sending limit. Wait for the limit to reset or upgrade your plan.',
      details: {
        'Error message': errorMessage,
      },
    };
  }

  // Timeout errors
  if (errorCode === 'ETIMEDOUT' || errorMessage.includes('timeout')) {
    return {
      success: false,
      errorType: EmailErrorType.TIMEOUT,
      errorCode,
      errorMessage: 'SMTP connection timeout',
      suggestion: 'Connection timed out. Check network connectivity and firewall settings.',
    };
  }

  // Unknown error
  return {
    success: false,
    errorType: EmailErrorType.UNKNOWN,
    errorCode,
    errorMessage: errorMessage || 'Unknown email error',
    suggestion: 'Review the error message for more details',
    details: {
      'Full error': String(error),
    },
  };
};

// Format diagnostic result for console logging
export const formatDiagnosticLog = (result: EmailDiagnosticResult): string => {
  if (result.success) {
    return '✓ Email configuration validated successfully';
  }

  const lines: string[] = [
    '',
    '═══════════════════════════════════════════════════════════════',
    `✗ Email Configuration Error [${result.errorType}]`,
    '═══════════════════════════════════════════════════════════════',
  ];

  if (result.errorCode) {
    lines.push(`Error Code: ${result.errorCode}`);
  }

  if (result.errorMessage) {
    lines.push(`Message: ${result.errorMessage}`);
  }

  if (result.details) {
    lines.push('', 'Details:');
    Object.entries(result.details).forEach(([key, value]) => {
      lines.push(`  • ${key}: ${value}`);
    });
  }

  if (result.suggestion) {
    lines.push('', 'Suggested Fix:', result.suggestion);
  }

  lines.push('═══════════════════════════════════════════════════════════════', '');

  return lines.join('\n');
};

// Comprehensive email diagnostic test
export const diagnoseEmailConfig = async (
  transporter: Transporter
): Promise<EmailDiagnosticResult> => {
  // Step 1: Validate configuration
  const configValidation = validateSmtpConfig();
  if (!configValidation.success) {
    return configValidation;
  }

  // Step 2: Test SMTP connection
  try {
    await transporter.verify();
    return {
      success: true,
    };
  } catch (error) {
    return parseEmailError(error);
  }
};
