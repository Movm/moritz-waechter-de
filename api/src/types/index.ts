import { z } from 'zod';

// Chat topic enum
export const ChatTopicSchema = z.enum(['frage', 'webinar']);
export type ChatTopic = z.infer<typeof ChatTopicSchema>;

// Email request validation schema
export const EmailRequestSchema = z.object({
  topic: ChatTopicSchema,
  message: z.string().min(10).max(2000),
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  honeypot: z.string().max(0).optional(), // Anti-spam honeypot field
});

export type EmailRequest = z.infer<typeof EmailRequestSchema>;

// Email response types
export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Environment variables type
export interface EnvConfig {
  PORT: number;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
  ALLOWED_ORIGIN: string;
  NODE_ENV: 'development' | 'production';
}

// Email template data
export interface EmailTemplateData {
  topic: ChatTopic;
  topicLabel: string;
  message: string;
  name: string;
  email: string;
  timestamp: string;
}
