# Task Tracker (MERN Stack)

A modern, responsive, and feature-rich Task Tracker web application built using the MERN stack (MongoDB, Express, React, Node.js). It features a React frontend created with Vite and Tailwind CSS v4, and a clean REST API backend powered by Express and Mongoose.

---

## 🚀 Features

- **Progress Tracking**: A custom SVG circular progress ring dynamically displays the percentage of tasks completed.
- **Analytics & Stats**: Real-time counters showing total, active, completed, and high-priority tasks.
- **Priority Management**: Tasks can be categorized into `low`, `medium`, or `high` priority, represented with matching color codes.
- **Inline Editing**: Edit task titles and description notes directly in the task item card.
- **Task Filtering**: Instantly filter tasks by `All`, `Active`, or `Completed`.
- **Optimistic UI Updates**: Instant toggling and deletion updates with automatic fallback if the network request fails.
- **Fully Responsive Layout**: Designed to look great on desktop, tablet, and mobile screens.

---

## 📁 Project Structure

```text
Task-Tracker/
├── backend/                  # Node.js + Express backend server
│   ├── controllers/          # Request handlers (taskController.js)
│   ├── models/               # Mongoose schemas (Task.js)
│   ├── routes/               # API routes definitions (taskRoutes.js)
│   ├── .env.example          # Sample environment variables file
│   ├── server.js             # Main server entrypoint
│   └── package.json          # Node server package configurations & scripts
│
└── frontend/                 # React + Vite + Tailwind CSS frontend
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # Reusable React components (ProgressRing, StatsBar, TaskForm, TaskItem, TaskList)
    │   ├── api.js            # API fetch services connecting to backend
    │   ├── App.jsx           # Main App orchestrator with state management
    │   ├── index.css         # Theme overrides and Tailwind directives
    │   └── main.jsx          # React entrypoint
    ├── .env                  # Frontend environment variables configuration
    └── package.json          # React app configurations & dependencies
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS v4** (Modern utility framework)
- **Oxlint** (Super-fast linter for JS/JSX)

### Backend
- **Node.js** (v18+ recommended)
- **Express** (Robust router and web framework)
- **MongoDB & Mongoose** (NoSQL Database modeling)
- **Nodemon** (Automated hot-reloading in dev)
- **Cors & Dotenv** (CORS management and environment variables handling)

---

## 🔌 API Endpoints Reference

The backend exposes a standard REST API at `/api/tasks`.

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Fetches all tasks, sorted by creation date (newest first). | *None* |
| **POST** | `/api/tasks` | Creates a new task. | `{ "title": "Buy groceries", "description": "Milk, Eggs, Bread", "priority": "medium" }` |
| **PUT** | `/api/tasks/:id` | Updates an existing task. | `{ "completed": true }` or `{ "title": "Updated Title" }` |
| **DELETE**| `/api/tasks/:id` | Deletes a task by ID. | *None* |

---

## ⚙️ Environment Variables Setup

### Backend Environment Configuration
Create a `.env` file in the `backend/` folder:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend Environment Configuration
Create a `.env` file in the `frontend/` folder (or use the pre-configured one):
```bash
VITE_API_URL=http://localhost:5000/api/tasks
```

---

## 🏁 Getting Started

Follow these steps to run the application locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a running [MongoDB](https://www.mongodb.com/try/download/community) instance (local or MongoDB Atlas).

### Step 1: Run the Backend Server
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with your `MONGO_URI`.
4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   *The server will start running at `http://localhost:5000`.*

### Step 2: Run the Frontend App
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client will be available at `http://localhost:5173`.*

---

## 🧪 Development Scripts

### Backend (`/backend`)
- `npm start`: Runs server using standard Node.js (`node server.js`).
- `npm run dev`: Runs server using Nodemon for auto-restart on file edits.

### Frontend (`/frontend`)
- `npm run dev`: Starts Vite local development server.
- `npm run build`: Bundles the application for production deployment.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs Oxlint checks across source files.
