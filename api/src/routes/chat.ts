import { Router, type Request, type Response } from 'express';
import type { IMailgunClient } from '../config/email.js';
import { EmailRequestSchema, type EmailRequest, type EmailResponse } from '../types/index.js';
import { validateRequest } from '../middleware/validate.js';
import { emailRateLimiter } from '../middleware/rateLimit.js';
import { sendEmail } from '../services/emailService.js';

export const createChatRouter = (mailgunClient: IMailgunClient): Router => {
  const router = Router();

  // POST /api/chat/send-email
  router.post(
    '/send-email',
    emailRateLimiter,
    validateRequest(EmailRequestSchema),
    async (req: Request, res: Response): Promise<void> => {
      try {
        const emailData = req.body as EmailRequest;

        // Send email
        const messageId = await sendEmail(mailgunClient, emailData);

        const response: EmailResponse = {
          success: true,
          messageId,
        };

        res.status(200).json(response);
      } catch (error) {
        // Log error server-side
        console.error('Email sending error:', error);

        // Return user-friendly error message to client
        const response: EmailResponse = {
          success: false,
          error: 'Ein Fehler beim Senden der E-Mail ist aufgetreten. Bitte versuchen Sie es später erneut.',
        };

        res.status(500).json(response);
      }
    }
  );

  return router;
};
