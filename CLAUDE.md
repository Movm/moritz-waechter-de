# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus v3 personal portfolio website for Moritz Wächter. The site showcases projects and services.

## Common Development Commands

```bash
# Start development server with hot reload
npm start

# Build for production 
npm run build

# Serve production build locally
npm run serve

# Type checking
npm run typecheck

# Clear Docusaurus cache
npm run clear
```

## Architecture

- **Framework**: Docusaurus 3.x with TypeScript
- **Styling**: Tailwind CSS 4.x with custom configuration
- **Animations**: Framer Motion for page transitions and scroll animations
- **Fonts**: Google Fonts (Raleway for display, Open Sans for body text)
- **Language**: German (de)

### Key Configuration Files

- `docusaurus.config.ts` - Main site configuration, disabled docs/blog for portfolio focus
- `tailwind.config.js` - Tailwind configuration with orange color theme and custom animations
- `postcss.config.js` - PostCSS configuration for Tailwind processing
- `src/css/custom.css` - Global styles with Tailwind imports and Docusaurus theme overrides

### Page Structure

- `/` (index.tsx) - Homepage with hero section and about section
- `/webinare` - Webinar listings with contact integration
- `/projekte` - Projects showcase (currently placeholder)
- `/contact` - Contact form and information
- `/impressum` - Legal imprint (German requirement)
- `/privacy` - Privacy policy (GDPR compliance)

### Styling System

- **Primary Colors**: Orange theme (`#f59e0b` to `#92400e`)
- **Typography**: Raleway for headings (`font-display`), Open Sans for body text (`font-sans`)
- **Layout**: Responsive with mobile-first approach
- **Animations**: Framer Motion with scroll-triggered animations using `useInView`
- **Dark Mode**: Supported via Docusaurus theme with Tailwind dark: variants

### Content Strategy

- Portfolio-focused website (docs and blog disabled)
- German language content
- Contact form integration for lead generation
- Webinar promotion and registration
- Legal compliance pages for German market

## Development Notes

- Site configured for German market with appropriate legal pages
- Orange color scheme throughout for brand consistency
- Responsive design with careful attention to mobile experience
- Accessibility considerations with proper semantic HTML and ARIA attributes
- SEO optimized with proper meta tags and structured content