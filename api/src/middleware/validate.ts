import type { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

// Sanitize string to prevent XSS
export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .slice(0, 2000); // Limit length
};

// Middleware factory for validating request body with Zod schema
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check honeypot field (anti-spam)
      if (req.body.honeypot && req.body.honeypot !== '') {
        res.status(400).json({
          success: false,
          error: 'Invalid request.',
        });
        return;
      }

      // Sanitize string fields
      if (req.body.message) {
        req.body.message = sanitizeString(req.body.message);
      }
      if (req.body.name) {
        req.body.name = sanitizeString(req.body.name);
      }
      if (req.body.email) {
        req.body.email = req.body.email.trim().toLowerCase();
      }

      // Validate with Zod schema
      const validatedData = schema.parse(req.body);
      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for user-friendly response
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          error: 'Ungültige Eingabedaten.',
          details: errors,
        });
        return;
      }

      // Unknown error
      console.error('Validation error:', error);
      res.status(500).json({
        success: false,
        error: 'Ein Fehler bei der Validierung ist aufgetreten.',
      });
    }
  };
};
