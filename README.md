## Live Demo

Project Name: CareFlow

### Live Application

https://careflow-green.vercel.app


### Demo Credentials

Admin Account

Email: admin@careflow.com
Password: Admin123@


### Backend API

https://careflow-i56g.onrender.com

---

## System Architecture Diagram

![CareFlow Architecture](docs/architecture/careflow-architecture.png)

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

