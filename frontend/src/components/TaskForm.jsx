import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError("Give the task a title before adding it.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await onAdd({ title: trimmed, description: description.trim(), priority });
      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (err) {
      setError(err.message || "Couldn't add the task. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="What needs doing?"
            className="w-full border-none bg-transparent text-xl font-semibold text-ink placeholder:text-ink-soft/60 focus:outline-none"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note (optional)"
            className="mt-1.5 w-full border-none bg-transparent text-[15px] text-ink-soft placeholder:text-ink-soft/60 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-xl border border-line bg-paper px-3 py-2.5 text-[15px] font-medium text-ink-soft focus:outline-none focus:border-accent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-accent px-6 py-2.5 text-[15px] font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add task"}
          </button>
        </div>
      </div>
      {error && <p className="mt-3 text-[14px] text-high">{error}</p>}
    </form>
  );
}
