import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const saveEdit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onUpdate(task._id, { title: trimmed, description: description.trim() });
    setEditing(false);
  };

  const priorityBorder =
    task.priority === "high"
      ? "var(--color-high)"
      : task.priority === "low"
      ? "var(--color-low)"
      : "var(--color-medium)";

  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:shadow-md"
      style={{ borderLeft: `5px solid ${priorityBorder}` }}
    >
      <button
        onClick={() => onToggle(task._id, !task.completed)}
        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
          task.completed
            ? "border-accent bg-accent text-white"
            : "border-line text-transparent hover:border-accent"
        }`}
        aria-label={task.completed ? "Mark as not completed" : "Mark as completed"}
      >
        <svg width="15" height="15" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="flex flex-col gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b-2 border-line bg-transparent text-lg font-semibold text-ink focus:outline-none focus:border-accent"
              autoFocus
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note"
              className="w-full border-none bg-transparent text-[15px] text-ink-soft focus:outline-none"
            />
            <div className="mt-1 flex gap-2">
              <button
                onClick={saveEdit}
                className="rounded-lg bg-accent px-4 py-1.5 text-[14px] font-medium text-white hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description || "");
                  setEditing(false);
                }}
                className="rounded-lg px-4 py-1.5 text-[14px] font-medium text-ink-soft hover:bg-paper"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <p
                className={`text-lg font-semibold ${
                  task.completed ? "text-ink-soft line-through" : "text-ink"
                }`}
              >
                {task.title}
              </p>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                style={{
                  color: priorityBorder,
                  backgroundColor: `${priorityBorder}1A`,
                }}
              >
                {task.priority}
              </span>
            </div>
            {task.description && (
              <p className="mt-1 text-[15px] text-ink-soft">{task.description}</p>
            )}
          </>
        )}
      </div>

      {!editing && (
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg p-2 text-ink-soft hover:bg-paper hover:text-ink"
            aria-label="Edit task"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M14.5 3.5L16.5 5.5L6 16L3 17L4 14L14.5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg p-2 text-ink-soft hover:bg-high/10 hover:text-high"
            aria-label="Delete task"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 6H16M8 6V4.5C8 4 8.4 3.5 9 3.5H11C11.6 3.5 12 4 12 4.5V6M15 6L14.3 15.5C14.3 16.3 13.6 17 12.8 17H7.2C6.4 17 5.7 16.3 5.7 15.5L5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
