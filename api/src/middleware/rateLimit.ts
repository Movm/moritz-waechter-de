import rateLimit from 'express-rate-limit';

// Rate limiter for email sending endpoint
// Allows 5 requests per 15 minutes per IP address
export const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting for trusted sources (optional)
  skip: (_req) => {
    // You can add logic here to skip rate limiting for specific IPs or conditions
    return false;
  },
});

// Stricter rate limiter for general API usage
export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per minute
  message: {
    success: false,
    error: 'Zu viele Anfragen. Bitte verlangsame deine Anfragen.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
