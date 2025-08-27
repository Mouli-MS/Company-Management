# Company Management System

A full-stack company management system built with React, Express, and MongoDB.

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Express.js backend API
- `shared/` - Shared TypeScript types and schemas

## Features

- Company CRUD operations
- Advanced filtering and search
- Responsive UI with dark/light mode
- MongoDB database integration
- TypeScript throughout the stack

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up MongoDB:

   - Install MongoDB locally or use MongoDB Atlas
   - Set the `MONGODB_URI` environment variable (defaults to `mongodb://localhost:27017/company-management`)

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm start
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (default: `mongodb://localhost:27017/company-management`)
- `PORT` - Server port (default: `5000`)
- `NODE_ENV` - Environment mode (development/production)

## API Endpoints

- `GET /api/companies` - Get all companies with optional filters
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript, MongoDB with Mongoose
- **Database**: MongoDB
- **Validation**: Zod
- **State Management**: TanStack Query
