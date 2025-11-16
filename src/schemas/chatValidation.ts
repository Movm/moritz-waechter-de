import { z } from 'zod';

// Sanitize string by removing potential XSS vectors
export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .slice(0, 1000); // Limit length
};

// Topic validation
export const topicSchema = z.enum(['frage', 'webinar'], {
  message: 'Bitte wähle eine Option aus.',
});

// Name validation
export const nameSchema = z
  .string()
  .min(2, 'Name muss mindestens 2 Zeichen lang sein.')
  .max(100, 'Name darf maximal 100 Zeichen lang sein.')
  .transform(sanitizeString);

// Email validation
export const emailSchema = z
  .string()
  .email('Bitte gib eine gültige E-Mail-Adresse ein.')
  .max(255, 'E-Mail-Adresse ist zu lang.')
  .transform((email) => email.toLowerCase().trim());

// Message validation
export const messageSchema = z
  .string()
  .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein.')
  .max(2000, 'Nachricht darf maximal 2000 Zeichen lang sein.')
  .transform(sanitizeString);

// Zeitraum validation
export const zeitraumSchema = z
  .string()
  .min(3, 'Zeitraum muss mindestens 3 Zeichen lang sein.')
  .max(200, 'Zeitraum darf maximal 200 Zeichen lang sein.')
  .transform(sanitizeString);

// Preferred time validation
export const preferredTimeSchema = z
  .string()
  .min(5, 'Bevorzugte Zeiten müssen mindestens 5 Zeichen lang sein.')
  .max(500, 'Bevorzugte Zeiten dürfen maximal 500 Zeichen lang sein.')
  .transform(sanitizeString);

// Complete form validation schema
export const chatFormSchema = z.object({
  topic: topicSchema,
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  zeitraum: zeitraumSchema.optional(),
  preferredTime: preferredTimeSchema.optional(),
  honeypot: z.string().max(0).optional(), // Honeypot field for spam protection
});

// Type inference from schema
export type ChatFormSchema = z.infer<typeof chatFormSchema>;

// Individual field validators for real-time validation
export const validateEmail = (email: string): string | null => {
  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
};

export const validateName = (name: string): string | null => {
  const result = nameSchema.safeParse(name);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
};

export const validateMessage = (message: string): string | null => {
  const result = messageSchema.safeParse(message);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
};

export const validateZeitraum = (zeitraum: string): string | null => {
  const result = zeitraumSchema.safeParse(zeitraum);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
};

export const validatePreferredTime = (preferredTime: string): string | null => {
  const result = preferredTimeSchema.safeParse(preferredTime);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
};
