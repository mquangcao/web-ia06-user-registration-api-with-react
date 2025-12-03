# IA03 – User Registration API with React Frontend

A complete full-stack user registration system built with NestJS backend and React frontend in a monorepo architecture.

## 🎯 Project Overview

This project implements a comprehensive user registration system featuring:

- **Backend (NestJS)**: RESTful API with PostgreSQL database
- **Frontend (React)**: Modern UI with TypeScript, React Router, and shadcn/ui
- **Validation**: React Hook Form with Zod schema validation
- **API State Management**: TanStack React Query (React Query)
- **Styling**: Tailwind CSS with shadcn/ui components

## 📁 Project Structure

```
├── apps/
│   ├── api/              # NestJS Backend
│   │   ├── src/
│   │   │   ├── user/     # User module (entity, service, controller, DTOs)
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── package.json
│   └── web/              # React Frontend
│       ├── src/
│       │   ├── components/ui/  # shadcn/ui components
│       │   ├── pages/          # Home, Login, SignUp pages
│       │   ├── app.tsx         # Router setup
│       │   └── main.tsx
│       └── package.json
└── package.json          # Root package.json
```

## 🚀 Features Implemented

### Backend (NestJS)

✅ **Database Setup**
- User entity with email, password, and createdAt fields
- TypeORM integration with PostgreSQL
- Automatic timestamp management

✅ **API Endpoints**
- `POST /user/register` - User registration endpoint
- Input validation using class-validator
- Email uniqueness check
- Password hashing with bcrypt
- Proper error handling and responses

✅ **Security**
- Environment variables for configuration
- CORS enabled for frontend
- Password hashing before storage
- Validation pipes for input sanitization

### Frontend (React)

✅ **Routing & Pages**
- React Router setup with 3 pages:
  - **Home**: Welcome page with project overview
  - **Sign Up**: Registration form with API integration
  - **Login**: Login form UI (mock implementation as per SRS)

✅ **Sign Up Page**
- Form validation with React Hook Form and Zod
- Real-time validation feedback
- API integration using React Query mutation
- Loading states and error handling
- Success feedback messages
- Responsive design with shadcn/ui

✅ **Login Page**
- Form validation (UI only, no backend as per SRS)
- Mock success feedback
- Styled with shadcn/ui components

✅ **User Experience**
- Clean navigation bar
- Responsive design
- Clear validation messages
- Visual feedback for all states (loading, error, success)
- Accessible interface with proper ARIA labels

## 🛠️ Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** (v12 or higher)

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd web-ia06-user-registration-api-with-react
```

### 2. Install dependencies

```bash
npm install
```

This will install dependencies for both backend and frontend.

### 3. Setup PostgreSQL Database

Create a PostgreSQL database for the application:

```sql
CREATE DATABASE user_registration;
```

### 4. Configure Backend Environment Variables

Create a `.env` file in `apps/api/`:

```bash
cd apps/api
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=user_registration
```

### 5. Configure Frontend Environment Variables

Create a `.env` file in `apps/web/`:

```bash
cd apps/web
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3000
```

## 🏃 Running the Application

### Development Mode

You can run both applications simultaneously or separately:

#### Run Both (Backend + Frontend)

```bash
npm run dev
```

#### Run Backend Only

```bash
cd apps/api
npm run dev
```

The API will be available at: `http://localhost:3000`

#### Run Frontend Only

```bash
cd apps/web
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### Production Build

#### Build All

```bash
npm run build
```

#### Build and Run Backend in Production

```bash
cd apps/api
npm run build
npm run start:prod
```

#### Build and Run Frontend in Production

```bash
cd apps/web
npm run build
npm run preview
```

## 🧪 Testing the Application

### 1. Start Both Applications

```bash
npm run dev
```

### 2. Test User Registration

1. Open browser and navigate to `http://localhost:5173`
2. Click "Sign Up" in the navigation
3. Fill in the registration form:
   - Email: `test@example.com`
   - Password: `password123` (minimum 6 characters)
4. Click "Sign Up"
5. You should see a success message

### 3. Test Validation

Try these scenarios to test validation:

- **Invalid Email**: Enter "notanemail" - should show email validation error
- **Short Password**: Enter password less than 6 characters
- **Empty Fields**: Leave fields blank and submit
- **Duplicate Email**: Register the same email twice - should show "Email already exists"

### 4. Test Login Page

1. Click "Login" in the navigation
2. Fill in credentials (mock login)
3. Click "Login" - should show success message

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📚 API Documentation

### Register User

**Endpoint**: `POST /user/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2025-12-03T10:00:00.000Z"
  }
}
```

**Error Responses**:

- **400 Bad Request** - Validation error
```json
{
  "statusCode": 400,
  "message": ["Please provide a valid email address"],
  "error": "Bad Request"
}
```

- **409 Conflict** - Email already exists
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

## 🎨 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript/JavaScript
- **PostgreSQL** - Relational database
- **bcrypt** - Password hashing
- **class-validator** - Validation decorators

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack React Query** - API state management
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS

## 🐛 Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Ensure PostgreSQL is running
2. Verify database credentials in `.env`
3. Check if database exists: `psql -U postgres -c "\l"`

### Port Already in Use

If port 3000 or 5173 is already in use:

- **Backend**: Edit `apps/api/src/main.ts` and change the port
- **Frontend**: Edit `apps/web/vite.config.ts` and add custom port

### Module Not Found Errors

If you see import errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules
npm install
```