## Live Demo

### Frontend

https://careflow-green.vercel.app

### Backend API

https://careflow-i56g.onrender.com

---

## System Architecture Diagram

![CareFlow Architecture](docs/architecture/careflow-architecture.png)

---

## Application Screenshots

### Landing Page

![Landing Page](docs/screenshots/landing-page.png)

### Login Page

![Login Page](docs/screenshots/login-page.png)

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Patients Management

![Patients Page](docs/screenshots/patients-page.png)

### Leads Management

![Leads Page](docs/screenshots/leads-page.png)

### Appointments Management

![Appointments Page](docs/screenshots/appointments-page.png)

### Treatments Management

![Treatments Page](docs/screenshots/treatments-page.png)

### Payments Management

![Payments Page](docs/screenshots/payments-page.png)

### Treatment Logs

![Treatment Logs Page](docs/screenshots/treatmentlogs-page.png)

### Reports & Analytics

![Reports Page](docs/screenshots/reports-page.png)

---

## Project Structure

```text
careflow
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── src
│   ├── routes
│   ├── controllers
│   ├── middleware
│   └── package.json
│
├── docs
│   ├── screenshots
│   └── architecture
│
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
cd careflow
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Backend (.env)

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
JWT_SECRET=
PORT=5000
```

Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

