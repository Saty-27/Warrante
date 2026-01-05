# QR Code Scanner Web Application

## Overview

This is a modern QR code scanner web application built with React and Express. The application provides a clean, mobile-first interface for scanning QR codes using device cameras, with Google OAuth authentication and scan history tracking.

## System Architecture

The application follows a full-stack architecture with:
- **Frontend**: React with TypeScript, Vite for bundling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Authentication**: Google OAuth 2.0
- **Deployment**: Configured for Replit with autoscale deployment

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **TanStack Query** for server state management
- **Wouter** for lightweight routing
- **shadcn/ui** component library for consistent UI
- **Tailwind CSS** for styling with custom design system

### Backend Architecture
- **Express.js** server with TypeScript
- **Modular routing** with separate route handlers
- **Google OAuth 2.0** integration for authentication
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** database (using Neon serverless)

### Database Schema
The application uses two main tables:
- **users**: Stores user information including Google OAuth data
- **scanHistory**: Tracks QR code scan results linked to users

### QR Scanner Features
- **Camera access** with permission handling
- **Real-time QR code detection** using device camera
- **Mobile-optimized** scanning interface
- **Flash/torch support** for low-light conditions
- **Multiple result types** (URLs, text, email, etc.)

### Authentication System
- **Google OAuth 2.0** integration
- **Session-based authentication** with secure cookies
- **User creation/lookup** based on Google ID
- **Secure redirect handling**

## Data Flow

1. **User Authentication**: Users authenticate via Google OAuth
2. **Camera Access**: App requests camera permissions for scanning
3. **QR Scanning**: Real-time camera feed processes QR codes
4. **Result Processing**: Scanned content is categorized and stored
5. **History Tracking**: All scans are saved to user's history
6. **Result Actions**: Users can copy, share, or open scanned content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **react-hook-form**: Form state management

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **esbuild**: Server-side bundling

### Authentication
- **Google OAuth 2.0**: User authentication service
- **connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

The application is configured for Replit deployment with:
- **Autoscale deployment** target for production
- **Development mode** with hot reloading
- **Environment variables** for database and OAuth configuration
- **Build optimization** with separate client/server builds

### Build Process
- **Client**: Vite builds React app to `dist/public`
- **Server**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle handles schema migrations

### Environment Setup
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_REDIRECT_URI`: OAuth callback URL

## Changelog
- June 25, 2025: Initial setup
- June 25, 2025: Created complete QR scanner app with warranty tracking
- June 25, 2025: Built Product Details form with optional fields
- June 25, 2025: Added Result page with Bajaj logo and share/copy functionality  
- June 25, 2025: Created All Product List page with company logos and tab navigation
- June 25, 2025: Updated color scheme to exact #FCB523 specification
- June 25, 2025: Updated Profile page with dark theme, Anjali Singh photo, and warranty cards with yellow bottom borders
- June 25, 2025: Added "Warante" app name to all page headers across the application
- June 25, 2025: Added bottom QR navigation footer to Profile page
- June 25, 2025: Updated Home page text from "Scan QR Codes Instantly" to "Warante Scan and Save"
- June 25, 2025: Created Settings page with toggle switches for all features (Vibration, Rate Us, Privacy Policy, Share, Help, Profile, Trashed/Rejected)
- June 25, 2025: Added Settings icon to Profile footer navigation with 5-button layout
- June 25, 2025: Fixed handleScanner function error in Profile component
- June 25, 2025: Created comprehensive Admin Dashboard with analytics, metrics, charts, and project management features

## User Preferences

Preferred communication style: Simple, everyday language.