# Company Management System

## Overview

This is a full-stack company management system built with React, Express, and PostgreSQL. The application provides a comprehensive interface for managing company data with features like filtering, searching, and CRUD operations. It uses a modern tech stack with TypeScript, Drizzle ORM for database operations, and shadcn/ui components for a polished user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Theme Support**: Built-in light/dark mode toggle with CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Development Setup**: Vite middleware integration for seamless development experience
- **Error Handling**: Centralized error handling with custom error responses
- **Request Logging**: Built-in request/response logging for API endpoints

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Shared schema definitions using Drizzle Zod integration
- **Connection**: Neon Database serverless PostgreSQL connection
- **Migrations**: Drizzle Kit for database schema migrations
- **Type Safety**: Full TypeScript integration from database to frontend

### Project Structure
- **Monorepo Setup**: Single repository with client, server, and shared code
- **Shared Types**: Common TypeScript types and Zod schemas shared between frontend and backend
- **Component Organization**: Modular component structure with reusable UI components
- **Path Aliases**: TypeScript path mapping for cleaner imports

### Development Features
- **Hot Reload**: Vite HMR for instant frontend updates
- **Type Checking**: Full TypeScript compilation checking
- **Linting**: ESLint configuration for code quality
- **Build Process**: Separate build processes for client and server with proper bundling

### UI/UX Design Patterns
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Component Library**: Comprehensive set of accessible UI components
- **Data Visualization**: Card and table view modes for company listings
- **Filtering System**: Advanced filtering with search, dropdowns, and range inputs
- **Form Validation**: Real-time validation with user-friendly error messages
- **Loading States**: Skeleton loading and proper loading indicators

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: TypeScript ORM for database operations and migrations

### UI/UX Libraries
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form library with validation support

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Zod**: Schema validation library
- **TanStack Query**: Data fetching and caching library

### Replit Integration
- **Cartographer**: Replit's development tooling integration
- **Runtime Error Overlay**: Enhanced error reporting in development
- **Development Banner**: Replit-specific development indicators