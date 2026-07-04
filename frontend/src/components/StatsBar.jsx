const stats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const highPriority = tasks.filter((t) => t.priority === "high" && !t.completed).length;
  return { total, completed, active, highPriority };
};

export default function StatsBar({ tasks }) {
  const { total, completed, active, highPriority } = stats(tasks);

  const cards = [
    { label: "Total tasks", value: total, color: "text-ink" },
    { label: "Active", value: active, color: "text-accent" },
    { label: "Completed", value: completed, color: "text-low" },
    { label: "High priority", value: highPriority, color: "text-high" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-line bg-white px-5 py-4 shadow-sm"
        >
          <p className={`text-4xl font-bold tabular-nums ${c.color}`}>{c.value}</p>
          <p className="mt-1 text-[14px] font-medium text-ink-soft">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
