# Moritz Wächter Portfolio Website

> Modern, responsive portfolio and professional services platform showcasing political work, projects, and educational webinars.

A cutting-edge personal website built with React 19, Vite, and TypeScript, featuring integrated webinar booking, AI tool showcases, and a complete backend API for contact management. Designed specifically for the German market with GDPR compliance and German-language content.

## Features

- **🎨 Modern Design System**: Custom eucalyptus color palette with dark/light theme support and smooth transitions
- **🤖 Grünerator AI Showcase**: Dedicated project page featuring the Grünerator AI tool with interactive before/after image comparison
- **📅 Webinar Platform**: Integrated Cal.com booking system for three educational tracks (KI Basics, Grünerator Basics/Advanced)
- **📝 Contact Form**: React Hook Form with Zod validation, honeypot spam protection, and Mailgun email integration
- **📄 MDX Content**: Dynamic webinar invitation pages rendered from Markdown with frontmatter support
- **⚡ Performance Optimized**: Code splitting, lazy loading, image optimization, and production sourcemaps
- **🌍 German Market Ready**: Complete German content with required legal pages (Impressum, Datenschutz/GDPR)
- **🎭 Rich Animations**: Framer Motion page transitions, scroll effects, and micro-interactions
- **📱 Fully Responsive**: Mobile-first design with animated hamburger menu and optimized layouts

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript 5.6
- **Build Tool**: Vite 6.x (fast HMR and optimized builds)
- **Routing**: React Router DOM v7 (SPA with clean URLs)
- **Styling**: Tailwind CSS 3.4 with PostCSS and custom color system
- **Animations**: Framer Motion 12.23
- **Forms**: React Hook Form 7.66 with Zod 4.1 validation
- **Content**: MDX support (@mdx-js/rollup, @mdx-js/react)
- **Booking**: Cal.com embed integration
- **Icons**: React Icons 5.5 (Hero Icons)
- **Image Tools**: vite-imagetools for optimization, react-compare-slider for before/after

### Backend
- **Runtime**: Node.js 20+ (Alpine Linux)
- **Framework**: Express.js
- **Email Service**: Mailgun with rate limiting (5 requests per 15min)
- **Environment**: .env configuration

### DevOps
- **Containerization**: Docker multi-stage builds (Node 20 Alpine → Nginx Alpine)
- **Orchestration**: Docker Compose v3.8
- **Reverse Proxy**: Traefik with Let's Encrypt SSL automation
- **Web Server**: Nginx Alpine with SPA routing fallback
- **Deployment**: Coolify-compatible with health checks

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moritz-waechter-de.git
cd moritz-waechter-de
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd api
npm install
cd ..
```

### Environment Configuration

#### Frontend `.env`
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:4000
```

#### Backend `api/.env`
Create a `.env` file in the `api/` directory:
```env
NODE_ENV=development
PORT=4000
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
EMAIL_FROM=noreply@moritz-waechter.de
EMAIL_TO=info@moritz-waechter.de
ALLOWED_ORIGIN=http://localhost:3000
```

### Local Development

Start the frontend development server:
```bash
npm start
# or
npm run dev
```

The site will open at `http://localhost:3000` with hot module replacement enabled.

Start the backend API server (in a separate terminal):
```bash
cd api
npm run dev
```

The API will run at `http://localhost:4000`.

## Available Scripts

### Frontend

- `npm start` - Start development server (port 3000, auto-opens browser)
- `npm run dev` - Alternative development command
- `npm run build` - Production build with type checking
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking only

### Backend

- `npm run dev` - Start backend development server with hot reload
- `npm start` - Start production backend server

## Project Structure

```
moritz-waechter-de/
├── src/
│   ├── App.tsx                    # Route definitions with lazy loading
│   ├── main.tsx                   # React entry point with providers
│   ├── components/                # Reusable UI components
│   │   ├── Header.tsx             # Navigation with mobile menu
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Layout.tsx             # Page wrapper with transitions
│   │   ├── ContactForm/           # Contact form with validation
│   │   ├── WebinarBooking/        # Cal.com integration
│   │   ├── ImageComparison/       # Before/after slider
│   │   └── Chat/                  # Chat interface (currently hidden)
│   ├── pages/                     # Route pages
│   │   ├── index.tsx              # Homepage
│   │   ├── ueber-mich.tsx         # About page
│   │   ├── projekte.tsx           # Projects (Grünerator)
│   │   ├── webinare.tsx           # Webinar listings
│   │   ├── impressum.tsx          # Legal imprint
│   │   ├── privacy.tsx            # GDPR privacy policy
│   │   └── webinare/              # MDX webinar invitations
│   ├── contexts/                  # React contexts
│   │   └── ThemeContext.tsx       # Dark/light theme management
│   ├── hooks/                     # Custom React hooks
│   ├── services/                  # API client
│   ├── types/                     # TypeScript type definitions
│   ├── schemas/                   # Zod validation schemas
│   └── styles/                    # Global styles and CSS modules
├── api/                           # Backend Node.js service
│   ├── src/
│   │   ├── server.ts              # Express server
│   │   ├── services/              # Email service (Mailgun)
│   │   └── middleware/            # Rate limiting, CORS
│   └── Dockerfile                 # Backend container build
├── static/                        # Static assets (images)
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind theme configuration
├── tsconfig.json                  # TypeScript configuration
├── Dockerfile                     # Frontend container build
├── docker-compose.yml             # Multi-service orchestration
└── nginx.conf                     # Nginx SPA routing config
```

## Deployment

### Docker Build

Build the frontend container:
```bash
docker build -t moritz-waechter-de .
```

Build the backend container:
```bash
cd api
docker build -t moritz-waechter-api .
```

### Docker Compose

The project includes a complete Docker Compose configuration with Traefik reverse proxy:

```bash
docker-compose up -d
```

This sets up:
- Frontend (Nginx) with SPA routing
- Backend API service
- Traefik reverse proxy with Let's Encrypt SSL
- HTTP to HTTPS redirects
- www to non-www redirects

### Production Environment Variables

Configure the following in your production environment (e.g., Coolify):

**Frontend**:
- `VITE_API_URL` - Backend API URL (e.g., `https://moritz-waechter.de/api`)

**Backend**:
- `NODE_ENV=production`
- `PORT=4000`
- `MAILGUN_API_KEY` - Your Mailgun API key
- `MAILGUN_DOMAIN` - Your Mailgun domain
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address
- `ALLOWED_ORIGIN` - Frontend URL for CORS

### Health Checks

The Docker setup includes health checks for both services:
- Frontend: HTTP check on port 80
- Backend: HTTP check on `/health` endpoint

## Design System

The project uses a custom **eucalyptus** color palette with two main colors:

- **Primary "Tanne" (Dark Green)**: `#005538` - Main brand color
- **Secondary "Eucalyptus" (Medium Green)**: `#5F8575` - Accent color

Both colors have 11-stop scales (50-950) defined as Tailwind utilities and CSS variables for consistent theming across light and dark modes.

See [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md) and [STYLE_GUIDE.md](STYLE_GUIDE.md) for complete design system documentation.

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Development guidelines for AI assistants (architecture, tech stack, conventions)
- **[DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md)** - Color system, gradients, and semantic color usage
- **[STYLE_GUIDE.md](STYLE_GUIDE.md)** - Comprehensive styling rules and patterns
- **[CHAT_IMPLEMENTATION.md](CHAT_IMPLEMENTATION.md)** - Chat feature documentation

## Key Features in Detail

### Grünerator AI Tool

Dedicated showcase page for the Grünerator AI tool with:
- Feature descriptions (text generation, image optimization, subtitle creation)
- Interactive before/after image comparison with scroll animation
- External link to [gruenerator.de](https://gruenerator.de)

### Webinar Platform

Three educational webinar tracks:
1. **KI Basics** - Introduction to AI fundamentals
2. **Grünerator Basics** - Beginner-level tool training
3. **Grünerator Advanced** - Advanced features and workflows

Features:
- Embedded Cal.com calendar for direct booking
- MDX-powered invitation pages with rich content
- Difficulty level indicators

### Theme System

- Persistent dark/light theme toggle
- System preference detection on first load
- Stored in localStorage
- Smooth transitions between modes
- Complete CSS variable remapping for dark mode

### Contact System

Multi-layered contact options:
- Contact form with validation and spam protection
- Email integration via Mailgun
- Rate limiting (5 submissions per 15 minutes per IP)
- Success/error feedback with animations

## Performance Optimizations

- **Code Splitting**: Separate chunks for react-vendor, animations, and MDX pages
- **Lazy Loading**: MDX pages loaded on-demand with Suspense
- **Image Optimization**: Automatic optimization via vite-imagetools
- **Production Sourcemaps**: Enabled for debugging without exposing full source
- **Asset Versioning**: Vite hash-based filenames for cache busting

## Browser Support

Modern browsers with ES2020+ support:
- Chrome/Edge 88+
- Firefox 75+
- Safari 14+

## License

Proprietary - All rights reserved

## Author

**Moritz Wächter**
- Website: [moritz-waechter.de](https://moritz-waechter.de)
- LinkedIn: [Moritz Wächter](https://www.linkedin.com/in/moritz-w%C3%A4chter-5b2ab330a/)
- GitHub: [@moritz-waechter](https://github.com/moritz-waechter)

---

**Note**: This website is designed for the German market with all content in German. The README is in English for international developer collaboration.
