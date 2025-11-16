import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the api directory's .env file
config({ path: resolve(__dirname, '../../.env') });
import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { createMailgunClient, verifyMailgunConfig } from './config/email.js';
import { createChatRouter } from './routes/chat.js';
import { apiRateLimiter } from './middleware/rateLimit.js';

// Environment variables with defaults
const PORT = parseInt(process.env.PORT || '4000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: ALLOWED_ORIGIN.split(',').map((origin) => origin.trim()),
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Apply general rate limiting
app.use(apiRateLimiter);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Initialize Mailgun client
const mailgunClient = createMailgunClient();

// Register chat routes
app.use('/api/chat', createChatRouter(mailgunClient));

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint nicht gefunden.',
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    error: 'Ein interner Server-Fehler ist aufgetreten.',
    ...(NODE_ENV === 'development' && { details: err.message }),
  });
});

// Start server
const startServer = async () => {
  try {
    // Verify Mailgun configuration
    const emailConfigValid = await verifyMailgunConfig();

    // Start listening
    app.listen(PORT, () => {
      console.log('');
      console.log('═══════════════════════════════════════════════════════════════');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📧 Environment: ${NODE_ENV}`);
      console.log(`🌐 CORS allowed origin: ${ALLOWED_ORIGIN}`);
      console.log(
        `✉️  Email status: ${emailConfigValid ? '✓ Ready' : '✗ Configuration issue (see above)'}`
      );
      console.log('═══════════════════════════════════════════════════════════════');
      console.log('');

      if (!emailConfigValid) {
        console.warn(
          '⚠️  Warning: Server is running but email functionality may be disabled.\n'
        );
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();
