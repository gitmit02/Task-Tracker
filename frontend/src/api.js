const API_URL = import.meta.env.VITE_API_URL;

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export const getTasks = () =>
  fetch(API_URL).then(handleResponse);

export const createTask = (task) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  }).then(handleResponse);

export const updateTask = (id, updates) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  }).then(handleResponse);

export const deleteTask = (id) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(handleResponse);
