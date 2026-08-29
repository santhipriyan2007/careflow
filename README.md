# CareFlow

### Smart Appointment & Lead Management System

CareFlow is a full-stack healthcare management platform designed to help clinics manage leads, patients, appointments, treatments, payments, and operational analytics through a centralized dashboard.

The project was developed as a **Major Capstone Project during my Web Development Internship with LaunchED**, with a focus on practical full-stack engineering, secure authentication, database design, API development, frontend integration, testing, debugging, and cloud deployment.

> **Live Application:** https://careflow-green.vercel.app
>
> **Backend API:** https://careflow-i56g.onrender.com
>
> **GitHub:** https://github.com/santhipriyan2007/careflow

---

# 📌 Overview

Many clinics still rely on a combination of spreadsheets, messaging applications, manual registers, and disconnected systems to manage their daily operations.

This can lead to:

- Missed appointments
- Poor lead follow-up
- Scattered patient information
- Manual data entry
- Difficult treatment tracking
- Payment management issues
- Limited visibility into clinic performance

CareFlow addresses these challenges by providing a centralized web-based platform for managing important clinic operations.

### Core Workflow

Lead
  ↓
Patient
  ↓
Appointment
  ↓
Treatment
  ↓
Treatment Progress
  ↓
Payment
  ↓
Reports & Analytics

The application brings these workflows together through a centralized dashboard with secure authentication and role-based access.

✨ Features
👥 Lead Management

CareFlow provides a centralized workflow for managing prospective patients and leads.

Features include:

Lead creation
Lead information management
Lead tracking
Follow-up management
Lead status management
Lead-to-patient conversion
🧑‍⚕️ Patient Management

The platform provides centralized patient information management.

Features include:

Patient registration
Patient profile management
Patient information tracking
Patient history
Patient-related treatment information
Appointment association
📅 Appointment Scheduling

CareFlow helps clinics organize and manage appointments.

Features include:

Appointment scheduling
Appointment management
Patient-appointment association
Appointment status tracking
Treatment-related appointment information
🩺 Treatment Management

The system provides tools for managing patient treatment information.

Features include:

Treatment records
Treatment tracking
Treatment status management
Treatment-related information
Treatment progress monitoring
📈 Treatment Progress Logs

CareFlow allows treatment progress to be recorded over time.

This provides a historical view of treatment-related updates and helps maintain continuity of patient records.

💳 Payment Management

The application includes payment tracking for clinic operations.

Features include:

Payment records
Patient-related payment tracking
Treatment-related payment information
Payment status management
📊 Reports & Analytics

CareFlow provides a centralized dashboard for viewing clinic-related information.

Analytics provide visibility into areas such as:

Leads
Patients
Appointments
Treatments
Payments
Operational performance
🔐 Authentication & Authorization

CareFlow implements secure authentication and role-based access control.

Security Features
JWT-based authentication
bcrypt password hashing
Protected routes
Role-based authorization
Secure API access
Sensitive user information protection
Administrative access protection

The system supports different user roles with different levels of access.

Admin
  ↓
Administrative Operations

Doctor
  ↓
Clinical / Patient Operations

Patient
  ↓
Patient-specific Access

Protected resources are validated through authentication and authorization middleware on the backend.

🏗 System Architecture
                    ┌──────────────────────┐
                    │      React/Vite      │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         HTTPS / REST API
                               │
                               ↓
                    ┌──────────────────────┐
                    │    Node.js /        │
                    │     Express.js      │
                    │       Render        │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ↓              ↓              ↓
          ┌──────────┐   ┌────────────┐  ┌────────────┐
          │  Routes  │   │ Controllers│  │ Middleware │
          └────┬─────┘   └─────┬──────┘  └────────────┘
               │               │
               └───────┬───────┘
                       ↓
                ┌──────────────┐
                │   Database   │
                │ Integration  │
                └──────┬───────┘
                       │
                       ↓
              ┌──────────────────┐
              │    Supabase      │
              │    PostgreSQL    │
              └──────────────────┘
🔄 Application Workflows
Lead-to-Patient Workflow
New Lead
   ↓
Lead Information
   ↓
Follow-up
   ↓
Lead Conversion
   ↓
Patient Record
Appointment Workflow
Patient
   ↓
Appointment Creation
   ↓
Appointment Tracking
   ↓
Treatment
Treatment Workflow
Treatment
   ↓
Progress Updates
   ↓
Treatment History
   ↓
Completion / Follow-up
Payment Workflow
Patient / Treatment
       ↓
Payment Record
       ↓
Payment Status
       ↓
Financial Tracking
🛠 Technology Stack
Frontend
React.js
Vite
Tailwind CSS
JavaScript
Axios
React Router
Recharts
Backend
Node.js
Express.js
REST APIs
JWT
bcrypt
Database
Supabase
PostgreSQL
Deployment
Vercel — Frontend
Render — Backend
Supabase — Database
📁 Project Structure
careflow/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── package.json
│
├── docs/
│   ├── screenshots/
│   └── architecture/
│
├── .gitignore
├── LICENSE
└── README.md
🔌 Backend API

The backend follows a REST API architecture.

Major functional areas include:

Authentication
      ↓
Users & Roles
      ↓
Leads
      ↓
Patients
      ↓
Appointments
      ↓
Treatments
      ↓
Treatment Progress
      ↓
Payments
      ↓
Reports & Analytics
Production Backend
https://careflow-i56g.onrender.com
💻 Local Development
Prerequisites

Install the following:

Node.js
npm
Git
Supabase project
⚙️ Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Start the development server:

npm run dev

The backend runs locally on:

http://localhost:5000
🎨 Frontend Setup

Open another terminal.

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend normally runs on:

http://localhost:5173
🔑 Environment Variables

Backend configuration is supplied through environment variables.

Create:

backend/.env

Example:

SUPABASE_URL=
SUPABASE_ANON_KEY=
JWT_SECRET=
PORT=5000

The frontend uses:

VITE_API_URL=http://localhost:5000/api
Security Note

Never commit actual credentials to the repository.

Do not expose:

Supabase credentials
JWT secrets
API keys
Database credentials
Real patient information

Production environment variables are configured separately through the deployment platforms.

☁️ Production Deployment

CareFlow uses a simple cloud architecture:

                 ┌─────────────────┐
                 │  React / Vite   │
                 │     Vercel      │
                 └────────┬────────┘
                          │
                         HTTPS
                          │
                          ↓
                 ┌─────────────────┐
                 │ Node.js /       │
                 │ Express.js      │
                 │ Render          │
                 └────────┬────────┘
                          │
                          ↓
                 ┌─────────────────┐
                 │    Supabase     │
                 │   PostgreSQL    │
                 └─────────────────┘
Frontend

The React/Vite frontend is deployed using Vercel.

Live Application
https://careflow-green.vercel.app
Backend

The Node.js/Express backend is deployed using Render.

Backend API
https://careflow-i56g.onrender.com
Database

Supabase PostgreSQL is used for persistent application data.

🧪 Testing & Reliability

CareFlow was tested across the major application layers during development.

Authentication
Registration
Login
JWT authentication
Protected routes
Role-based access
Backend
REST API functionality
CRUD operations
Request handling
Authentication middleware
Authorization
Database integration
Frontend
Authentication flow
Protected pages
Forms
API integration
Dashboard
Data management
User interactions
Deployment
Vercel frontend deployment
Render backend deployment
Frontend/backend communication
Production configuration
Authentication in deployed environment
🔒 Security

Security considerations implemented in the project include:

JWT-based authentication
bcrypt password hashing
Protected backend routes
Role-based access control
Sensitive user data protection
Environment-based secret management
Authentication middleware
Authorization checks

The application also includes a safeguard preventing deletion of the last remaining administrator account, helping prevent accidental loss of administrative access.

💡 Key Engineering Decisions
Why React?

React provides a component-based architecture that is well suited for building an interactive dashboard containing multiple management workflows.

Why Node.js & Express?

Node.js and Express provide a lightweight and flexible backend environment for implementing REST APIs and connecting the frontend with the database.

Why Supabase?

Supabase provides PostgreSQL database infrastructure while keeping database integration and deployment relatively simple for a portfolio-scale application.

Why JWT?

JWT provides stateless authentication for API requests and works naturally with protected frontend and backend routes.

Why bcrypt?

Passwords should never be stored in plain text.

bcrypt is used to securely hash passwords before storing them in the database.

🚀 Deployment Challenges & Lessons Learned

Building and deploying CareFlow provided practical experience beyond simply writing application code.

Important areas included:

Connecting frontend and backend applications
Designing REST APIs
Integrating Supabase PostgreSQL
Implementing authentication
Debugging API requests
Managing protected routes
Handling deployment configuration
Debugging production issues
Managing environment variables
Deploying frontend and backend independently

The project provided hands-on experience with the complete software development lifecycle:

Requirement Analysis
        ↓
Database Design
        ↓
Backend Development
        ↓
Frontend Development
        ↓
API Integration
        ↓
Authentication
        ↓
Testing
        ↓
Debugging
        ↓
Deployment
        ↓
Documentation
🤖 Use of AI During Development

AI tools were used as a learning and productivity aid during development.

They helped with:

Exploring technical concepts
Understanding unfamiliar APIs
Reviewing implementation approaches
Debugging issues
Troubleshooting deployment problems
Improving development efficiency

However, AI did not replace engineering decisions, testing, debugging, system design, or validation.

The project required hands-on work across:

Frontend development
Backend development
Database integration
Authentication
API testing
Debugging
Deployment
Documentation
⚠️ Limitations

CareFlow is primarily a portfolio and educational healthcare management application.

The current implementation is not intended to serve as a complete enterprise hospital information system.

Potential real-world requirements would include:

Advanced audit logging
Fine-grained database security policies
Comprehensive compliance controls
Advanced monitoring
Backup and disaster recovery
More extensive automated testing
High-availability infrastructure
Larger-scale performance optimization
Comprehensive healthcare regulatory compliance
🔮 Future Improvements

Potential future improvements include:

Advanced appointment scheduling
Automated appointment reminders
More detailed analytics
Improved reporting
Notification systems
More granular permissions
Advanced audit logging
Automated testing and CI/CD
Improved observability
Performance optimization
Expanded patient-facing functionality

These improvements are intentionally outside the current portfolio scope.

🎯 Portfolio Highlights
CareFlow demonstrates practical experience with:
Full-stack web development
React.js
Vite
Tailwind CSS
JavaScript
Node.js
Express.js
REST API development
PostgreSQL
Supabase
CRUD operations
JWT authentication
bcrypt
Role-based authorization
API integration
Database design
Form handling
Dashboard development
Data visualization
Cloud deployment
Vercel
Render
Debugging
Production deployment
📸 Screenshots

Screenshots for the repository include:
Landing Page
Login
Dashboard
Lead Management
Patient Management
Appointment Management
Treatment Management
Payment Management
Reports & Analytics
Treatment Progress

Screenshots can be stored under:
docs/screenshots/

Example:
docs/
└── screenshots/
    ├── landing-page.png
    ├── login.png
    ├── dashboard.png
    ├── leads.png
    ├── patients.png
    ├── appointments.png
    ├── treatments.png
    ├── payments.png
    └── analytics.png

🎓 Skills Gained
Through the development of CareFlow, I gained practical experience in:
API integration
Form handling
CRUD operations
Authentication & authorization
Database design
REST API development
Frontend and backend integration
Deployment and cloud hosting
Debugging and problem solving
Full-stack development
Production configuration
Documentation

📚 What I Learned
CareFlow provided hands-on experience with the complete software development lifecycle.
The project involved:

Requirement Analysis
        ↓
Planning
        ↓
Database Design
        ↓
Backend Development
        ↓
Frontend Development
        ↓
API Integration
        ↓
Authentication
        ↓
Testing
        ↓
Debugging
        ↓
Deployment
        ↓
Documentation

One of the most valuable parts of the project was understanding how individual technologies connect together to form a complete production application.

⚖️ Disclaimer
CareFlow is a portfolio and educational software project.
It is designed to demonstrate full-stack software engineering concepts and is not intended to replace professional healthcare systems, medical professionals, or clinical decision-making processes.
The application should not be used as a substitute for professional medical advice or as a production healthcare system without appropriate validation, security, compliance, and regulatory controls.

🌐 Project Links

Live Application
https://careflow-green.vercel.app

Backend API
https://careflow-i56g.onrender.com

GitHub Repository
https://github.com/santhipriyan2007/careflow

📄 License
This project is provided for portfolio and educational purposes.
