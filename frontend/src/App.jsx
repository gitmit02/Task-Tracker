import { useEffect, useState, useMemo } from "react";
import * as api from "./api";
import ProgressRing from "./components/ProgressRing";
import StatsBar from "./components/StatsBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .getTasks()
      .then(setTasks)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (task) => {
    const created = await api.createTask(task);
    setTasks((prev) => [created, ...prev]);
  };

  const handleToggle = async (id, completed) => {
    const prev = tasks;
    setTasks((t) => t.map((task) => (task._id === id ? { ...task, completed } : task)));
    try {
      await api.updateTask(id, { completed });
    } catch {
      setTasks(prev);
    }
  };

  const handleUpdate = async (id, updates) => {
    const prev = tasks;
    setTasks((t) => t.map((task) => (task._id === id ? { ...task, ...updates } : task)));
    try {
      await api.updateTask(id, updates);
    } catch {
      setTasks(prev);
    }
  };

  const handleDelete = async (id) => {
    const prev = tasks;
    setTasks((t) => t.filter((task) => task._id !== id));
    try {
      await api.deleteTask(id);
    } catch {
      setTasks(prev);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-ink">Tasks</h1>
            <p className="mt-1.5 text-[16px] text-ink-soft">
              {tasks.length === 0
                ? "A clear list to start the day"
                : `${completedCount} of ${tasks.length} done`}
            </p>
          </div>
          <ProgressRing total={tasks.length} completed={completedCount} />
        </header>

        <div className="mb-8">
          <StatsBar tasks={tasks} />
        </div>

        <TaskForm onAdd={handleAdd} />

        <div className="mt-8 flex gap-2 border-b border-line">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2.5 text-[15px] font-semibold transition ${
                filter === f.key
                  ? "border-b-2 border-accent text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && <p className="mt-8 text-center text-[15px] text-ink-soft">Loading tasks…</p>}

        {loadError && (
          <p className="mt-8 text-center text-[15px] text-high">
            Couldn't reach the server: {loadError}
          </p>
        )}

        {!loading && !loadError && (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
}
