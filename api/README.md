# Moritz Wächter API

Backend API service for the chat functionality on moritz-waechter.de

## Features

- Email sending via SMTP (Nodemailer)
- Request validation with Zod
- Rate limiting (5 requests per 15 minutes per IP)
- Input sanitization and XSS protection
- Honeypot anti-spam protection
- TypeScript for type safety
- Docker support

## Setup

### Prerequisites

- Node.js 20 or higher
- SMTP email credentials from your hosting provider

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your SMTP credentials
nano .env
```

### SMTP Setup

Configure your SMTP settings in `.env`:

```
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-email@moritz-waechter.de
SMTP_PASS=your-smtp-password
SMTP_FROM=info@moritz-waechter.de
```

Contact your hosting provider for the correct SMTP settings.

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## API Endpoints

### POST /api/chat/send-email

Send a chat message via email.

**Request Body:**
```json
{
  "topic": "frage" | "webinar",
  "message": "User's message (10-2000 chars)",
  "name": "User's name (2-100 chars)",
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "messageId": "unique-message-id"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message in German"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-12T10:00:00.000Z",
  "environment": "development"
}
```

## Security Features

1. **Rate Limiting**: 5 requests per 15 minutes per IP address
2. **Input Validation**: Zod schemas validate all inputs
3. **Input Sanitization**: Removes HTML tags and limits length
4. **Honeypot Field**: Anti-spam protection
5. **CORS**: Only allows requests from configured origins
6. **Email Validation**: Validates email format

## Production Deployment

### Docker

Build and run with Docker:

```bash
# Build
docker build -t moritz-waechter-api .

# Run
docker run -p 4000:4000 --env-file .env moritz-waechter-api
```

### Docker Compose

The API is configured in `docker-compose.yml` alongside the frontend:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f moritz-waechter-api

# Stop services
docker-compose down
```

### Environment Variables (Production)

Update these in your production environment:

- `NODE_ENV=production`
- `ALLOWED_ORIGIN=https://moritz-waechter.de`
- Use secure SMTP credentials
- Consider using a dedicated email service (SendGrid, Mailgun, etc.)

## Troubleshooting

### Email not sending

1. Check SMTP credentials in `.env`
2. Verify SMTP host, port, username, and password are correct
3. Check server logs: `docker-compose logs moritz-waechter-api`
4. Verify email configuration: the server logs will show if email config is valid on startup
5. Contact your hosting provider to confirm SMTP settings

### CORS errors

1. Check `ALLOWED_ORIGIN` in `.env` matches your frontend URL
2. For local development: `http://localhost:3000`
3. For production: `https://moritz-waechter.de`

### Rate limit errors

If you're hitting rate limits during testing:

1. Wait 15 minutes
2. Or temporarily increase limits in `src/middleware/rateLimit.ts`
3. Or restart the API server (resets in-memory rate limit counters)

## Technology Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Email**: Nodemailer
- **Validation**: Zod
- **Rate Limiting**: express-rate-limit
- **Security**: CORS, input sanitization

## License

MIT
