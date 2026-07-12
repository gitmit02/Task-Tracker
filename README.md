# Task Tracker — MERN Stack

A full-stack task management app with user authentication. Each user signs up, logs in, and manages their own private list of tasks — built as a technical assignment demonstrating CRUD, REST APIs, JWT auth, and MongoDB integration.

## 🔗 Live Links

- **Live App:** [[Frontend](https://task-tracker-flame-seven-80.vercel.app/)]
- **Backend API:** [[Backend](https://task-tracker-backend-bcuj.onrender.com/)]

## ✨ Features

- 🔐 User authentication (signup/login) with JWT
- ✅ Full CRUD — create, view, update, delete tasks
- 🔒 Tasks are private — scoped to the logged-in user only
- 🎯 Priority levels (low / medium / high) with color-coded badges
- 🗂️ Filter tasks by All / Active / Completed
- 📊 Dashboard stats (total, active, completed, high priority counts)
- ⭕ Circular progress ring showing completion percentage
- 📱 Fully responsive UI, including a collapsing profile navbar on mobile
- ⚡ Dynamic updates with no page refresh
- 🌐 Deployed on Render (backend) + Vercel (frontend)

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS v4, React Router
**Backend:** Node.js, Express.js
**Database:** MongoDB (Atlas) with Mongoose
**Auth:** JWT (jsonwebtoken) + bcrypt password hashing

## 📁 Project Structure
```
task-tracker/
├── backend/
│   ├── controllers/     # Route logic (auth, tasks)
│   ├── middleware/       # JWT auth protection
│   ├── models/           # Mongoose schemas (User, Task)
│   ├── routes/           # Express route definitions
│   ├── utils/            # JWT token generation
│   └── server.js
└── frontend/
├── src/
│   ├── components/   # Navbar, TaskForm, TaskItem, TaskList, StatsBar, ProgressRing
│   ├── context/      # AuthContext (login/signup/logout state)
│   ├── pages/        # Home, Login, Signup
│   └── api.js        # API calls + auth token handling
└── vite.config.js

```
## 🚀 Getting Started Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# create a .env file with:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

## 🔑 Environment Variables

**Backend (`.env`)**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret_string
```
**Frontend (`.env`)**
```

VITE_API_URL=http://localhost:5000/api

```
## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/api/auth/signup` | Create a new account | No |
| POST | `/api/auth/login` | Log in, receive JWT | No |
| GET | `/api/tasks` | Get all of the user's tasks | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

## 📸 Screenshots

<img width="1258" height="895" alt="image" src="https://github.com/user-attachments/assets/b0a737b8-45eb-4ddb-a6c0-d950333e932b" />

<img width="1085" height="436" alt="image" src="https://github.com/user-attachments/assets/a030d9fa-94b3-4895-af80-2c6ad8aa8caa" />



## 👤 Author

Built by Ruby as part of a Full Stack Developer Internship assignment.
