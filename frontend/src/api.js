const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.onrender.com/api

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------- Auth ----------

export const signup = (username, password) =>
  fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);

export const login = (username, password) =>
  fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);

// ---------- Tasks (all require auth) ----------

export const getTasks = () =>
  fetch(`${API_BASE}/tasks`, {
    headers: { ...authHeaders() },
  }).then(handleResponse);

export const createTask = (task) =>
  fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(task),
  }).then(handleResponse);

export const updateTask = (id, updates) =>
  fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(updates),
  }).then(handleResponse);

export const deleteTask = (id) =>
  fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  }).then(handleResponse);
