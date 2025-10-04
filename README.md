# FileSafe 📁

<div align="center">
  <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
</div>

<h3 align="center">A Modern File Storage & Sharing Platform</h3>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. 🎯 [Learning Objectives](#learning-objectives)
3. ⚙️ [Tech Stack](#tech-stack)
4. 🔋 [Features](#features)
5. 🚀 [Getting Started](#getting-started)
6. 📁 [Project Structure](#project-structure)
7. 🏗️ [Key Components](#key-components)
8. 📚 [What I Learned](#what-i-learned)

## 🤖 Introduction

**FileSafe** is a full-stack file storage and sharing platform built as a follow-along learning project to practice modern web development technologies. This project demonstrates the implementation of a complete file management system with user authentication, email verification, and cloud storage integration using industry-standard tools and frameworks.

This was a hands-on learning experience focused on building a production-ready web application that combines frontend development, backend services, database management, and cloud storage solutions.

## 🎯 Learning Objectives

This project was created as a practical exercise to gain experience with:

### Core Web Development

- **Full-Stack Development** with Next.js 15 for both client and server-side functionality
- **TypeScript** for type-safe development and better code quality
- **Modern React Patterns** including hooks, context, and component composition
- **Responsive Design** with mobile-first approach

### Authentication & Security

- **User Authentication & Authorization** using Appwrite's built-in auth system
- **Email Verification** for secure account creation
- **Session Management** and protected routes
- **OTP (One-Time Password)** implementation for additional security

### Backend & Database

- **Appwrite Backend-as-a-Service** for database, authentication, and storage
- **Database Design** for user data and file metadata
- **File Upload & Management** with cloud storage integration
- **API Route Protection** and data validation

### UI/UX Development

- **ShadCN UI Components** for consistent, accessible design system
- **Tailwind CSS** for utility-first styling and rapid development
- **Component Library** integration and customization
- **Responsive Design** patterns and mobile optimization

## ⚙️ Tech Stack

### Frontend

- **Next.js 15** - React framework with server-side rendering and routing
- **TypeScript** - Static type checking for enhanced development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **ShadCN/UI** - High-quality, accessible React component library
- **React Hook Form** - Performant forms with easy validation
- **Recharts** - Composable charting library for data visualization

### Backend & Services

- **Appwrite** - Open-source backend-as-a-service platform
  - Database management
  - User authentication
  - File storage and management
  - Email services
- **Node Appwrite SDK** - Server-side integration with Appwrite

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Zod** - TypeScript-first schema validation

## 🔋 Features

### 🔐 Authentication System

- User registration with email verification
- Secure login/logout functionality
- OTP verification for enhanced security
- Protected routes and session management

### 📂 File Management

- **File Upload** - Drag-and-drop interface with progress indicators
- **File Organization** - Categorized storage (Documents, Images, Videos, Audio, Others)
- **File Preview** - In-app preview for supported file types
- **File Actions** - Download, share, rename, and delete files
- **Storage Analytics** - Visual representation of storage usage by file type

### 🎨 User Interface

- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern UI Components** - Clean, accessible interface using ShadCN
- **Dark Mode Ready** - Prepared for theme switching
- **Interactive Elements** - Smooth animations and transitions
- **Search & Filter** - Find files quickly with search and sorting options

### 📊 Dashboard Features

- **Storage Overview** - Visual charts showing storage usage
- **Recent Files** - Quick access to recently uploaded files
- **File Statistics** - Breakdown by file types and sizes
- **User Profile Management** - Account settings and preferences

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Appwrite Cloud account or self-hosted Appwrite instance

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd FileSafe
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_storage_bucket_id
NEXT_APPWRITE_KEY=your_appwrite_api_key
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FileSafe/
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Login page
│   │   └── sign-up/       # Registration page
│   ├── (root)/            # Main application routes
│   │   ├── [type]/        # Dynamic file type pages
│   │   └── page.tsx       # Dashboard home
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout component
├── components/            # Reusable UI components
│   ├── ui/               # ShadCN UI components
│   ├── ActionDropdown.tsx # File action menu
│   ├── AuthForm.tsx      # Authentication forms
│   ├── FileUpload.tsx    # File upload component
│   ├── Header.tsx        # Navigation header
│   ├── Sidebar.tsx       # Navigation sidebar
│   └── ...
├── lib/                   # Utility functions and configurations
│   ├── actions/          # Server actions for file and user operations
│   ├── appwrite/         # Appwrite configuration and setup
│   └── utils.ts          # Helper functions
├── constants/            # Application constants and configurations
├── types/               # TypeScript type definitions
└── public/              # Static assets (icons, images)
```

## 🏗️ Key Components

### Authentication Flow

- **AuthForm Component** - Handles both sign-in and sign-up with form validation
- **OTPModal** - Email verification with one-time password
- **Protected Routes** - Automatic redirection for authenticated/unauthenticated users

### File Management

- **FileUpload** - Drag-and-drop interface with React Dropzone
- **Thumbnail** - Dynamic file type icons and image previews
- **ActionDropdown** - Context menu for file operations
- **Search & Sort** - Real-time file filtering and organization

### Data Visualization

- **Chart Component** - Storage usage analytics with Recharts
- **Storage Statistics** - Visual breakdown of file types and usage

## 📚 What I Learned

Through building FileSafe, I gained practical experience in:

### Technical Skills

1. **Modern React Development** - Advanced hooks, context patterns, and component composition
2. **Next.js App Router** - Server components, client components, and the new routing system
3. **TypeScript Integration** - Type safety across frontend and backend operations
4. **Backend-as-a-Service** - Working with Appwrite for authentication, database, and storage
5. **Form Handling** - Advanced form validation with React Hook Form and Zod
6. **File Upload Systems** - Implementing drag-and-drop with progress tracking
7. **Responsive Design** - Mobile-first approach with Tailwind CSS

### Development Practices

1. **Component Architecture** - Building reusable, maintainable UI components
2. **State Management** - Effective use of React state and server state
3. **Error Handling** - Graceful error handling and user feedback
4. **Security Patterns** - Authentication flows and route protection
5. **Performance Optimization** - Image optimization, lazy loading, and code splitting

### Tools & Services

1. **ShadCN/UI** - Working with a modern component library and customization
2. **Appwrite SDK** - Integration with cloud services and APIs
3. **Modern Deployment** - Preparing applications for production deployment

This project served as an excellent foundation for understanding full-stack development with modern tools and gave me confidence in building production-ready web applications.

---

**Note**: This project was built as a learning exercise following along with educational content to practice modern web development techniques and tools.
