# CareFlow

### Smart Appointment & Lead Management System for Clinics

CareFlow is a full-stack healthcare management platform designed to help clinics centralize and streamline their day-to-day operations.

The system provides a unified platform for managing leads, patients, appointments, treatments, payments, treatment progress, reports, and analytics.

It was developed as a **Major Capstone Project during my Web Development Internship with LaunchED Global**, with a focus on practical full-stack development, secure authentication, API integration, database design, testing, debugging, and cloud deployment.

> **Live Application:** https://careflow-green.vercel.app
>
> **Backend API:** https://careflow-i56g.onrender.com

---

## 📌 Overview

Many small and medium-sized clinics rely on a combination of spreadsheets, WhatsApp conversations, paper records, and manual registers to manage their operations.

This can result in:

- Missed appointments
- Poor lead follow-up
- Scattered patient information
- Difficulty tracking treatment progress
- Manual payment tracking
- Limited visibility into clinic performance
- Increased possibility of human error

CareFlow addresses these challenges by bringing essential clinic management workflows into a centralized web application.

### Core Workflow

Lead
  ↓
Patient
  ↓
Appointment
  ↓
Treatment
  ↓
Progress Tracking
  ↓
Payment
  ↓
Reports & Analytics

The application provides role-based access so that authorized users can interact with the system according to their responsibilities.

✨ Features
👥 Lead Management
Create and manage potential patient leads
Track lead information
Update lead status
Follow up with prospective patients
Convert leads into patients
Centralized lead management
🧑‍⚕️ Patient Management
Create patient records
View patient information
Update patient details
Associate patients with appointments and treatments
Centralized patient data management
Protected access to patient information
📅 Appointment Management
Schedule appointments
Manage appointment information
Track appointment status
Associate appointments with patients
Centralized appointment workflow
🦷 Treatment Management
Create treatment records
Track ongoing treatments
Associate treatments with patients
Maintain treatment-related information
Monitor treatment progress
📈 Treatment Progress Tracking
Record treatment progress
Maintain progress logs
Track changes throughout treatment
View historical progress information
Associate progress updates with relevant treatments
💳 Payment Management
Record patient payments
Track payment information
Associate payments with treatments
Monitor payment status
Improve visibility into clinic revenue
📊 Reports & Analytics

The dashboard provides centralized insights into clinic operations.

Analytics include:

Patient statistics
Lead statistics
Appointment information
Treatment information
Payment information
Operational summaries
Visual data representation

Charts and visualizations are implemented using Recharts.

🔐 Authentication & Security

CareFlow includes authentication and authorization mechanisms to protect application functionality.

Security Features
JWT-based authentication
bcrypt password hashing
Protected API routes
Protected frontend routes
Role-based access control
Secure authentication flow
Sensitive user information excluded from unnecessary API responses
Administrative safeguards
Administrative Protection

The application includes a safeguard that prevents deletion of the last remaining administrator account, helping avoid accidental loss of administrative access.

🏗 System Architecture

CareFlow follows a traditional full-stack architecture with a React frontend, Node.js/Express backend, and Supabase PostgreSQL database.

                    ┌──────────────────────┐
                    │     React / Vite     │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ↓
                    ┌──────────────────────┐
                    │    Node.js /         │
                    │    Express.js        │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ↓                      ↓
             ┌──────────────┐      ┌──────────────┐
             │   Services   │      │ Middleware   │
             └──────┬───────┘      └──────────────┘
                    │
                    ↓
             ┌──────────────┐
             │   Supabase   │
             │  PostgreSQL  │
             └──────────────┘
🔄 Application Flow
User
 ↓
React Frontend
 ↓
API Request
 ↓
Express.js Backend
 ↓
Authentication / Authorization
 ↓
Routes
 ↓
Controllers
 ↓
Database Operations
 ↓
Supabase PostgreSQL
 ↓
API Response
 ↓
React UI

This separation keeps the frontend, backend, authentication, business logic, and database responsibilities organized.

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
JavaScript
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
└── README.md
🔌 Backend API

The backend provides REST APIs for the application's major workflows.

The API is hosted on Render:

Backend API

https://careflow-i56g.onrender.com

Major API functionality includes:

Authentication
User management
Lead management
Patient management
Appointment management
Treatment management
Treatment progress tracking
Payment management
Reports
Analytics

The exact routes and implementation can be explored in the backend source code.

💻 Local Development
Prerequisites

Make sure the following are installed:

Node.js
npm
Git
Supabase project
Clone Repository
git clone <repository-url>
cd careflow
⚙️ Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create a .env file:

SUPABASE_URL=
SUPABASE_ANON_KEY=
JWT_SECRET=
PORT=5000

Start the backend development server:

npm run dev

Local backend:

http://localhost:5000
🎨 Frontend Setup

Open another terminal and navigate to the frontend:

cd frontend

Install dependencies:

npm install

Create a frontend .env file:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

The frontend will normally be available at:

http://localhost:5173
🔑 Environment Variables

The application uses environment variables for configuration and sensitive credentials.

Backend
SUPABASE_URL=
SUPABASE_ANON_KEY=
JWT_SECRET=
PORT=5000
Frontend
VITE_API_URL=http://localhost:5000/api

Sensitive credentials should never be committed to GitHub.

For production, environment variables are configured separately through the respective deployment platforms.

☁️ Production Deployment

CareFlow is deployed using a simple cloud architecture.

React / Vite
     ↓
  Vercel
     ↓
 HTTPS API
     ↓
  Render
     ↓
Node.js / Express
     ↓
Supabase PostgreSQL
Frontend

The React/Vite frontend is deployed on Vercel.

Live Application:

https://careflow-green.vercel.app

Backend

The Node.js/Express backend is deployed on Render.

Backend API:

https://careflow-i56g.onrender.com

Database

Supabase PostgreSQL is used for persistent application data.

🧪 Testing & Validation

CareFlow was tested throughout development to verify the major application workflows.

Testing included:

Authentication
User registration
User login
JWT authentication
Protected routes
Authorization
Role-based access
Data Management
CRUD operations
Form submission
Data validation
Patient management
Lead management
Appointment management
Treatment management
Payment management
Security
Password hashing
Protected API endpoints
Sensitive data handling
JWT validation
Administrative account protection
Frontend
API integration
Form handling
Protected navigation
Dashboard functionality
Data visualization
Error handling
Deployment
Frontend deployment
Backend deployment
Frontend/backend communication
Environment configuration
Production debugging
🔒 Security Considerations

Security was considered throughout the development of CareFlow.

Implemented measures include:

bcrypt password hashing
JWT-based authentication
Protected routes
Role-based authorization
Environment-based secret management
Restricted access to protected resources
Reduced exposure of sensitive user information
Last-admin deletion safeguard

Production healthcare systems would require significantly stronger security, privacy, compliance, auditing, monitoring, and regulatory controls than those implemented in this portfolio project.

💡 Key Engineering Decisions
Why React?

React provides a component-based architecture that makes it suitable for building an interactive dashboard-driven application with multiple workflows.

Why Node.js and Express?

Node.js and Express provide a lightweight and flexible environment for building REST APIs and handling backend business logic.

Why Supabase?

Supabase provides PostgreSQL database infrastructure with a simple developer experience, making it suitable for a portfolio-scale full-stack application.

Why JWT?

JWT provides a straightforward mechanism for authenticating users and protecting API endpoints in a stateless REST API architecture.

Why bcrypt?

Passwords should never be stored as plain text.

bcrypt is used to securely hash user passwords before storing them in the database.

Why Vercel and Render?

Vercel provides a convenient deployment platform for the React frontend, while Render provides a straightforward environment for deploying the Node.js backend.

Together they provide a simple and practical deployment architecture for the project.

🚧 Development Challenges & Lessons Learned

Building CareFlow provided hands-on experience with several real-world software engineering challenges.

API Integration

Connecting the React frontend with the Express backend required careful handling of API requests, responses, authentication tokens, and error states.

Authentication

Implementing JWT authentication required coordinating:

Login
Token generation
Token storage
Protected frontend routes
Protected backend routes
Authorization
Database Design

The application required designing relationships between entities such as:

Leads
Patients
Appointments
Treatments
Payments
Progress records
Users
Debugging

Development involved identifying and resolving issues related to:

Routing
API integration
Authentication
Database operations
Environment variables
Deployment
Frontend/backend communication
Deployment

Deploying the application provided practical experience with:

Vercel
Render
Production environment variables
Backend/frontend communication
Cloud deployment debugging
🎯 Skills Demonstrated

CareFlow demonstrates practical experience with:

Full-stack web development
React.js
Node.js
Express.js
REST API development
PostgreSQL
Supabase
JWT authentication
bcrypt
Role-based access control
CRUD operations
API integration
Form handling
Database design
Dashboard development
Data visualization
Cloud deployment
Debugging
Git & GitHub
Software development lifecycle
📚 What I Learned

This project provided hands-on experience across the complete software development lifecycle.

I worked through:

Requirement analysis
Application architecture
Database design
Frontend development
Backend development
REST API design
Authentication and authorization
API integration
CRUD implementation
Testing
Debugging
Deployment
Environment configuration
Documentation

I also used AI as a learning and productivity tool to explore concepts, review implementation approaches, and accelerate troubleshooting.

However, AI did not replace the engineering decisions involved in designing the system, debugging issues, testing functionality, deploying the application, and validating the final result.

📸 Screenshots

Screenshots of the application's major workflows can be added here.

Recommended screenshots:

Landing Page
Login
Dashboard
Lead Management
Patient Management
Appointment Management
Treatment Management
Payment Management
Reports & Analytics

Screenshots can be stored inside:

docs/screenshots/
⚠️ Limitations

CareFlow is a portfolio-focused healthcare management application and is not intended to represent a production hospital information system.

Important limitations include:

No clinical validation
No medical-device certification
Limited compliance controls
Limited audit infrastructure
Portfolio-scale architecture
No hospital-scale workload optimization
Production healthcare environments would require stronger privacy and security controls
🔮 Future Improvements

Potential improvements include:

Automated testing with CI/CD
More comprehensive audit logging
Advanced appointment scheduling
Notification and reminder systems
Improved analytics
More granular permissions
Enhanced database security policies
Better observability and monitoring
Automated backups and recovery workflows
More comprehensive validation and testing

These improvements are intentionally outside the current project scope.

🌐 Project Links
Live Application

https://careflow-green.vercel.app

Backend API

https://careflow-i56g.onrender.com

GitHub Repository

https://github.com/santhipriyan2007/careflow

🏆 Portfolio Highlights

CareFlow demonstrates the ability to design, build, test, secure, and deploy a complete full-stack application.

The project combines:

Frontend Development

→ React + Vite + Tailwind CSS

Backend Development

→ Node.js + Express.js + REST APIs

Database Engineering

→ PostgreSQL + Supabase

Security

→ JWT + bcrypt + RBAC

Application Engineering

→ CRUD + API Integration + Form Handling

Deployment

→ Vercel + Render

Analytics

→ Recharts + Dashboard Visualization

⚖️ Disclaimer

CareFlow is an educational and portfolio project developed to demonstrate software engineering and full-stack development skills.

It is not intended to replace professional healthcare information systems, medical advice, clinical judgment, or certified healthcare management software.

📄 License

This project is currently provided for portfolio and educational purposes.
